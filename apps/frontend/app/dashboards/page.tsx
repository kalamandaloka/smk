"use client";

import { useEffect, useMemo } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/app/providers";
import { getRoleCodes } from "@/app/lib/auth";

const ROLE_DASHBOARD_ORDER: { code: string; href: string; label: string }[] = [
  { code: "PLATFORM_ADMIN", href: "/dashboards/superadmin", label: "Superadmin" },
  { code: "ACADEMIC_ADMIN", href: "/dashboards/admin", label: "Admin" },
  { code: "PRINCIPAL", href: "/dashboards/kepalasekolah", label: "Kepala Sekolah" },
  { code: "TEACHER", href: "/dashboards/guru", label: "Guru" },
  { code: "HOMEROOM", href: "/dashboards/guru/walikelas", label: "Wali Kelas" },
  { code: "HEAD_PROGRAM", href: "/dashboards/guru/kurikulum", label: "Kurikulum" },
  { code: "STUDENT", href: "/dashboards/siswa", label: "Siswa" },
  { code: "COUNSELOR", href: "/dashboards/bk", label: "BK" },
  { code: "FINANCE", href: "/dashboards/keuangan", label: "Keuangan" },
  { code: "CHAIRMAN_FOUNDATION", href: "/dashboards/ketuayayasan", label: "Ketua Yayasan" },
];

function pickDashboards(roleCodes: string[]) {
  const set = new Set(roleCodes);
  const picked = ROLE_DASHBOARD_ORDER.filter((r) => set.has(r.code));
  const uniqueByHref = new Map<string, { href: string; label: string; code: string }>();
  for (const item of picked) {
    if (!uniqueByHref.has(item.href)) uniqueByHref.set(item.href, item);
  }
  return Array.from(uniqueByHref.values());
}

export default function DashboardHome() {
  const router = useRouter();
  const { user } = useAuth();
  const roles = useMemo(() => getRoleCodes(user), [user]);
  const dashboards = useMemo(() => pickDashboards(roles), [roles]);

  useEffect(() => {
    if (!user) return;
    if (dashboards.length === 1) {
      router.replace(dashboards[0].href);
    }
  }, [dashboards, router, user]);

  if (!user) return null;

  if (dashboards.length === 1) {
    return (
      <main className="min-h-[50vh] flex items-center justify-center">
        <div className="text-sm text-slate-600">Mengarahkan ke dashboard…</div>
      </main>
    );
  }

  if (dashboards.length === 0) {
    return (
      <main className="space-y-4">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard</h1>
        <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
          <div className="text-slate-700 font-semibold">Role belum ada</div>
          <div className="text-sm text-slate-600 mt-1">
            Akun ini belum memiliki role. Silakan atur role di menu Admin.
          </div>
        </div>
      </main>
    );
  }

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <h1 className="text-2xl font-bold text-slate-800">Pilih Dashboard</h1>
        <p className="text-slate-600 mt-1 text-sm">Akun ini memiliki beberapa role. Pilih dashboard yang ingin dibuka.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {dashboards.map((d) => (
          <Link
            key={d.href}
            href={d.href}
            className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:bg-white/60 transition-all"
          >
            <div className="text-xs font-bold text-slate-500">{d.code}</div>
            <div className="text-lg font-bold text-slate-800 mt-1">{d.label}</div>
            <div className="text-sm text-slate-600 mt-2">{d.href}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
