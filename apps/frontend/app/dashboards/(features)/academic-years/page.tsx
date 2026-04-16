"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type AcademicYear = {
  id: string;
  label: string;
  isActive: boolean;
  createdAt: string;
};

export default function AcademicYearsPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<AcademicYear[]>([]);
  const [label, setLabel] = useState("");
  const [isActive, setIsActive] = useState(true);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<AcademicYear[]>("/academic-years", { token, cache: "no-store" });
      setItems(data);
    } catch {
      setError("Gagal memuat tahun ajaran");
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
    if (!token) return;
    setError(null);
    try {
      await fetchJson("/academic-years", {
        token,
        method: "POST",
        body: JSON.stringify({ label, isActive }),
      });
      setLabel("");
      setIsActive(true);
      await load();
    } catch {
      setError("Gagal membuat tahun ajaran");
    }
  }

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Tahun Ajaran</h1>
        <p className="text-sm text-gray-600">GET/POST /academic-years</p>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] mb-8">
        <h2 className="text-xl font-bold mb-4 text-slate-800 drop-shadow-sm">Tambah Tahun Akademik</h2>
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Label Tahun Akademik</label>
            <input
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner"
              placeholder="Contoh: 2025/2026"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Status</label>
            <label className="flex items-center gap-2 mt-2 cursor-pointer">
              <input
                type="checkbox"
                checked={isActive}
                onChange={(e) => setIsActive(e.target.checked)}
                className="w-5 h-5 rounded text-blue-600 focus:ring-blue-500 border-gray-300"
              />
              <span className="text-slate-700 font-medium">Tahun Akademik Aktif</span>
            </label>
          </div>
          <button
            type="submit"
            className="bg-blue-600/90 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 backdrop-blur-md transition-all border border-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
            disabled={!label}
          >
            Simpan Tahun Akademik
          </button>
        </form>
      </div>

      {error ? <div className="text-sm text-red-600 mb-4">{error}</div> : null}

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-medium bg-white/20">Memuat data...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
              <tr>
                <th className="p-4 font-bold text-slate-800">Tahun Akademik</th>
                <th className="p-4 font-bold text-slate-800">Status</th>
                <th className="p-4 font-bold text-slate-800">Dibuat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/30 transition-colors">
                  <td className="p-4 text-slate-800 font-semibold">{item.label}</td>
                  <td className="p-4">
                    {item.isActive ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Aktif</span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-gray-100 text-gray-700">Tidak Aktif</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-600 text-sm">{new Date(item.createdAt).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
              {items.length === 0 && (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500 font-medium bg-white/20">
                    Belum ada data
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
