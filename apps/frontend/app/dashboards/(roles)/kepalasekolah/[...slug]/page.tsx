"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

function titleize(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function KepalaSekolahPlaceholderPage({ params }: { params: { slug: string[] } }) {
  const { token } = useAuth();
  const slugPath = params.slug.join("/");

  const meta = useMemo(() => {
    const key = slugPath;
    switch (key) {
      case "beranda/kalender-sekolah":
        return { title: "Kalender Sekolah", description: "Agenda penting sekolah.", endpoint: "/principal/calendar", kind: "list" as const };
      case "akademik/monitoring-pembelajaran":
        return { title: "Monitoring Pembelajaran", description: "Aktivitas pembelajaran lintas kelas.", endpoint: "/principal/learning", kind: "json" as const };
      case "akademik/monitoring-guru":
        return { title: "Monitoring Guru", description: "Performa guru dan tenaga kependidikan.", endpoint: "/principal/teachers", kind: "json" as const };
      case "akademik/kurikulum-jadwal":
        return { title: "Kurikulum & Jadwal", description: "Kurikulum dan perubahan jadwal.", endpoint: "/principal/curriculum-schedule", kind: "json" as const };
      case "akademik/absensi-sekolah":
        return { title: "Absensi Sekolah", description: "Ringkasan kehadiran siswa dan guru.", endpoint: "/principal/attendance", kind: "json" as const };
      case "penilaian/monitoring-nilai":
        return { title: "Monitoring Nilai", description: "Statistik nilai berbasis quiz.", endpoint: "/principal/scores", kind: "json" as const };
      case "penilaian/validasi-nilai-akhir":
        return { title: "Validasi Nilai Akhir", description: "Status validasi nilai akhir per kelas.", endpoint: "/principal/final-score-validation", kind: "list" as const };
      case "penilaian/rapor":
        return { title: "Rapor", description: "Status rapor per kelas.", endpoint: "/principal/report-cards", kind: "list" as const };
      case "penilaian/kelulusan":
        return { title: "Kelulusan", description: "Status kelulusan siswa akhir.", endpoint: "/principal/graduation", kind: "json" as const };
      case "siswa/monitoring-siswa":
        return { title: "Monitoring Siswa", description: "Distribusi siswa dan status.", endpoint: "/principal/students", kind: "json" as const };
      case "siswa/bk-kesiswaan":
        return { title: "BK & Kesiswaan", description: "Ringkasan layanan BK dan disiplin.", endpoint: "/principal/bk", kind: "json" as const };
      case "siswa/prestasi":
        return { title: "Prestasi", description: "Ringkasan prestasi siswa.", endpoint: "/principal/achievements", kind: "json" as const };
      case "siswa/pelanggaran":
        return { title: "Pelanggaran", description: "Ringkasan pelanggaran siswa.", endpoint: "/principal/violations", kind: "json" as const };
      case "administrasi/approval-program":
        return { title: "Approval Program", description: "Persetujuan program/kegiatan sekolah.", endpoint: "/principal/approvals", kind: "list" as const };
      case "administrasi/dokumen-sekolah":
        return { title: "Dokumen Sekolah", description: "Dokumen resmi sekolah.", endpoint: "/principal/documents", kind: "list" as const };
      case "administrasi/monitoring-sdm":
        return { title: "Monitoring SDM", description: "Ringkasan SDM sekolah.", endpoint: "/principal/hrd", kind: "json" as const };
      case "keuangan/ringkas":
        return { title: "Keuangan Ringkas", description: "Ringkasan finansial sekolah (estimasi).", endpoint: "/principal/finance/summary", kind: "json" as const };
      case "keuangan/monitoring-pembayaran-siswa":
        return { title: "Monitoring Pembayaran Siswa", description: "Status pembayaran siswa (placeholder).", endpoint: "/principal/payments", kind: "list" as const };
      case "komunikasi/pengumuman-sekolah":
        return { title: "Pengumuman Sekolah", description: "Pengumuman resmi sekolah (placeholder).", endpoint: "/principal/announcements", kind: "list" as const };
      case "laporan/akademik":
        return { title: "Laporan Akademik", description: "Rekap akademik sekolah.", endpoint: "/principal/reports/akademik", kind: "report" as const };
      case "laporan/guru":
        return { title: "Laporan Guru", description: "Laporan performa guru.", endpoint: "/principal/reports/guru", kind: "report" as const };
      case "laporan/siswa":
        return { title: "Laporan Siswa", description: "Laporan statistik siswa.", endpoint: "/principal/reports/siswa", kind: "report" as const };
      case "laporan/disiplin":
        return { title: "Laporan Disiplin", description: "Laporan BK dan kedisiplinan.", endpoint: "/principal/reports/disiplin", kind: "report" as const };
      case "laporan/keuangan-ringkas":
        return { title: "Laporan Keuangan Ringkas", description: "Ringkasan keuangan sekolah.", endpoint: "/principal/reports/keuangan-ringkas", kind: "report" as const };
      case "pengaturan/profil-sekolah":
        return { title: "Profil Sekolah", description: "Profil dasar sekolah (placeholder).", endpoint: "/schools", kind: "json" as const };
      case "pengaturan/preferensi":
        return { title: "Preferensi Dashboard", description: "Preferensi tampilan (placeholder).", endpoint: "/principal/preferences", kind: "json" as const };
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
        <div className="text-xs font-bold text-slate-500">/kepalasekolah/{slugPath}</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">{meta.title}</h1>
        <div className="text-sm text-slate-600 mt-1">{meta.description}</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboards/kepalasekolah" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Dashboard Kepala Sekolah
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

        {!loading && !error && meta.kind === "report" && data ? (
          <div className="mt-4">
            <div className="text-sm font-semibold text-slate-800">{data.title}</div>
            <div className="text-xs text-slate-600 mt-1">Generated: {data.generatedAt ? new Date(data.generatedAt).toLocaleString("id-ID") : "-"}</div>
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
                <div className="text-sm font-bold text-slate-800">{r.title ?? r.type ?? r.className ?? r.id}</div>
                {r.category ? <div className="text-xs text-slate-600 mt-1">Kategori: {r.category}</div> : null}
                {r.status ? <div className="text-xs text-slate-600 mt-1">Status: {r.status}</div> : null}
                {r.note ? <div className="text-xs text-slate-600 mt-1">{r.note}</div> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
