"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type AdminSummary = {
  school: { id: string; name: string } | null;
  totals: { students: number; teachers: number; classes: number };
  finance: { incomeMonth: number; paymentsMonth: number; arrears: number };
  updatedAt: string;
};

function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export default function AdminDashboardPage() {
  const { token } = useAuth();
  const [summary, setSummary] = useState<AdminSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetchJson<AdminSummary>("/admin/summary", { token, cache: "no-store" });
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
    { href: "/dashboards/academic-years", label: "Tahun Ajaran" },
    { href: "/dashboards/semesters", label: "Semester" },
    { href: "/dashboards/programs", label: "Program" },
    { href: "/dashboards/departments", label: "Jurusan" },
    { href: "/dashboards/classes", label: "Kelas" },
    { href: "/dashboards/admin/keuangan/tunggakan", label: "Tunggakan" },
  ];

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-xs font-bold text-slate-500">/admin</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">Dashboard Admin</h1>
        <p className="text-slate-600 mt-1 text-sm">Kelola data akademik dan operasional.</p>
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
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.totals.students}</div>
              <div className="text-sm text-slate-600 mt-1">{summary.school?.name ?? "Sekolah"}</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Total Guru</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.totals.teachers}</div>
              <div className="text-sm text-slate-600 mt-1">Pengajar & BK</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Pembayaran (Estimasi)</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{formatIDR(summary.finance.paymentsMonth)}</div>
              <div className="text-sm text-slate-600 mt-1">Bulan ini</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Tunggakan (Estimasi)</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{formatIDR(summary.finance.arrears)}</div>
              <div className="text-sm text-slate-600 mt-1">Bulan ini</div>
            </div>
          </>
        ) : (
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] xl:col-span-4">
            <div className="text-sm text-slate-700 font-semibold">Ringkasan belum tersedia</div>
            <div className="text-sm text-slate-600 mt-1">Pastikan akun Admin Akademik punya permission admin.* dan backend berjalan.</div>
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
