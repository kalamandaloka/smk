"use client";

import { useEffect, useState } from "react";
import { useAuth } from "@/app/providers";
import { fetchJson } from "@/app/lib/api";

type User = {
  id: string;
  email: string;
  name: string;
  isActive: boolean;
  createdAt: string;
};

type Role = {
  id: string;
  code: string;
  name: string;
};

export default function UsersPage() {
  const { token } = useAuth();
  const [users, setUsers] = useState<User[]>([]);
  const [roles, setRoles] = useState<Role[]>([]);
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");
  const [roleCode, setRoleCode] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function loadData() {
    if (!token) return;
    try {
      const [u, r] = await Promise.all([
        fetchJson<User[]>("/users", { token, cache: "no-store" }),
        fetchJson<Role[]>("/roles", { token, cache: "no-store" }),
      ]);
      setUsers(u);
      setRoles(r);
      if (!roleCode && r.length > 0) {
        setRoleCode(r[0].code);
      }
    } catch {
      setError("Gagal memuat data pengguna atau role");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    loadData();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    try {
      await fetchJson("/users", {
        token,
        method: "POST",
        body: JSON.stringify({ email, name, password, roleCode: roleCode || undefined }),
      });
      setEmail("");
      setName("");
      setPassword("");
      await loadData();
    } catch {
      setError("Gagal membuat pengguna. Pastikan email unik.");
    }
  }

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Manajemen Pengguna</h1>

      {error && <div className="bg-red-100 text-red-700 p-3 rounded mb-4">{error}</div>}

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] mb-8">
        <h2 className="text-xl font-bold mb-4 text-slate-800 drop-shadow-sm">Tambah Pengguna Baru</h2>
        <form onSubmit={onSubmit} className="space-y-4 max-w-md">
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Nama</label>
            <input
              type="text"
              required
              minLength={2}
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="Masukkan nama lengkap"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Email</label>
            <input
              type="email"
              required
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="Masukkan email"
            />
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Role</label>
            <select
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 shadow-inner"
              value={roleCode}
              onChange={(e) => setRoleCode(e.target.value)}
            >
              <option value="">-- Tanpa Role --</option>
              {roles.map((r) => (
                <option key={r.code} value={r.code}>
                  {r.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Password</label>
            <input
              type="password"
              required
              minLength={6}
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>
          <button
            type="submit"
            className="bg-blue-600/90 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 backdrop-blur-md transition-all border border-blue-500/50 hover:scale-[1.02]"
          >
            Simpan User
          </button>
        </form>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-medium bg-white/20">Memuat data...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
              <tr>
                <th className="p-4 font-bold text-slate-800">Nama</th>
                <th className="p-4 font-bold text-slate-800">Email</th>
                <th className="p-4 font-bold text-slate-800">Status</th>
                <th className="p-4 font-bold text-slate-800">Dibuat Pada</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {users.map((u) => (
                <tr key={u.id} className="hover:bg-white/30 transition-colors">
                  <td className="p-4 text-slate-700 font-medium">{u.name}</td>
                  <td className="p-4 text-slate-600">{u.email}</td>
                  <td className="p-4">
                    {u.isActive ? (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-green-100 text-green-700">Aktif</span>
                    ) : (
                      <span className="px-2 py-1 rounded-full text-xs font-semibold bg-red-100 text-red-700">Nonaktif</span>
                    )}
                  </td>
                  <td className="p-4 text-slate-600">{new Date(u.createdAt).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
              {users.length === 0 && (
                <tr>
                  <td colSpan={4} className="p-8 text-center text-slate-500 font-medium bg-white/20">
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
