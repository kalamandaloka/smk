"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type StudentSummary = {
  class: { id: string; name: string; homeroomTeacher?: { name: string } | null } | null;
  metrics: {
    tasksTodo: number;
    quizzesTodo: number;
    avgScore: number;
    masteryRatePercent: number;
    attendancePercent: number;
    completedLessons: number;
  };
  updatedAt: string;
};

export default function SiswaDashboardPage() {
  const { token } = useAuth();
  const [summary, setSummary] = useState<StudentSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetchJson<StudentSummary>("/student/summary", { token, cache: "no-store" });
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
    { href: "/dashboards/siswa/akademik/kelas-saya", label: "Kelas Saya" },
    { href: "/dashboards/courses", label: "Mata Pelajaran" },
    { href: "/dashboards/progress", label: "Progress Belajar" },
    { href: "/dashboards/siswa/keuangan/tagihan", label: "Tagihan" },
  ];

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-xs font-bold text-slate-500">/siswa</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">Dashboard Siswa</h1>
        <p className="text-slate-600 mt-1 text-sm">Aktivitas belajar dan progress.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] xl:col-span-4">
            <div className="text-sm text-slate-600 font-medium">Memuat ringkasan...</div>
          </div>
        ) : summary ? (
          <>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Kelas Aktif</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.class?.name ?? "-"}</div>
              <div className="text-sm text-slate-600 mt-1">{summary.class?.homeroomTeacher?.name ? `Wali kelas: ${summary.class.homeroomTeacher.name}` : "Wali kelas: -"}</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Tugas Belum Selesai</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.metrics.tasksTodo}</div>
              <div className="text-sm text-slate-600 mt-1">Placeholder</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Quiz Belum Dikerjakan</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.metrics.quizzesTodo}</div>
              <div className="text-sm text-slate-600 mt-1">Berdasarkan lesson type QUIZ</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Rata-rata Nilai</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.metrics.avgScore}</div>
              <div className="text-sm text-slate-600 mt-1">Berbasis quiz attempt</div>
            </div>
          </>
        ) : (
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] xl:col-span-4">
            <div className="text-sm text-slate-700 font-semibold">Ringkasan belum tersedia</div>
            <div className="text-sm text-slate-600 mt-1">Pastikan akun siswa punya permission student.* dan backend berjalan.</div>
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
