"use client";

import { useState } from "react";
import { useAuth } from "@/app/providers";
import { fetchJson } from "@/app/lib/api";

export default function InteractivePage() {
  const { token } = useAuth();
  const [lessonId, setLessonId] = useState("");
  const [session, setSession] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [resultData, setResultData] = useState("");

  async function handleLaunch(e: React.FormEvent) {
    e.preventDefault();
    if (!token || !lessonId) return;
    setLoading(true);
    setError(null);
    try {
      const s = await fetchJson(`/interactive/launch/${lessonId}`, {
        token,
        method: "POST",
      });
      setSession(s);
    } catch {
      setError("Gagal meluncurkan sesi. Pastikan Lesson ID valid.");
    } finally {
      setLoading(false);
    }
  }

  async function handleSubmitResult() {
    if (!token || !session) return;
    try {
      await fetchJson(`/interactive/session/${session.id}/result`, {
        token,
        method: "POST",
        body: JSON.stringify({ data: { score: Number(resultData) || 0, notes: "Simulated result" } }),
      });
      alert("Hasil berhasil disubmit!");
      setSession(null);
      setLessonId("");
      setResultData("");
    } catch {
      alert("Gagal submit hasil.");
    }
  }

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Simulasi Interactive Content (3D/AR/VR)</h1>

      {!session ? (
        <div className="bg-white/60 backdrop-blur-lg p-4 border border-white/50 rounded-2xl shadow-sm max-w-md">
          <form onSubmit={handleLaunch} className="flex flex-col gap-3">
            <label className="text-sm font-semibold">Lesson ID</label>
            <input
              className="border border-white/50 bg-white/50 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
              value={lessonId}
              onChange={(e) => setLessonId(e.target.value)}
              placeholder="Masukkan ID Lesson tipe Interactive"
              required
            />
            <button type="submit" disabled={loading} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
              {loading ? "Meluncurkan..." : "Launch Sesi"}
            </button>
            {error && <div className="text-red-600 text-sm mt-2">{error}</div>}
          </form>
        </div>
      ) : (
        <div className="bg-white/60 backdrop-blur-lg p-4 border border-white/50 rounded-2xl shadow-sm max-w-md border-green-500">
          <h2 className="font-semibold text-green-700 mb-2">Sesi Aktif: {session.id}</h2>
          <p className="text-sm text-gray-600 mb-4">[Area ini mensimulasikan konten interaktif yang berjalan di iframe/canvas]</p>
          <div className="flex flex-col gap-3 border-t pt-4">
            <label className="text-sm font-semibold">Simulasi Kirim Hasil (Skor)</label>
            <input
              type="number"
              className="border border-white/50 bg-white/50 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
              value={resultData}
              onChange={(e) => setResultData(e.target.value)}
              placeholder="Skor (misal: 85)"
            />
            <button onClick={handleSubmitResult} className="bg-green-600 text-white py-2 rounded hover:bg-green-700">
              Submit Hasil ke LMS
            </button>
          </div>
        </div>
      )}
    </main>
  );
}
