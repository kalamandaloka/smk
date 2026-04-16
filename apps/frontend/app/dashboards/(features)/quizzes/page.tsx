"use client";

import { FormEvent, useMemo, useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type Course = { id: string; title: string };
type CourseModule = { id: string; title: string; order: number; courseId: string };
type Lesson = { id: string; title: string; order: number; moduleId: string; type: string };

type CreatedQuiz = {
  id: string;
  lessonId: string;
  passingScore: number;
  maxAttempts: number;
};

export default function QuizzesPage() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState("");
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [moduleId, setModuleId] = useState("");
  const [lessons, setLessons] = useState<Lesson[]>([]);
  const [lessonId, setLessonId] = useState("");
  const [passingScore, setPassingScore] = useState(60);
  const [maxAttempts, setMaxAttempts] = useState(3);
  const [prompt, setPrompt] = useState("");
  const [options, setOptions] = useState<string[]>(["", "", "", ""]);
  const [correctIndex, setCorrectIndex] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [created, setCreated] = useState<CreatedQuiz | null>(null);

  const selectedLesson = useMemo(() => lessons.find((l) => l.id === lessonId) ?? null, [lessons, lessonId]);

  async function loadCourses() {
    if (!token) return [];
    const c = await fetchJson<Course[]>("/courses", { token, cache: "no-store" });
    setCourses(c);
    const nextCourseId = courseId || (c.length > 0 ? c[0].id : "");
    if (nextCourseId && nextCourseId !== courseId) setCourseId(nextCourseId);
    return c;
  }

  async function loadModules(nextCourseId?: string) {
    if (!token) return [];
    const id = nextCourseId ?? courseId;
    if (!id) {
      setModules([]);
      setModuleId("");
      return [];
    }
    const m = await fetchJson<CourseModule[]>(`/course-modules/by-course/${id}`, { token, cache: "no-store" });
    setModules(m);
    const nextModuleId = moduleId || (m.length > 0 ? m[0].id : "");
    if (nextModuleId && nextModuleId !== moduleId) setModuleId(nextModuleId);
    return m;
  }

  async function loadLessons(nextModuleId?: string) {
    if (!token) return [];
    const id = nextModuleId ?? moduleId;
    if (!id) {
      setLessons([]);
      setLessonId("");
      return [];
    }
    const l = await fetchJson<Lesson[]>(`/lessons/by-module/${id}`, { token, cache: "no-store" });
    setLessons(l);
    const nextLessonId = lessonId || (l.length > 0 ? l[0].id : "");
    if (nextLessonId && nextLessonId !== lessonId) setLessonId(nextLessonId);
    return l;
  }

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const c = await loadCourses();
      const firstCourseId = courseId || (c.length > 0 ? c[0].id : "");
      const m = await loadModules(firstCourseId);
      const firstModuleId = moduleId || (m.length > 0 ? m[0].id : "");
      await loadLessons(firstModuleId);
    } catch {
      setError("Gagal memuat data quiz");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function onChangeCourse(nextId: string) {
    setCourseId(nextId);
    setModuleId("");
    setLessonId("");
    setCreated(null);
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const m = await loadModules(nextId);
      const nextModuleId = m.length > 0 ? m[0].id : "";
      if (nextModuleId) {
        setModuleId(nextModuleId);
        await loadLessons(nextModuleId);
      } else {
        setLessons([]);
      }
    } catch {
      setError("Gagal memuat modul/lesson");
    } finally {
      setLoading(false);
    }
  }

  async function onChangeModule(nextId: string) {
    setModuleId(nextId);
    setLessonId("");
    setCreated(null);
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      await loadLessons(nextId);
    } catch {
      setError("Gagal memuat lesson");
    } finally {
      setLoading(false);
    }
  }

  function setOption(i: number, value: string) {
    setOptions((prev) => {
      const next = prev.slice();
      next[i] = value;
      return next;
    });
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    setCreated(null);
    try {
      const payload = {
        lessonId,
        passingScore,
        maxAttempts,
        questions: [
          {
            prompt,
            order: 0,
            options: options
              .map((text, idx) => ({ text, isCorrect: idx === correctIndex }))
              .filter((o) => o.text.trim().length > 0),
          },
        ],
      };
      const res = await fetchJson<any>("/quizzes", { token, method: "POST", body: JSON.stringify(payload) });
      setCreated({ id: res.id, lessonId: res.lessonId, passingScore: res.passingScore, maxAttempts: res.maxAttempts });
      setPrompt("");
      setOptions(["", "", "", ""]);
      setCorrectIndex(0);
    } catch {
      setError("Gagal membuat quiz");
    }
  }

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Quiz</h1>
        <p className="text-sm text-gray-600">POST /quizzes</p>
      </div>

      <div className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm p-4 grid gap-3 md:grid-cols-3">
        <div>
          <label className="block text-sm font-medium">Course</label>
          <select className="mt-1 w-full border rounded px-3 py-2" value={courseId} onChange={(e) => onChangeCourse(e.target.value)}>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Modul</label>
          <select className="mt-1 w-full border rounded px-3 py-2" value={moduleId} onChange={(e) => onChangeModule(e.target.value)}>
            {modules.map((m) => (
              <option key={m.id} value={m.id}>
                {m.order}. {m.title}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block text-sm font-medium">Lesson</label>
          <select className="mt-1 w-full border rounded px-3 py-2" value={lessonId} onChange={(e) => setLessonId(e.target.value)}>
            {lessons.map((l) => (
              <option key={l.id} value={l.id}>
                {l.order}. {l.title} ({l.type})
              </option>
            ))}
          </select>
          {selectedLesson ? <div className="text-xs text-gray-500 mt-1">lessonId: {selectedLesson.id}</div> : null}
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm p-4 space-y-3">
        <div className="grid gap-3 md:grid-cols-2">
          <div>
            <label className="block text-sm font-medium">Passing score</label>
            <input className="mt-1 w-full border rounded px-3 py-2" type="number" value={passingScore} onChange={(e) => setPassingScore(Number(e.target.value))} />
          </div>
          <div>
            <label className="block text-sm font-medium">Max attempts (0 = unlimited)</label>
            <input className="mt-1 w-full border rounded px-3 py-2" type="number" value={maxAttempts} onChange={(e) => setMaxAttempts(Number(e.target.value))} />
          </div>
        </div>

        <div>
          <label className="block text-sm font-medium">Pertanyaan</label>
          <input className="mt-1 w-full border rounded px-3 py-2" value={prompt} onChange={(e) => setPrompt(e.target.value)} placeholder="2+2=?" />
        </div>

        <div className="grid gap-3 md:grid-cols-2">
          {options.map((v, idx) => (
            <div key={idx} className="flex items-center gap-2">
              <input type="radio" checked={correctIndex === idx} onChange={() => setCorrectIndex(idx)} />
              <input className="flex-1 border rounded px-3 py-2" value={v} onChange={(e) => setOption(idx, e.target.value)} placeholder={`Opsi ${idx + 1}`} />
            </div>
          ))}
        </div>

        <div className="flex justify-end">
          <button className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400" type="submit" disabled={!lessonId || !prompt}>
            Buat Quiz
          </button>
        </div>
      </form>

      {loading ? <div className="text-sm text-gray-600">Memuat...</div> : null}
      {error ? <div className="text-sm text-red-600">{error}</div> : null}
      {created ? (
        <div className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm p-4 text-sm">
          <div className="font-medium">Quiz dibuat</div>
          <div>quizId: {created.id}</div>
          <div>lessonId: {created.lessonId}</div>
        </div>
      ) : null}
    </main>
  );
}
