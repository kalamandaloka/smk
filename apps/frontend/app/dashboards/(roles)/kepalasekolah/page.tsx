"use client";

import Link from "next/link";

export default function KepalaSekolahDashboardPage() {
  const shortcuts = [
    { href: "/dashboards/reports", label: "Laporan" },
    { href: "/dashboards/schools", label: "Sekolah" },
    { href: "/dashboards/courses", label: "Mata Pelajaran" },
  ];

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-xs font-bold text-slate-500">/kepalasekolah</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">Dashboard Kepala Sekolah</h1>
        <p className="text-slate-600 mt-1 text-sm">Ringkasan sekolah dan monitoring akademik.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {shortcuts.map((s) => (
          <Link key={s.href} href={s.href} className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:bg-white/60 transition-all">
            <div className="text-lg font-bold text-slate-800">{s.label}</div>
            <div className="text-sm text-slate-600 mt-2">{s.href}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
