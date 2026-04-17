"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

function titleize(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function AdminPlaceholderPage({ params }: { params: { slug: string[] } }) {
  const { token } = useAuth();
  const slugPath = params.slug.join("/");

  const meta = useMemo(() => {
    const key = slugPath;
    switch (key) {
      case "akademik/rombel":
        return { title: "Rombel", description: "Rombongan belajar per kelas.", endpoint: "/admin/rombel", kind: "rombel" as const };
      case "akademik/jadwal-pelajaran":
        return { title: "Jadwal Pelajaran", description: "Jadwal pelajaran (placeholder).", endpoint: "/admin/schedules/pelajaran", kind: "list" as const };
      case "akademik/jadwal-ujian":
        return { title: "Jadwal Ujian", description: "Jadwal ujian (placeholder).", endpoint: "/admin/schedules/ujian", kind: "list" as const };
      case "akademik/lms-management":
        return { title: "LMS Management", description: "Ringkasan struktur LMS (course/modul/lesson).", endpoint: "/admin/lms-management", kind: "json" as const };
      case "penilaian/ujian-dan-penilaian":
        return { title: "Ujian & Penilaian", description: "Overview penilaian (placeholder).", endpoint: "/admin/grades/recap", kind: "json" as const };
      case "penilaian/bank-soal":
        return { title: "Bank Soal", description: "Bank soal sekolah (belum ada modul).", endpoint: null, kind: "placeholder" as const };
      case "penilaian/rekap-nilai":
        return { title: "Rekap Nilai", description: "Ringkasan nilai berbasis quiz attempt.", endpoint: "/admin/grades/recap", kind: "json" as const };
      case "penilaian/monitoring-input-nilai":
        return { title: "Monitoring Input Nilai", description: "Pemantauan keterlambatan input nilai (placeholder).", endpoint: "/admin/grades/late-input", kind: "list" as const };
      case "siswa/data-siswa":
        return { title: "Data Siswa", description: "Daftar siswa sekolah.", endpoint: "/admin/students", kind: "users" as const };
      case "siswa/mutasi":
        return { title: "Mutasi", description: "Mutasi siswa (belum ada modul).", endpoint: null, kind: "placeholder" as const };
      case "siswa/kenaikan-kelas":
        return { title: "Kenaikan Kelas", description: "Proses kenaikan kelas (belum ada modul).", endpoint: null, kind: "placeholder" as const };
      case "siswa/data-kelas":
        return { title: "Data Kelas", description: "Komposisi kelas (rombel).", endpoint: "/admin/rombel", kind: "rombel" as const };
      case "administrasi/data-guru-staff":
        return { title: "Data Guru & Staff", description: "Daftar guru/staff sekolah.", endpoint: "/admin/staff", kind: "staff" as const };
      case "administrasi/approval-data":
        return { title: "Approval Data", description: "Approval data operasional (placeholder).", endpoint: "/admin/approvals", kind: "list" as const };
      case "administrasi/pengaturan-sekolah":
        return { title: "Pengaturan Sekolah", description: "Konfigurasi sekolah.", endpoint: "/admin/school/settings", kind: "json" as const };
      case "keuangan/monitoring-tagihan":
        return { title: "Monitoring Tagihan", description: "Ringkasan tagihan (estimasi).", endpoint: "/admin/finance", kind: "finance" as const };
      case "keuangan/pembayaran":
        return { title: "Pembayaran", description: "Ringkasan pembayaran (estimasi).", endpoint: "/admin/finance", kind: "finance" as const };
      case "keuangan/tunggakan":
        return { title: "Tunggakan", description: "Ringkasan tunggakan (estimasi).", endpoint: "/admin/finance", kind: "finance" as const };
      case "laporan/absensi":
        return { title: "Laporan Absensi", description: "Laporan absensi sekolah (placeholder).", endpoint: "/admin/reports/attendance", kind: "json" as const };
      case "laporan/keuangan":
        return { title: "Laporan Keuangan", description: "Laporan keuangan ringkas (estimasi).", endpoint: "/admin/reports/finance", kind: "json" as const };
      case "laporan/pengguna":
        return { title: "Laporan Pengguna", description: "Ringkasan user aktif/nonaktif.", endpoint: "/admin/reports/users", kind: "json" as const };
      case "pengaturan/identitas-sekolah":
        return { title: "Identitas Sekolah", description: "Profil sekolah (data dasar).", endpoint: "/admin/school/settings", kind: "json" as const };
      case "pengaturan/template-dokumen":
        return { title: "Template Dokumen", description: "Template dokumen (belum ada modul).", endpoint: null, kind: "placeholder" as const };
      case "pengaturan/logo":
        return { title: "Logo", description: "Pengaturan logo sekolah (belum ada modul).", endpoint: null, kind: "placeholder" as const };
      case "pengaturan/kop-rapor":
        return { title: "Kop Rapor", description: "Template kop rapor (belum ada modul).", endpoint: null, kind: "placeholder" as const };
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
        <div className="text-xs font-bold text-slate-500">/admin/{slugPath}</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">{meta.title}</h1>
        <div className="text-sm text-slate-600 mt-1">{meta.description}</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/dashboards/admin" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Dashboard Admin
          </Link>
          <Link href="/dashboards" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Pilih Dashboard
          </Link>
        </div>

        {loading ? <div className="mt-4 text-sm text-slate-600 font-medium">Memuat...</div> : null}
        {error ? <div className="mt-4 text-sm text-red-700 font-semibold">{error}</div> : null}
        {!loading && !error && meta.kind === "placeholder" ? <div className="mt-4 text-sm text-slate-600">Belum ada modul backend untuk halaman ini.</div> : null}

        {!loading && !error && meta.kind === "json" && data ? (
          <pre className="mt-4 text-xs bg-white/50 border border-white/60 rounded-2xl p-4 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
        ) : null}

        {!loading && !error && meta.kind === "rombel" && data?.rows ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                <tr>
                  <th className="p-3 font-bold text-slate-800">Kelas/Rombel</th>
                  <th className="p-3 font-bold text-slate-800">Jurusan</th>
                  <th className="p-3 font-bold text-slate-800">Wali Kelas</th>
                  <th className="p-3 font-bold text-slate-800">Jumlah Siswa</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {data.rows.map((r: any) => (
                  <tr key={r.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-3 text-slate-800 font-semibold">{r.name}</td>
                    <td className="p-3 text-slate-700">{r.department?.name ?? "-"}</td>
                    <td className="p-3 text-slate-700">{r.homeroomTeacher?.name ?? "-"}</td>
                    <td className="p-3 text-slate-700">{r.studentCount}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && !error && (meta.kind === "users" || meta.kind === "staff") && data?.rows ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                <tr>
                  <th className="p-3 font-bold text-slate-800">Nama</th>
                  <th className="p-3 font-bold text-slate-800">Email</th>
                  {meta.kind === "staff" ? <th className="p-3 font-bold text-slate-800">Role</th> : <th className="p-3 font-bold text-slate-800">Aktif</th>}
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {data.rows.map((u: any) => (
                  <tr key={u.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-3 text-slate-800 font-semibold">{u.name}</td>
                    <td className="p-3 text-slate-700">{u.email}</td>
                    {meta.kind === "staff" ? <td className="p-3 text-slate-700">{(u.roles ?? []).join(", ")}</td> : <td className="p-3 text-slate-700">{u.isActive ? "Ya" : "Tidak"}</td>}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && !error && meta.kind === "finance" && data?.metrics ? (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-4">
              {[
                { label: "Total Tagihan", value: data.metrics.billsTotal },
                { label: "Total Pembayaran", value: data.metrics.paymentsTotal },
                { label: "Total Tunggakan", value: data.metrics.arrearsTotal },
                { label: "Siswa Menunggak", value: data.metrics.arrearsStudents },
              ].map((c: any) => (
                <div key={c.label} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                  <div className="text-xs font-bold text-slate-500">{c.label}</div>
                  <div className="text-lg font-extrabold text-slate-800 mt-2">
                    {typeof c.value === "number" && c.label !== "Siswa Menunggak"
                      ? new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(c.value)
                      : c.value}
                  </div>
                </div>
              ))}
            </div>

            {Array.isArray(data.rows) ? (
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                {data.rows.map((r: any) => (
                  <div key={r.id} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                    <div className="text-sm font-bold text-slate-800">{r.label}</div>
                    <div className="text-sm text-slate-700 mt-1">
                      {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(r.amount))}
                    </div>
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
                <div className="text-sm font-bold text-slate-800">{r.title ?? r.type ?? r.item ?? r.id}</div>
                {r.day && r.time ? <div className="text-xs text-slate-600 mt-1">{r.day} • {r.time}</div> : null}
                {r.date ? <div className="text-xs text-slate-600 mt-1">{r.date}</div> : null}
                {r.className ? <div className="text-xs text-slate-600 mt-1">{r.className}</div> : null}
                {r.teacher ? <div className="text-xs text-slate-600 mt-1">{r.teacher}</div> : null}
                {r.subject ? <div className="text-xs text-slate-600 mt-1">{r.subject}</div> : null}
                {r.status ? <div className="text-xs text-slate-600 mt-1">Status: {r.status}</div> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
