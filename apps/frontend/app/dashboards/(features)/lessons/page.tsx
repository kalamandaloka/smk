"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type Course = { id: string; title: string };
type CourseModule = { id: string; title: string; order: number; courseId: string };
type Lesson = {
  id: string;
  moduleId: string;
  title: string;
  type: string;
  order: number;
  createdAt: string;
};

const LESSON_TYPES = [
  "ARTICLE",
  "VIDEO",
  "DOCUMENT",
  "QUIZ",
  "INTERACTIVE_3D",
  "AR_ACTIVITY",
  "VR_ACTIVITY",
  "MR_ACTIVITY",
] as const;

export default function LessonsPage() {
  const { token } = useAuth();
  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState("");
  const [modules, setModules] = useState<CourseModule[]>([]);
  const [moduleId, setModuleId] = useState("");
  const [items, setItems] = useState<Lesson[]>([]);
  const [title, setTitle] = useState("");
  const [type, setType] = useState<(typeof LESSON_TYPES)[number]>("ARTICLE");
  const [order, setOrder] = useState(0);
  const [article, setArticle] = useState("");
  const [videoUrl, setVideoUrl] = useState("");
  const [documentUrl, setDocumentUrl] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const selectedModule = useMemo(() => modules.find((m) => m.id === moduleId) ?? null, [modules, moduleId]);

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
    if (!token) return;
    const id = nextModuleId ?? moduleId;
    if (!id) {
      setItems([]);
      return;
    }
    const l = await fetchJson<Lesson[]>(`/lessons/by-module/${id}`, { token, cache: "no-store" });
    setItems(l);
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
      setError("Gagal memuat lesson");
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
        setItems([]);
      }
    } catch {
      setError("Gagal memuat modul/lesson");
    } finally {
      setLoading(false);
    }
  }

  async function onChangeModule(nextId: string) {
    setModuleId(nextId);
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

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    try {
      await fetchJson("/lessons", {
        token,
        method: "POST",
        body: JSON.stringify({
          moduleId,
          title,
          type,
          order,
          article: article || undefined,
          videoUrl: videoUrl || undefined,
          documentUrl: documentUrl || undefined,
        }),
      });
      setTitle("");
      setOrder(0);
      setArticle("");
      setVideoUrl("");
      setDocumentUrl("");
      await loadLessons();
    } catch {
      setError("Gagal membuat lesson");
    }
  }

  async function onDelete(id: string) {
    if (!token) return;
    const ok = window.confirm("Hapus lesson ini?");
    if (!ok) return;
    setDeletingId(id);
    setError(null);
    try {
      await fetchJson(`/lessons/${id}`, { token, method: "DELETE" });
      await loadLessons();
    } catch {
      setError("Gagal menghapus lesson");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Lesson</h1>
        <p className="text-sm text-gray-600">GET /lessons/by-module/:moduleId, POST /lessons, DELETE /lessons/:id</p>
      </div>

      <div className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm p-4 grid gap-3 md:grid-cols-2">
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
          {selectedModule ? <div className="text-xs text-gray-500 mt-1">moduleId: {selectedModule.id}</div> : null}
        </div>
      </div>

      <form onSubmit={onSubmit} className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] grid gap-4 md:grid-cols-4 mb-8">
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-semibold text-slate-700">Judul</label>
          <input className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Contoh: Pengenalan Aljabar" />
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">Tipe</label>
          <select className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 shadow-inner" value={type} onChange={(e) => setType(e.target.value as any)}>
            {LESSON_TYPES.map((t) => (
              <option key={t} value={t}>
                {t}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">Order</label>
          <input className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner" value={order} onChange={(e) => setOrder(Number(e.target.value))} type="number" placeholder="Contoh: 1" />
        </div>
        <div className="md:col-span-4 grid gap-4 md:grid-cols-3">
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Article (opsional)</label>
            <input className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner" value={article} onChange={(e) => setArticle(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Video URL (opsional)</label>
            <input className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner" value={videoUrl} onChange={(e) => setVideoUrl(e.target.value)} />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Document URL (opsional)</label>
            <input className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner" value={documentUrl} onChange={(e) => setDocumentUrl(e.target.value)} />
          </div>
        </div>
        <div className="md:col-span-4 flex justify-end">
          <button className="bg-blue-600/90 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 backdrop-blur-md transition-all border border-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100" type="submit" disabled={!moduleId || !title}>
            Tambah Pelajaran
          </button>
        </div>
      </form>

      {error ? <div className="text-sm text-red-600 mb-4">{error}</div> : null}

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] overflow-hidden">
        <div className="p-4 border-b border-white/60 text-lg font-bold text-slate-800 bg-white/50 backdrop-blur-md">Daftar Pelajaran</div>
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-medium bg-white/20">Memuat data...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
              <tr>
                <th className="p-4 font-bold text-slate-800">Order</th>
                <th className="p-4 font-bold text-slate-800">Judul</th>
                <th className="p-4 font-bold text-slate-800">Tipe</th>
                <th className="p-4 font-bold text-slate-800">Dibuat</th>
                <th className="p-4 font-bold text-slate-800">Aksi</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {items.map((l) => (
                <tr key={l.id} className="hover:bg-white/30 transition-colors">
                  <td className="p-4 text-slate-700 font-medium">{l.order}</td>
                  <td className="p-4 text-slate-800 font-semibold">{l.title}</td>
                  <td className="p-4">
                    <span
                      className={`px-2 py-1 rounded-full text-xs font-semibold ${
                        l.type === "VIDEO"
                          ? "bg-red-100 text-red-700"
                          : l.type === "ARTICLE"
                            ? "bg-blue-100 text-blue-700"
                            : l.type === "QUIZ"
                              ? "bg-green-100 text-green-700"
                              : "bg-purple-100 text-purple-700"
                      }`}
                    >
                      {l.type}
                    </span>
                  </td>
                  <td className="p-4 text-slate-600 text-sm">{new Date(l.createdAt).toLocaleString()}</td>
                  <td className="p-4">
                    <button className="text-red-600 hover:text-red-800 font-medium disabled:text-gray-400 transition-colors" onClick={() => onDelete(l.id)} disabled={deletingId === l.id} type="button">
                      {deletingId === l.id ? "Menghapus..." : "Hapus"}
                    </button>
                  </td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-medium bg-white/20">
                    Belum ada data
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
