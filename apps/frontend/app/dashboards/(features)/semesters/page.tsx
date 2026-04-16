"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type AcademicYear = { id: string; label: string };
type Semester = { id: string; label: string; academicYearId: string; createdAt: string };

export default function SemestersPage() {
  const { token } = useAuth();
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [items, setItems] = useState<Semester[]>([]);
  const [label, setLabel] = useState("");
  const [academicYearId, setAcademicYearId] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [y, s] = await Promise.all([
        fetchJson<AcademicYear[]>("/academic-years", { token, cache: "no-store" }),
        fetchJson<Semester[]>("/semesters", { token, cache: "no-store" }),
      ]);
      setYears(y);
      setItems(s);
      if (!academicYearId && y.length > 0) setAcademicYearId(y[0].id);
    } catch {
      setError("Gagal memuat semester");
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
      await fetchJson("/semesters", {
        token,
        method: "POST",
        body: JSON.stringify({ label, academicYearId }),
      });
      setLabel("");
      await load();
    } catch {
      setError("Gagal membuat semester");
    }
  }

  const yearLabelById = new Map(years.map((y) => [y.id, y.label]));

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Semester</h1>
        <p className="text-sm text-gray-600">GET/POST /semesters</p>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] mb-8">
        <h2 className="text-xl font-bold mb-4 text-slate-800 drop-shadow-sm">Tambah Semester Baru</h2>
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Tahun Akademik</label>
            <select
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 shadow-inner"
              value={academicYearId}
              onChange={(e) => setAcademicYearId(e.target.value)}
              required
            >
              <option value="">-- Pilih Tahun Akademik --</option>
              {years.map((ay) => (
                <option key={ay.id} value={ay.id}>
                  {ay.label}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Label Semester</label>
            <input
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner"
              placeholder="Contoh: Ganjil"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              required
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600/90 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 backdrop-blur-md transition-all border border-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
            disabled={!label || !academicYearId}
          >
            Simpan Semester
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
                <th className="p-4 font-bold text-slate-800">Label</th>
                <th className="p-4 font-bold text-slate-800">Dibuat Pada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {items.map((item) => (
                <tr key={item.id} className="hover:bg-white/30 transition-colors">
                  <td className="p-4 text-slate-700 font-medium">{yearLabelById.get(item.academicYearId) ?? item.academicYearId}</td>
                  <td className="p-4 text-slate-800 font-semibold">{item.label}</td>
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
