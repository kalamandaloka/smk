"use client";

import Link from "next/link";
import { useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type ExecutiveSummary = {
  totals: {
    unitCount: number;
    studentCount: number;
    teacherCount: number;
    classCount: number;
  };
  finance: {
    incomeTotal: number;
    expenseTotal: number;
    arrearsTotal: number;
    netTotal: number;
  };
  updatedAt: string;
};

function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export default function KetuaYayasanDashboardPage() {
  const { token } = useAuth();
  const [summary, setSummary] = useState<ExecutiveSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetchJson<ExecutiveSummary>("/foundation/summary", { token, cache: "no-store" });
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
    { href: "/dashboards/ketuayayasan/keuangan/cashflow-ringkas", label: "Cashflow Ringkas" },
  ];

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-xs font-bold text-slate-500">/ketuayayasan</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">Dashboard Ketua Yayasan</h1>
        <p className="text-slate-600 mt-1 text-sm">Ringkasan dan monitoring yayasan.</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] xl:col-span-4">
            <div className="text-sm text-slate-600 font-medium">Memuat ringkasan...</div>
          </div>
        ) : summary ? (
          <>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Total Unit</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.totals.unitCount}</div>
              <div className="text-sm text-slate-600 mt-1">Sekolah/Unit aktif</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Total Siswa</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{summary.totals.studentCount}</div>
              <div className="text-sm text-slate-600 mt-1">Siswa terdaftar</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Pemasukan (Estimasi)</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{formatIDR(summary.finance.incomeTotal)}</div>
              <div className="text-sm text-slate-600 mt-1">Bulan ini</div>
            </div>
            <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
              <div className="text-xs font-bold text-slate-500">Tunggakan (Estimasi)</div>
              <div className="text-2xl font-extrabold text-slate-800 mt-2">{formatIDR(summary.finance.arrearsTotal)}</div>
              <div className="text-sm text-slate-600 mt-1">Akumulasi</div>
            </div>
          </>
        ) : (
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] xl:col-span-4">
            <div className="text-sm text-slate-700 font-semibold">Ringkasan belum tersedia</div>
            <div className="text-sm text-slate-600 mt-1">Pastikan akun Ketua Yayasan punya permission foundation.* dan backend berjalan.</div>
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
