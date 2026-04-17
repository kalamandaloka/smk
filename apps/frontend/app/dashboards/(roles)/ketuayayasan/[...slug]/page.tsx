"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

function titleize(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function KetuaYayasanPlaceholderPage({ params }: { params: { slug: string[] } }) {
  const { token } = useAuth();
  const slugPath = params.slug.join("/");

  const meta = useMemo(() => {
    const key = slugPath;
    switch (key) {
      case "beranda/kalender-kegiatan":
        return { title: "Kalender Kegiatan", description: "Agenda penting yayasan dan sekolah.", endpoint: "/foundation/calendar", kind: "list" as const };
      case "akademik/monitoring-akademik":
        return { title: "Monitoring Akademik", description: "Ringkasan performa akademik lintas unit.", endpoint: "/foundation/academic", kind: "academic" as const };
      case "akademik/monitoring-kurikulum":
        return { title: "Monitoring Kurikulum", description: "Keterlaksanaan kurikulum lintas unit.", endpoint: "/foundation/curriculum", kind: "json" as const };
      case "penilaian/monitoring-hasil-belajar":
        return { title: "Monitoring Hasil Belajar", description: "Ketuntasan berbasis hasil quiz.", endpoint: "/foundation/assessment", kind: "assessment" as const };
      case "penilaian/monitoring-kelulusan":
        return { title: "Monitoring Kelulusan", description: "Ringkasan kelulusan lintas unit.", endpoint: "/foundation/graduation", kind: "graduation" as const };
      case "siswa/monitoring-jumlah":
        return { title: "Monitoring Siswa", description: "Distribusi siswa per unit.", endpoint: "/foundation/students", kind: "students" as const };
      case "siswa/prestasi":
        return { title: "Monitoring Prestasi", description: "Prestasi siswa lintas unit (placeholder).", endpoint: null, kind: "placeholder" as const };
      case "siswa/pelanggaran":
        return { title: "Monitoring Pelanggaran", description: "Pelanggaran siswa lintas unit (placeholder).", endpoint: null, kind: "placeholder" as const };
      case "siswa/risiko-dropout":
        return { title: "Risiko Dropout", description: "Indikator risiko dropout (placeholder).", endpoint: null, kind: "placeholder" as const };
      case "administrasi/monitoring-sdm":
        return { title: "Monitoring SDM", description: "Jumlah guru/staf per unit.", endpoint: "/foundation/hrd", kind: "hrd" as const };
      case "administrasi/approval-strategis":
        return { title: "Approval Strategis", description: "Daftar approval strategis (placeholder).", endpoint: "/foundation/approvals", kind: "list" as const };
      case "administrasi/dokumen-yayasan":
        return { title: "Dokumen Yayasan", description: "Dokumen resmi yayasan (placeholder).", endpoint: "/foundation/documents", kind: "list" as const };
      case "administrasi/audit-ringkas":
        return { title: "Audit Ringkas", description: "Aktivitas penting terbaru.", endpoint: "/foundation/audit", kind: "audit" as const };
      case "keuangan/monitoring-pemasukan":
        return { title: "Monitoring Pemasukan", description: "Estimasi pemasukan per unit.", endpoint: "/foundation/finance/income", kind: "financeIncome" as const };
      case "keuangan/monitoring-pengeluaran":
        return { title: "Monitoring Pengeluaran", description: "Estimasi pengeluaran per unit.", endpoint: "/foundation/finance/expense", kind: "financeExpense" as const };
      case "keuangan/tunggakan":
        return { title: "Monitoring Tunggakan", description: "Estimasi tunggakan per unit.", endpoint: "/foundation/finance/arrears", kind: "financeArrears" as const };
      case "keuangan/cashflow-ringkas":
        return { title: "Cashflow Ringkas", description: "Ringkasan arus kas yayasan (estimasi).", endpoint: "/foundation/finance/cashflow", kind: "financeCashflow" as const };
      case "komunikasi/pengumuman-yayasan":
        return { title: "Pengumuman Yayasan", description: "Pengumuman resmi yayasan (placeholder).", endpoint: "/foundation/announcements", kind: "list" as const };
      case "laporan/bulanan":
        return { title: "Laporan Strategis Bulanan", description: "Ringkasan performa bulanan.", endpoint: "/foundation/reports/bulanan", kind: "report" as const };
      case "laporan/semesteran":
        return { title: "Laporan Strategis Semesteran", description: "Ringkasan performa semesteran.", endpoint: "/foundation/reports/semesteran", kind: "report" as const };
      case "laporan/tahunan":
        return { title: "Laporan Strategis Tahunan", description: "Ringkasan performa tahunan.", endpoint: "/foundation/reports/tahunan", kind: "report" as const };
      case "pengaturan/kebijakan-yayasan":
        return { title: "Kebijakan Yayasan", description: "Kebijakan umum yayasan (placeholder).", endpoint: "/foundation/policies", kind: "list" as const };
      case "pengaturan/preferensi-dashboard":
        return { title: "Preferensi Dashboard", description: "Preferensi tampilan dashboard eksekutif (placeholder).", endpoint: "/foundation/preferences", kind: "json" as const };
      default:
        return { title: titleize(params.slug[params.slug.length - 1] ?? "Menu"), description: "Halaman ini belum dipetakan.", endpoint: null, kind: "placeholder" as const };
    }
  }, [params.slug, slugPath]);

  const [data, setData] = useState<any>(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    async function load() {
      if (!token || !meta.endpoint) return;
      setLoading(true);
      setError(null);
      try {
        const res = await fetchJson<any>(meta.endpoint, { token, cache: "no-store" });
        setData(res);
      } catch {
        setError("Gagal memuat data");
        setData(null);
      } finally {
        setLoading(false);
      }
    }
    load();
  }, [token, meta.endpoint]);

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-xs font-bold text-slate-500">/ketuayayasan/{slugPath}</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">{meta.title}</h1>
        <div className="text-sm text-slate-600 mt-1">{meta.description}</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboards/ketuayayasan" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Dashboard Eksekutif
          </Link>
          <Link href="/dashboards" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Pilih Dashboard
          </Link>
        </div>

        {loading ? <div className="mt-4 text-sm text-slate-600 font-medium">Memuat...</div> : null}
        {error ? <div className="mt-4 text-sm text-red-700 font-semibold">{error}</div> : null}

        {!loading && !error && meta.kind === "placeholder" ? (
          <div className="mt-4 text-sm text-slate-600">Belum ada modul backend khusus untuk halaman ini.</div>
        ) : null}

        {!loading && !error && meta.kind === "json" && data ? (
          <pre className="mt-4 text-xs bg-white/50 border border-white/60 rounded-2xl p-4 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        ) : null}

        {!loading && !error && (meta.kind === "academic" || meta.kind === "assessment" || meta.kind === "graduation" || meta.kind === "students" || meta.kind === "hrd") && data?.rows ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                <tr>
                  <th className="p-3 font-bold text-slate-800">Unit</th>
                  {meta.kind === "academic" ? (
                    <>
                      <th className="p-3 font-bold text-slate-800">Rata-rata Nilai</th>
                      <th className="p-3 font-bold text-slate-800">Pass Rate</th>
                      <th className="p-3 font-bold text-slate-800">Attempt</th>
                    </>
                  ) : meta.kind === "assessment" ? (
                    <>
                      <th className="p-3 font-bold text-slate-800">Ketuntasan</th>
                      <th className="p-3 font-bold text-slate-800">Attempt</th>
                    </>
                  ) : meta.kind === "graduation" ? (
                    <th className="p-3 font-bold text-slate-800">Kelulusan</th>
                  ) : meta.kind === "students" ? (
                    <>
                      <th className="p-3 font-bold text-slate-800">Total</th>
                      <th className="p-3 font-bold text-slate-800">Aktif</th>
                      <th className="p-3 font-bold text-slate-800">Nonaktif</th>
                    </>
                  ) : (
                    <th className="p-3 font-bold text-slate-800">Guru/Staf</th>
                  )}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {data.rows.map((row: any) => (
                  <tr key={row.school?.id ?? row.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-3 text-slate-800 font-semibold">{row.school?.name ?? "-"}</td>
                    {meta.kind === "academic" ? (
                      <>
                        <td className="p-3 text-slate-700">{row.avgScore}</td>
                        <td className="p-3 text-slate-700">{row.passRate}%</td>
                        <td className="p-3 text-slate-700">{row.attempts}</td>
                      </>
                    ) : meta.kind === "assessment" ? (
                      <>
                        <td className="p-3 text-slate-700">{row.masteryRate}%</td>
                        <td className="p-3 text-slate-700">{row.attempts}</td>
                      </>
                    ) : meta.kind === "graduation" ? (
                      <td className="p-3 text-slate-700">{row.graduationRate}%</td>
                    ) : meta.kind === "students" ? (
                      <>
                        <td className="p-3 text-slate-700">{row.totalStudents}</td>
                        <td className="p-3 text-slate-700">{row.activeStudents}</td>
                        <td className="p-3 text-slate-700">{row.inactiveStudents}</td>
                      </>
                    ) : (
                      <td className="p-3 text-slate-700">{row.teacherAndStaffCount}</td>
                    )}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && !error && meta.kind === "audit" && data?.rows ? (
          <div className="mt-4 space-y-2">
            {data.rows.map((l: any) => (
              <div key={l.id} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                <div className="text-sm font-bold text-slate-800">
                  {l.action} <span className="text-slate-500 font-semibold">({l.statusCode})</span>
                </div>
                <div className="text-xs text-slate-600 mt-1">
                  {l.method} {l.path} • {new Date(l.at).toLocaleString("id-ID")}
                </div>
                <div className="text-xs text-slate-600 mt-1">{l.actor ? `${l.actor.name} (${l.actor.email})` : "System"}</div>
              </div>
            ))}
          </div>
        ) : null}

        {!loading && !error && (meta.kind === "financeIncome" || meta.kind === "financeExpense" || meta.kind === "financeArrears") && data?.rows ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                <tr>
                  <th className="p-3 font-bold text-slate-800">Unit</th>
                  <th className="p-3 font-bold text-slate-800">Siswa</th>
                  <th className="p-3 font-bold text-slate-800">{meta.kind === "financeIncome" ? "Pemasukan" : meta.kind === "financeExpense" ? "Pengeluaran" : "Tunggakan"}</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {data.rows.map((r: any) => (
                  <tr key={r.school?.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-3 text-slate-800 font-semibold">{r.school?.name}</td>
                    <td className="p-3 text-slate-700">{r.students}</td>
                    <td className="p-3 text-slate-700">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(
                        meta.kind === "financeIncome" ? r.income : meta.kind === "financeExpense" ? r.expense : r.arrears,
                      )}
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && !error && meta.kind === "financeCashflow" && data?.totals ? (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { label: "Pemasukan", value: data.totals.incomeTotal },
                { label: "Pengeluaran", value: data.totals.expenseTotal },
                { label: "Tunggakan", value: data.totals.arrearsTotal },
                { label: "Saldo Bersih", value: data.totals.netTotal },
              ].map((c) => (
                <div key={c.label} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                  <div className="text-xs font-bold text-slate-500">{c.label}</div>
                  <div className="text-lg font-extrabold text-slate-800 mt-2">
                    {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(c.value))}
                  </div>
                </div>
              ))}
            </div>

            {data.rows ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                    <tr>
                      <th className="p-3 font-bold text-slate-800">Unit</th>
                      <th className="p-3 font-bold text-slate-800">Pemasukan</th>
                      <th className="p-3 font-bold text-slate-800">Pengeluaran</th>
                      <th className="p-3 font-bold text-slate-800">Saldo</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/40">
                    {data.rows.map((r: any) => (
                      <tr key={r.school?.id} className="hover:bg-white/30 transition-colors">
                        <td className="p-3 text-slate-800 font-semibold">{r.school?.name}</td>
                        <td className="p-3 text-slate-700">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(r.income)}</td>
                        <td className="p-3 text-slate-700">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(r.expense)}</td>
                        <td className="p-3 text-slate-700">{new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(r.net)}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        ) : null}

        {!loading && !error && meta.kind === "report" && data ? (
          <div className="mt-4">
            <div className="text-sm font-semibold text-slate-800">{data.title}</div>
            <div className="text-xs text-slate-600 mt-1">Generated: {new Date(data.generatedAt).toLocaleString("id-ID")}</div>
            {Array.isArray(data.sections) ? (
              <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.sections.map((s: any) => (
                  <div key={s.key} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                    <div className="text-sm font-bold text-slate-800">{s.title}</div>
                    <div className="text-sm text-slate-600 mt-1">{s.summary}</div>
                  </div>
                ))}
              </div>
            ) : null}
          </div>
        ) : null}

        {!loading && !error && meta.kind === "list" && data?.rows ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.rows.map((r: any) => (
              <div key={r.id} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                <div className="text-sm font-bold text-slate-800">{r.title ?? r.type ?? r.id}</div>
                <div className="text-xs text-slate-600 mt-1">
                  {r.category ? `Kategori: ${r.category}` : null}
                  {r.unit ? `Unit: ${r.unit}` : null}
                </div>
                <div className="text-xs text-slate-600 mt-1">{r.status ? `Status: ${r.status}` : null}</div>
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
