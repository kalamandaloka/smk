"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers";
import { fetchJson } from "@/app/lib/api";

export default function ReportsPage() {
  const { token } = useAuth();
  const [activeTab, setActiveTab] = useState<"quiz" | "progress">("quiz");
  const [quizGrades, setQuizGrades] = useState<any[]>([]);
  const [lessonProgress, setLessonProgress] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function loadData() {
      if (!token) return;
      setLoading(true);
      try {
        if (activeTab === "quiz") {
          const res = await fetchJson<any[]>("/reports/quiz-grades", { token });
          setQuizGrades(res);
        } else {
          const res = await fetchJson<any[]>("/reports/lesson-progress", { token });
          setLessonProgress(res);
        }
      } catch {
      } finally {
        setLoading(false);
      }
    }
    loadData();
  }, [token, activeTab]);

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Laporan (Reports)</h1>

      <div className="flex gap-4 mb-4 border-b">
        <button className={`py-2 px-4 ${activeTab === "quiz" ? "border-b-2 border-blue-600 font-bold text-blue-600" : "text-gray-500"}`} onClick={() => setActiveTab("quiz")}>
          Nilai Quiz
        </button>
        <button className={`py-2 px-4 ${activeTab === "progress" ? "border-b-2 border-blue-600 font-bold text-blue-600" : "text-gray-500"}`} onClick={() => setActiveTab("progress")}>
          Progress Belajar
        </button>
      </div>

      <div className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm overflow-hidden">
        {loading ? (
          <div className="p-4 text-gray-500">Memuat laporan...</div>
        ) : activeTab === "quiz" ? (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3">Siswa</th>
                <th className="p-3">Lesson/Quiz</th>
                <th className="p-3">Score</th>
                <th className="p-3">Status</th>
                <th className="p-3">Tanggal Submit</th>
              </tr>
            </thead>
            <tbody>
              {quizGrades.map((q) => (
                <tr key={q.id} className="border-b last:border-0">
                  <td className="p-3">{q.student?.name}</td>
                  <td className="p-3">{q.quiz?.lesson?.title}</td>
                  <td className="p-3 font-semibold">{q.score}</td>
                  <td className="p-3">{q.passed ? <span className="text-green-600">Lulus</span> : <span className="text-red-600">Gagal</span>}</td>
                  <td className="p-3">{q.submittedAt ? new Date(q.submittedAt).toLocaleDateString("id-ID") : "-"}</td>
                </tr>
              ))}
              {quizGrades.length === 0 && (
                <tr>
                  <td className="p-3 text-center text-gray-500" colSpan={5}>
                    Belum ada data nilai quiz.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-gray-50 border-b">
              <tr>
                <th className="p-3">Siswa</th>
                <th className="p-3">Lesson</th>
                <th className="p-3">Tipe</th>
                <th className="p-3">Tanggal Selesai</th>
              </tr>
            </thead>
            <tbody>
              {lessonProgress.map((p) => (
                <tr key={p.id} className="border-b last:border-0">
                  <td className="p-3">{p.student?.name}</td>
                  <td className="p-3">{p.lesson?.title}</td>
                  <td className="p-3">{p.lesson?.type}</td>
                  <td className="p-3">{p.completedAt ? new Date(p.completedAt).toLocaleDateString("id-ID") : "-"}</td>
                </tr>
              ))}
              {lessonProgress.length === 0 && (
                <tr>
                  <td className="p-3 text-center text-gray-500" colSpan={4}>
                    Belum ada data progress.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
