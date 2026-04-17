"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

function titleize(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SiswaPlaceholderPage({ params }: { params: { slug: string[] } }) {
  const { token } = useAuth();
  const slugPath = params.slug.join("/");

  const meta = useMemo(() => {
    const key = slugPath;
    switch (key) {
      case "beranda/kalender-belajar":
        return { title: "Kalender Belajar", description: "Jadwal belajar dan deadline.", endpoint: "/student/calendar", kind: "list" as const };
      case "akademik/kelas-saya":
        return { title: "Kelas Saya", description: "Identitas kelas siswa.", endpoint: "/student/classes", kind: "classes" as const };
      case "akademik/tugas-saya":
        return { title: "Tugas Saya", description: "Daftar tugas dan submit tugas.", endpoint: null, kind: "placeholder" as const };
      case "akademik/jadwal-pelajaran":
        return { title: "Jadwal Pelajaran", description: "Jadwal pelajaran siswa.", endpoint: "/student/calendar", kind: "list" as const };
      case "penilaian/nilai-ujian":
        return { title: "Nilai Ujian", description: "Nilai quiz/ujian berbasis attempt.", endpoint: "/student/grades/quizzes", kind: "grades" as const };
      case "penilaian/nilai-tugas":
        return { title: "Nilai Tugas", description: "Nilai tugas (belum tersedia modul).", endpoint: null, kind: "placeholder" as const };
      case "penilaian/nilai-praktik":
        return { title: "Nilai Praktik", description: "Nilai praktik (belum tersedia modul).", endpoint: null, kind: "placeholder" as const };
      case "penilaian/rapor":
        return { title: "Rapor", description: "Dokumen rapor siswa.", endpoint: "/student/documents", kind: "documents" as const };
      case "siswa/absensi":
        return { title: "Absensi", description: "Riwayat kehadiran pribadi.", endpoint: "/student/attendance", kind: "attendance" as const };
      case "siswa/portofolio":
        return { title: "Portofolio", description: "Hasil karya dan proyek siswa.", endpoint: "/student/portfolio", kind: "list" as const };
      case "siswa/bk-konseling":
        return { title: "BK / Konseling", description: "Pengajuan dan jadwal konseling.", endpoint: "/student/counseling", kind: "list" as const };
      case "administrasi/dokumen-siswa":
        return { title: "Dokumen Siswa", description: "Dokumen pribadi siswa.", endpoint: "/student/documents", kind: "documents" as const };
      case "administrasi/sertifikat":
        return { title: "Sertifikat", description: "Sertifikat kegiatan/prestasi.", endpoint: "/student/documents", kind: "documents" as const };
      case "keuangan/tagihan":
        return { title: "Tagihan", description: "Tagihan aktif siswa.", endpoint: "/student/finance", kind: "finance" as const };
      case "keuangan/status-pembayaran":
        return { title: "Status Pembayaran", description: "Status pembayaran tagihan.", endpoint: "/student/finance", kind: "finance" as const };
      case "keuangan/riwayat-pembayaran":
        return { title: "Riwayat Pembayaran", description: "Riwayat transaksi pembayaran.", endpoint: "/student/finance", kind: "finance" as const };
      case "laporan/rekap-kehadiran":
        return { title: "Rekap Kehadiran", description: "Ringkasan kehadiran.", endpoint: "/student/attendance", kind: "attendance" as const };
      case "laporan/ringkasan-nilai":
        return { title: "Ringkasan Nilai", description: "Ringkasan nilai siswa.", endpoint: "/student/grades/quizzes", kind: "grades" as const };
      case "pengaturan/ganti-password":
        return { title: "Ganti Password", description: "Ubah password akun.", endpoint: null, kind: "placeholder" as const };
      case "pengaturan/preferensi":
        return { title: "Preferensi", description: "Preferensi tampilan dan notifikasi.", endpoint: null, kind: "placeholder" as const };
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
        <div className="text-xs font-bold text-slate-500">/siswa/{slugPath}</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">{meta.title}</h1>
        <div className="text-sm text-slate-600 mt-1">{meta.description}</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="flex flex-wrap gap-2">
          <Link href="/dashboards/siswa" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Dashboard Siswa
          </Link>
          <Link href="/dashboards" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Pilih Dashboard
          </Link>
        </div>

        {loading ? <div className="mt-4 text-sm text-slate-600 font-medium">Memuat...</div> : null}
        {error ? <div className="mt-4 text-sm text-red-700 font-semibold">{error}</div> : null}

        {!loading && !error && meta.kind === "placeholder" ? <div className="mt-4 text-sm text-slate-600">Belum ada modul backend untuk halaman ini.</div> : null}

        {!loading && !error && meta.kind === "classes" && Array.isArray(data) ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                <tr>
                  <th className="p-3 font-bold text-slate-800">Kelas</th>
                  <th className="p-3 font-bold text-slate-800">Sekolah</th>
                  <th className="p-3 font-bold text-slate-800">Jurusan</th>
                  <th className="p-3 font-bold text-slate-800">Wali Kelas</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {data.map((c: any) => (
                  <tr key={c.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-3 text-slate-800 font-semibold">{c.name}</td>
                    <td className="p-3 text-slate-700">{c.school?.name ?? "-"}</td>
                    <td className="p-3 text-slate-700">{c.department?.name ?? "-"}</td>
                    <td className="p-3 text-slate-700">{c.homeroomTeacher?.name ?? "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && !error && meta.kind === "attendance" && data ? (
          <div className="mt-4 space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4">
              {[
                { label: "Hadir", value: `${data.summary?.hadirPercent ?? 0}%` },
                { label: "Izin", value: data.summary?.izin ?? 0 },
                { label: "Sakit", value: data.summary?.sakit ?? 0 },
                { label: "Alpha", value: data.summary?.alpha ?? 0 },
              ].map((c: any) => (
                <div key={c.label} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                  <div className="text-xs font-bold text-slate-500">{c.label}</div>
                  <div className="text-lg font-extrabold text-slate-800 mt-2">{c.value}</div>
                </div>
              ))}
            </div>
            {Array.isArray(data.rows) ? (
              <div className="overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                    <tr>
                      <th className="p-3 font-bold text-slate-800">Tanggal</th>
                      <th className="p-3 font-bold text-slate-800">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/40">
                    {data.rows.map((r: any) => (
                      <tr key={r.date} className="hover:bg-white/30 transition-colors">
                        <td className="p-3 text-slate-800 font-semibold">{r.date}</td>
                        <td className="p-3 text-slate-700">{r.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : null}
          </div>
        ) : null}

        {!loading && !error && meta.kind === "grades" && Array.isArray(data) ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                <tr>
                  <th className="p-3 font-bold text-slate-800">Lesson</th>
                  <th className="p-3 font-bold text-slate-800">Score</th>
                  <th className="p-3 font-bold text-slate-800">Status</th>
                  <th className="p-3 font-bold text-slate-800">Tanggal</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {data.map((g: any) => (
                  <tr key={g.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-3 text-slate-800 font-semibold">{g.lesson?.title ?? g.quizId}</td>
                    <td className="p-3 text-slate-700">{g.score}</td>
                    <td className="p-3 text-slate-700">{g.passed ? "Lulus" : "Belum lulus"}</td>
                    <td className="p-3 text-slate-700">{g.submittedAt ? new Date(g.submittedAt).toLocaleDateString("id-ID") : "-"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && !error && meta.kind === "finance" && data ? (
          <div className="mt-4 space-y-6">
            <div>
              <div className="text-sm font-bold text-slate-800">Tagihan</div>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                    <tr>
                      <th className="p-3 font-bold text-slate-800">Jenis</th>
                      <th className="p-3 font-bold text-slate-800">Periode</th>
                      <th className="p-3 font-bold text-slate-800">Nominal</th>
                      <th className="p-3 font-bold text-slate-800">Status</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/40">
                    {(data.bills ?? []).map((b: any) => (
                      <tr key={b.id} className="hover:bg-white/30 transition-colors">
                        <td className="p-3 text-slate-800 font-semibold">{b.type}</td>
                        <td className="p-3 text-slate-700">{b.period}</td>
                        <td className="p-3 text-slate-700">
                          {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(b.amount))}
                        </td>
                        <td className="p-3 text-slate-700">{b.status}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>

            <div>
              <div className="text-sm font-bold text-slate-800">Riwayat Pembayaran</div>
              <div className="mt-2 overflow-x-auto">
                <table className="w-full text-left text-sm">
                  <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                    <tr>
                      <th className="p-3 font-bold text-slate-800">Tanggal</th>
                      <th className="p-3 font-bold text-slate-800">Jenis</th>
                      <th className="p-3 font-bold text-slate-800">Nominal</th>
                      <th className="p-3 font-bold text-slate-800">Metode</th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-white/40">
                    {(data.payments ?? []).map((p: any) => (
                      <tr key={p.id} className="hover:bg-white/30 transition-colors">
                        <td className="p-3 text-slate-800 font-semibold">{p.date}</td>
                        <td className="p-3 text-slate-700">{p.type}</td>
                        <td className="p-3 text-slate-700">
                          {new Intl.NumberFormat("id-ID", { style: "currency", currency: "IDR", maximumFractionDigits: 0 }).format(Number(p.amount))}
                        </td>
                        <td className="p-3 text-slate-700">{p.method}</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </div>
          </div>
        ) : null}

        {!loading && !error && meta.kind === "documents" && data ? (
          <div className="mt-4 space-y-6">
            <div>
              <div className="text-sm font-bold text-slate-800">Dokumen</div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.documents ?? []).map((d: any) => (
                  <div key={d.id} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                    <div className="text-sm font-bold text-slate-800">{d.title}</div>
                    <div className="text-xs text-slate-600 mt-1">{d.category}</div>
                    <div className="text-xs text-slate-600 mt-1">Status: {d.status}</div>
                  </div>
                ))}
              </div>
            </div>
            <div>
              <div className="text-sm font-bold text-slate-800">Sertifikat</div>
              <div className="mt-2 grid grid-cols-1 md:grid-cols-2 gap-4">
                {(data.certificates ?? []).map((d: any) => (
                  <div key={d.id} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                    <div className="text-sm font-bold text-slate-800">{d.title}</div>
                    <div className="text-xs text-slate-600 mt-1">{d.category}</div>
                    <div className="text-xs text-slate-600 mt-1">Status: {d.status}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : null}

        {!loading && !error && meta.kind === "list" && data?.rows ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.rows.map((r: any) => (
              <div key={r.id} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                <div className="text-sm font-bold text-slate-800">{r.title ?? r.type ?? r.id}</div>
                {r.date ? <div className="text-xs text-slate-600 mt-1">{r.date}</div> : null}
                {r.note ? <div className="text-xs text-slate-600 mt-1">{r.note}</div> : null}
                {r.status ? <div className="text-xs text-slate-600 mt-1">Status: {r.status}</div> : null}
                {r.schedule ? <div className="text-xs text-slate-600 mt-1">{r.schedule}</div> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
