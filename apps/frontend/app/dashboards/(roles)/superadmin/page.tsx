"use client";

import { useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type SuperadminSummary = {
  totals: {
    schoolCount: number;
    userCount: number;
    activeUserCount: number;
    studentCount: number;
    teacherCount: number;
    classCount: number;
  };
  finance: {
    paymentsTotal: number;
    arrearsTotal: number;
    incomeTotal: number;
  };
  updatedAt: string;
};

function formatIDR(value: number) {
  return new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(value);
}

export default function SuperadminDashboardPage() {
  const { token } = useAuth();
  const [summary, setSummary] = useState<SuperadminSummary | null>(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    async function load() {
      if (!token) return;
      setLoading(true);
      try {
        const res = await fetchJson<SuperadminSummary>("/superadmin/summary", { token, cache: "no-store" });
        setSummary(res);
      } catch {
        setSummary(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token]);

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Superadmin</h1>
        <div className="text-sm text-slate-600 mt-1">Ringkasan seluruh sekolah/unit dan status sistem.</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {loading ? (
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] xl:col-span-4">
            <div className="text-sm text-slate-600 font-medium">Memuat ringkasan...</div>
          </div>
        ) : summary ? (
          <>
            {[
              { label: "Total Unit Sekolah", value: summary.totals.schoolCount },
              { label: "User Aktif", value: summary.totals.activeUserCount },
              { label: "Total Siswa", value: summary.totals.studentCount },
              { label: "Pembayaran Bulan Ini (Estimasi)", value: formatIDR(summary.finance.paymentsTotal) },
            ].map((item) => (
              <div key={item.label} className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
                <div className="text-xs font-bold text-slate-500">{item.label}</div>
                <div className="text-2xl font-extrabold text-slate-800 mt-2">{item.value}</div>
              </div>
            ))}
          </>
        ) : (
          <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] xl:col-span-4">
            <div className="text-sm text-slate-700 font-semibold">Ringkasan belum tersedia</div>
            <div className="text-sm text-slate-600 mt-1">Pastikan akun Superadmin punya permission platform.manage dan backend berjalan.</div>
          </div>
        )}
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-slate-800 font-bold">Server Status</div>
        <div className="text-sm text-slate-600 mt-1">Backend OK (JWT + permissions). Monitoring detail (storage/job queue) masih placeholder.</div>
      </div>
    </main>
  );
}
