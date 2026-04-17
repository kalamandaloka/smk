"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type PrincipalSummary = {
  school: { id: string; name: string } | null;
  totals: { studentCount: number; teacherCount: number; classCount: number };
  metrics: { studentAttendancePercent: number; teacherAttendancePercent: number; masteryRatePercent: number; avgScore: number };
  updatedAt: string;
};

export default function KepalaSekolahDashboardPage() {
  const { token } = useAuth();
  const [summary, setSummary] = useState<PrincipalSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetchJson<PrincipalSummary>("/principal/summary", { token, cache: "no-store" });
        setSummary(res);
      } catch {
        setSummary(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  const shortcuts = [
    { href: "/dashboards/reports", label: "Laporan" },
    { href: "/dashboards/schools", label: "Sekolah" },
    { href: "/dashboards/courses", label: "Mata Pelajaran" },
    { href: "/dashboards/kepalasekolah/penilaian/monitoring-nilai", label: "Monitoring Nilai" },
  ];

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-xs font-bold text-slate-500">/kepalasekolah</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">Dashboard Kepala Sekolah</h1>
        <p className="text-slate-600 mt-1 text-sm">Ringkasan sekolah dan monitoring akademik.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] xl:col-span-4">
            <div className="text-sm text-slate-600 font-medium">Memuat ringkasan...</div>
          </div>
        ) : summary ? (
          <>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Total Siswa</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.totals.studentCount}</div>
              <div className="text-sm text-slate-600 mt-1">{summary.school?.name ?? "Sekolah"}</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Total Guru/Staff</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.totals.teacherCount}</div>
              <div className="text-sm text-slate-600 mt-1">Tenaga kependidikan</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Kehadiran Siswa</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.metrics.studentAttendancePercent}%</div>
              <div className="text-sm text-slate-600 mt-1">Estimasi</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Ketuntasan Belajar</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.metrics.masteryRatePercent}%</div>
              <div className="text-sm text-slate-600 mt-1">Berbasis quiz</div>
            </div>
          </>
        ) : (
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] xl:col-span-4">
            <div className="text-sm text-slate-700 font-semibold">Ringkasan belum tersedia</div>
            <div className="text-sm text-slate-600 mt-1">Pastikan akun Kepala Sekolah punya permission principal.* dan backend berjalan.</div>
          </div>
        )}
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
