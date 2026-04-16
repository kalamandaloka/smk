"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type School = { id: string; name: string };
type Program = {
  id: string;
  name: string;
  schoolId: string;
  createdAt: string;
  school?: School;
};

export default function ProgramsPage() {
  const { token } = useAuth();
  const [schools, setSchools] = useState<School[]>([]);
  const [items, setItems] = useState<Program[]>([]);
  const [schoolId, setSchoolId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [s, p] = await Promise.all([
        fetchJson<School[]>("/schools", { token, cache: "no-store" }),
        fetchJson<Program[]>("/programs", { token, cache: "no-store" }),
      ]);
      setSchools(s);
      setItems(p);
      if (!schoolId && s.length > 0) setSchoolId(s[0].id);
    } catch {
      setError("Gagal memuat program");
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
      await fetchJson("/programs", {
        token,
        method: "POST",
        body: JSON.stringify({ name, schoolId }),
      });
      setName("");
      await load();
    } catch {
      setError("Gagal membuat program");
    }
  }

  const schoolNameById = useMemo(() => new Map(schools.map((s) => [s.id, s.name])), [schools]);

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Program</h1>
        <p className="text-sm text-gray-600">GET/POST /programs</p>
      </div>

      <form onSubmit={onSubmit} className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] grid gap-4 md:grid-cols-3 mb-8">
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">Sekolah</label>
          <select
            className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 shadow-inner"
            value={schoolId}
            onChange={(e) => setSchoolId(e.target.value)}
          >
            {schools.map((s) => (
              <option key={s.id} value={s.id}>
                {s.name}
              </option>
            ))}
          </select>
        </div>
        <div className="md:col-span-2">
          <label className="block mb-1 text-sm font-semibold text-slate-700">Nama program</label>
          <div className="flex gap-3">
            <input
              className="flex-1 border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Teknologi"
            />
            <button
              className="bg-blue-600/90 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 backdrop-blur-md transition-all border border-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              type="submit"
              disabled={!name || !schoolId}
            >
              Tambah
            </button>
          </div>
        </div>
      </form>

      {error ? <div className="text-sm text-red-600 mb-4">{error}</div> : null}

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] overflow-hidden">
        <div className="p-4 border-b border-white/60 font-bold text-slate-800 bg-white/50 backdrop-blur-md">Daftar</div>
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-medium bg-white/20">Memuat...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
              <tr>
                <th className="p-4 font-bold text-slate-800">Sekolah</th>
                <th className="p-4 font-bold text-slate-800">Nama</th>
                <th className="p-4 font-bold text-slate-800">Dibuat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {items.map((p) => (
                <tr key={p.id} className="hover:bg-white/30 transition-colors">
                  <td className="p-4 text-slate-700 font-medium">{p.school?.name ?? schoolNameById.get(p.schoolId) ?? p.schoolId}</td>
                  <td className="p-4 text-slate-700">{p.name}</td>
                  <td className="p-4 text-slate-600 text-sm">{new Date(p.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500 font-medium bg-white/20">
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
