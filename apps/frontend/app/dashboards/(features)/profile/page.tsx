"use client";

import { useMemo } from "react";
import { useAuth } from "@/app/providers";
import { getRoleCodes } from "@/app/lib/auth";

export default function ProfilePage() {
  const { user } = useAuth();
  const roles = useMemo(() => getRoleCodes(user), [user]);

  if (!user) return null;

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <h1 className="text-2xl font-bold text-slate-800">Profil Akun</h1>
        <div className="text-sm text-slate-600 mt-1">Informasi akun yang sedang login.</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="grid gap-4 md:grid-cols-2">
          <div>
            <div className="text-xs font-bold text-slate-500">Nama</div>
            <div className="text-slate-800 font-semibold">{user.name}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Email</div>
            <div className="text-slate-800 font-semibold">{user.email}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Status</div>
            <div className="text-slate-800 font-semibold">{user.isActive ? "Aktif" : "Nonaktif"}</div>
          </div>
          <div>
            <div className="text-xs font-bold text-slate-500">Role</div>
            <div className="flex flex-wrap gap-2 mt-1">
              {roles.length === 0 ? (
                <span className="text-sm text-slate-600">-</span>
              ) : (
                roles.map((r) => (
                  <span key={r} className="px-2 py-1 rounded-full text-xs font-semibold bg-white/60 border border-white/70 text-slate-700">
                    {r}
                  </span>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
