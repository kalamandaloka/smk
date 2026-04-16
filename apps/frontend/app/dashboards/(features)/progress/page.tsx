"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type LessonProgress = {
  id: string;
  lessonId: string;
  studentId: string;
  completedAt: string;
  lesson?: { id: string; title: string; type: string };
};

export default function ProgressPage() {
  const { token } = useAuth();
  const [lessonId, setLessonId] = useState("");
  const [items, setItems] = useState<LessonProgress[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<LessonProgress[]>("/progress/me/lessons", { token, cache: "no-store" });
      setItems(data);
    } catch {
      setError("Gagal memuat progress");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token || !lessonId) return;
    setError(null);
    try {
      await fetchJson(`/progress/lessons/${lessonId}/complete`, { token, method: "POST" });
      setLessonId("");
      await load();
    } catch {
      setError("Gagal update progress");
    }
  }

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Progress</h1>
        <p className="text-sm text-gray-600">GET /progress/me/lessons, POST /progress/lessons/:lessonId/complete</p>
      </div>

      <form onSubmit={onSubmit} className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm p-4 flex gap-2 items-end">
        <div className="flex-1">
          <label className="block text-sm font-medium">Lesson ID</label>
          <input className="mt-1 w-full border rounded px-3 py-2" value={lessonId} onChange={(e) => setLessonId(e.target.value)} />
        </div>
        <button className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400" type="submit" disabled={!lessonId}>
          Tandai selesai
        </button>
      </form>

      {error ? <div className="text-sm text-red-600">{error}</div> : null}

      <div className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-3 border-b text-sm font-medium">Riwayat</div>
        {loading ? (
          <div className="p-3 text-sm text-gray-600">Memuat...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-white/40">
              <tr>
                <th className="text-left p-2">Lesson</th>
                <th className="text-left p-2">Tipe</th>
                <th className="text-left p-2">Selesai</th>
              </tr>
            </thead>
            <tbody>
              {items.map((p) => (
                <tr key={p.id} className="border-t">
                  <td className="p-2">{p.lesson?.title ?? p.lessonId}</td>
                  <td className="p-2">{p.lesson?.type ?? "-"}</td>
                  <td className="p-2">{new Date(p.completedAt).toLocaleString()}</td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td className="p-3 text-gray-600" colSpan={3}>
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
