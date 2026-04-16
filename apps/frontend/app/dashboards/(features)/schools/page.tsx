"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type School = {
  id: string;
  name: string;
  isActive: boolean;
  createdAt: string;
};

export default function SchoolsPage() {
  const { token } = useAuth();
  const [items, setItems] = useState<School[]>([]);
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const data = await fetchJson<School[]>("/schools", { token, cache: "no-store" });
      setItems(data);
    } catch {
      setError("Gagal memuat sekolah");
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
      await fetchJson("/schools", { token, method: "POST", body: JSON.stringify({ name }) });
      setName("");
      await load();
    } catch {
      setError("Gagal membuat sekolah");
    }
  }

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Sekolah</h1>
        <p className="text-sm text-gray-600">GET/POST /schools</p>
      </div>

      <form onSubmit={onSubmit} className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] mb-8 flex gap-4 items-end">
        <div className="flex-1">
          <label className="block mb-1 text-sm font-semibold text-slate-700">Nama Sekolah</label>
          <input
            type="text"
            required
            className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="Masukkan nama sekolah"
          />
        </div>
        <button
          type="submit"
          disabled={!name}
          className="bg-blue-600/90 hover:bg-blue-700 disabled:bg-gray-400 disabled:hover:scale-100 disabled:shadow-none text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 backdrop-blur-md transition-all border border-blue-500/50 hover:scale-[1.02]"
        >
          Tambah
        </button>
      </form>

      {error ? <div className="text-sm text-red-600 mb-4 px-2">{error}</div> : null}

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] overflow-hidden">
        <div className="p-4 border-b border-white/60 text-sm font-bold text-slate-800 bg-white/50 backdrop-blur-md">Daftar</div>
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-medium bg-white/20">Memuat...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
              <tr>
                <th className="p-4 font-bold text-slate-800">Nama</th>
                <th className="p-4 font-bold text-slate-800">Aktif</th>
                <th className="p-4 font-bold text-slate-800">Dibuat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {items.map((s) => (
                <tr key={s.id} className="hover:bg-white/30 transition-colors">
                  <td className="p-4 text-slate-700 font-medium">{s.name}</td>
                  <td className="p-4 text-slate-600">{s.isActive ? "Ya" : "Tidak"}</td>
                  <td className="p-4 text-slate-600">{new Date(s.createdAt).toLocaleString()}</td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan={3} className="p-8 text-center text-slate-500 font-medium bg-white/20">
                    Belum ada data sekolah.
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
