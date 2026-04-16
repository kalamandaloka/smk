"use client";

import { useMemo } from "react";
import { useAuth } from "@/app/providers";
import { getRoleCodes } from "@/app/lib/auth";

function canManageDocuments(roleCodes: string[]) {
  const set = new Set(roleCodes);
  return (
    set.has("PLATFORM_ADMIN") ||
    set.has("ACADEMIC_ADMIN") ||
    set.has("PRINCIPAL") ||
    set.has("CHAIRMAN_FOUNDATION")
  );
}

export default function DocumentsPage() {
  const { user } = useAuth();
  const roles = useMemo(() => getRoleCodes(user), [user]);
  const manage = useMemo(() => canManageDocuments(roles), [roles]);

  if (!user) return null;

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <h1 className="text-2xl font-bold text-slate-800">Dokumen / Arsip</h1>
        <div className="text-sm text-slate-600 mt-1">{manage ? "Akses penuh (kelola dokumen)." : "Akses terbatas (lihat/unduh)."}</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        {manage ? (
          <>
            <div className="text-slate-700 font-semibold">Kelola dokumen</div>
            <div className="text-sm text-slate-600 mt-1">Nanti bisa ditambah fitur upload, folder, permission, dan approval.</div>
          </>
        ) : (
          <>
            <div className="text-slate-700 font-semibold">Akses terbatas</div>
            <div className="text-sm text-slate-600 mt-1">Role ini hanya bisa melihat/unduh dokumen yang dipublikasikan.</div>
          </>
        )}
      </div>
    </main>
  );
}
