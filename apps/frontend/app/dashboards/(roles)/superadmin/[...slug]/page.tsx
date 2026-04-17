"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

function titleize(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SuperadminPlaceholderPage({ params }: { params: { slug: string[] } }) {
  const { token } = useAuth();
  const breadcrumb = useMemo(() => {
    const parts = params.slug ?? [];
    const acc: { href: string; label: string }[] = [];
    let current = "/dashboards/superadmin";
    for (const part of parts) {
      current += `/${part}`;
      acc.push({ href: current, label: titleize(part) });
    }
    return acc;
  }, [params.slug]);

  const slugPath = params.slug.join("/");
  const meta = useMemo(() => {
    const key = slugPath;
    switch (key) {
      case "beranda":
        return { title: "Dashboard Global", description: "Ringkasan seluruh sistem.", endpoint: "/superadmin/summary", kind: "json" as const };
      case "beranda/notifikasi":
        return { title: "Notifikasi Sistem", description: "Notifikasi penting lintas unit.", endpoint: "/superadmin/notifications", kind: "list" as const };
      case "beranda/kalender-akademik-global":
        return { title: "Kalender Akademik Global", description: "Agenda akademik global.", endpoint: "/superadmin/calendar", kind: "list" as const };

      case "akademik/kurikulum":
        return { title: "Master Kurikulum", description: "Kurikulum global.", endpoint: "/superadmin/akademik/kurikulum", kind: "list" as const };
      case "akademik/rombel":
        return { title: "Rombel Template", description: "Template struktur kelas global.", endpoint: "/superadmin/akademik/rombel-template", kind: "list" as const };
      case "akademik/kalender-template":
        return { title: "Kalender Template", description: "Template kalender akademik.", endpoint: "/superadmin/akademik/kalender-template", kind: "list" as const };
      case "akademik/jenjang":
        return { title: "Master Jenjang", description: "Jenjang pendidikan global.", endpoint: "/superadmin/akademik/jenjang", kind: "list" as const };
      case "akademik/fase-tingkat":
        return { title: "Master Fase/Tingkat", description: "Fase/tingkat belajar global.", endpoint: "/superadmin/akademik/fase-tingkat", kind: "list" as const };

      case "penilaian/pengaturan":
        return { title: "Sistem Penilaian", description: "Komponen penilaian global.", endpoint: "/superadmin/penilaian/pengaturan", kind: "json" as const };
      case "penilaian/template-rapor":
        return { title: "Template Rapor", description: "Template rapor global.", endpoint: "/superadmin/penilaian/template-rapor", kind: "list" as const };
      case "penilaian/predikat-nilai":
        return { title: "Predikat Nilai", description: "Rentang predikat nilai global.", endpoint: "/superadmin/penilaian/predikat-nilai", kind: "list" as const };
      case "penilaian/jenis-penilaian":
        return { title: "Jenis Penilaian", description: "Tipe penilaian global.", endpoint: "/superadmin/penilaian/jenis-penilaian", kind: "list" as const };
      case "penilaian/kkm":
        return { title: "KKM/Ketuntasan", description: "Aturan KKM global.", endpoint: "/superadmin/penilaian/kkm", kind: "list" as const };
      case "penilaian/aturan-kelulusan":
        return { title: "Aturan Kelulusan", description: "Aturan kelulusan global.", endpoint: "/superadmin/penilaian/aturan-kelulusan", kind: "json" as const };
      case "penilaian/bank-soal-global":
        return { title: "Bank Soal Global", description: "Ringkasan bank soal global.", endpoint: "/superadmin/penilaian/bank-soal-global", kind: "list" as const };

      case "siswa/master":
        return { title: "Data Siswa Global", description: "Monitoring siswa lintas sekolah.", endpoint: "/superadmin/siswa/master", kind: "users" as const };
      case "siswa/status":
        return { title: "Status Siswa", description: "Master status siswa.", endpoint: "/superadmin/siswa/status", kind: "list" as const };
      case "siswa/alumni":
        return { title: "Alumni", description: "Ringkasan alumni.", endpoint: "/superadmin/siswa/alumni", kind: "list" as const };
      case "siswa/mutasi":
        return { title: "Mutasi", description: "Ringkasan mutasi.", endpoint: "/superadmin/siswa/mutasi", kind: "list" as const };
      case "siswa/prestasi":
        return { title: "Prestasi", description: "Kategori prestasi siswa.", endpoint: "/superadmin/siswa/prestasi", kind: "list" as const };
      case "siswa/pelanggaran":
        return { title: "Pelanggaran", description: "Kategori pelanggaran siswa.", endpoint: "/superadmin/siswa/pelanggaran", kind: "list" as const };
      case "siswa/tata-tertib":
        return { title: "Tata Tertib", description: "Aturan tata tertib siswa.", endpoint: "/superadmin/siswa/tata-tertib", kind: "list" as const };

      case "administrasi/yayasan-unit":
        return { title: "Manajemen Yayasan & Unit", description: "Data yayasan dan unit.", endpoint: "/superadmin/administrasi/yayasan-unit", kind: "json" as const };
      case "administrasi/role-permission":
        return { title: "Role & Permission", description: "Daftar role dan permission.", endpoint: "/roles", kind: "json" as const };
      case "administrasi/permission":
        return { title: "Permission Management", description: "Daftar permission.", endpoint: "/roles/permissions", kind: "json" as const };
      case "administrasi/master-sdm":
        return { title: "Master SDM", description: "Ringkasan SDM global.", endpoint: "/superadmin/administrasi/master-sdm", kind: "json" as const };
      case "administrasi/approval-center":
        return { title: "Approval Center", description: "Persetujuan data penting.", endpoint: "/superadmin/administrasi/approval-center", kind: "list" as const };
      case "administrasi/subrole":
        return { title: "Subrole Management", description: "Daftar subrole khusus (placeholder).", endpoint: "/superadmin/administrasi/subrole", kind: "list" as const };
      case "administrasi/jabatan":
        return { title: "Master Jabatan", description: "Posisi organisasi (placeholder).", endpoint: "/superadmin/administrasi/jabatan", kind: "list" as const };
      case "administrasi/dokumen-template":
        return { title: "Master Dokumen (Template)", description: "Template dokumen resmi (placeholder).", endpoint: "/superadmin/administrasi/dokumen-template", kind: "list" as const };
      case "administrasi/audit-log":
        return { title: "Audit Log", description: "Aktivitas user di sistem.", endpoint: "/superadmin/administrasi/audit-log", kind: "audit" as const };

      case "keuangan/monitoring":
        return { title: "Monitoring Keuangan Seluruh Unit", description: "Ringkasan cashflow lintas unit (estimasi).", endpoint: "/superadmin/keuangan/monitoring", kind: "json" as const };
      case "keuangan/jenis-biaya":
        return { title: "Jenis Biaya", description: "Master jenis biaya global.", endpoint: "/superadmin/keuangan/jenis-biaya", kind: "list" as const };
      case "keuangan/struktur-biaya":
        return { title: "Struktur Biaya Global", description: "Struktur biaya global (placeholder).", endpoint: "/superadmin/keuangan/struktur-biaya", kind: "list" as const };
      case "keuangan/template-tagihan":
        return { title: "Template Tagihan", description: "Template tagihan global (placeholder).", endpoint: "/superadmin/keuangan/template-tagihan", kind: "list" as const };
      case "keuangan/payment-settings":
        return { title: "Payment Settings", description: "Metode pembayaran (placeholder).", endpoint: "/superadmin/keuangan/payment-settings", kind: "list" as const };
      case "keuangan/rekap-pemasukan":
        return { title: "Rekap Pemasukan Unit", description: "Ringkasan pemasukan per unit (estimasi).", endpoint: "/superadmin/keuangan/rekap-pemasukan", kind: "list" as const };
      case "keuangan/tunggakan":
        return { title: "Monitoring Tunggakan", description: "Monitoring tunggakan siswa (estimasi).", endpoint: "/superadmin/keuangan/tunggakan", kind: "list" as const };
      case "keuangan/diskon-beasiswa":
        return { title: "Diskon/Beasiswa", description: "Master diskon dan beasiswa (placeholder).", endpoint: "/superadmin/keuangan/diskon-beasiswa", kind: "list" as const };

      case "komunikasi/helpdesk":
        return { title: "Helpdesk / Support", description: "Tiket bantuan (placeholder).", endpoint: "/superadmin/komunikasi/helpdesk", kind: "list" as const };
      case "komunikasi/template-notifikasi":
        return { title: "Template Notifikasi", description: "Template notifikasi otomatis (placeholder).", endpoint: "/superadmin/komunikasi/template-notifikasi", kind: "list" as const };
      case "komunikasi/gateway":
        return { title: "Gateway Email/WhatsApp", description: "Pengaturan gateway (placeholder).", endpoint: "/superadmin/komunikasi/gateway", kind: "list" as const };

      case "laporan/user":
        return { title: "Laporan User", description: "Statistik pengguna lintas sekolah.", endpoint: "/superadmin/laporan/user", kind: "json" as const };
      case "laporan/aktivitas":
        return { title: "Laporan Aktivitas", description: "Aktivitas sistem dari audit log.", endpoint: "/superadmin/laporan/aktivitas", kind: "list" as const };
      case "laporan/analytics":
        return { title: "Analytics Multi-Sekolah", description: "Perbandingan unit (siswa & performa).", endpoint: "/superadmin/laporan/analytics", kind: "list" as const };
      case "laporan/akademik":
        return { title: "Laporan Akademik Global", description: "Rekap akademik lintas unit.", endpoint: "/superadmin/laporan/akademik", kind: "json" as const };
      case "laporan/penilaian":
        return { title: "Laporan Penilaian Global", description: "Statistik penilaian lintas unit (placeholder).", endpoint: "/superadmin/laporan/penilaian", kind: "json" as const };
      case "laporan/siswa":
        return { title: "Laporan Siswa", description: "Statistik siswa lintas unit (placeholder).", endpoint: "/superadmin/laporan/siswa", kind: "json" as const };
      case "laporan/guru-staff":
        return { title: "Laporan Guru & Staff", description: "Statistik SDM lintas unit.", endpoint: "/superadmin/laporan/guru-staff", kind: "json" as const };
      case "laporan/keuangan":
        return { title: "Laporan Keuangan", description: "Ringkasan keuangan lintas unit (estimasi).", endpoint: "/superadmin/laporan/keuangan", kind: "json" as const };
      case "laporan/executive":
        return { title: "Executive Analytics", description: "Ringkasan KPI eksekutif.", endpoint: "/superadmin/laporan/executive", kind: "json" as const };

      case "pengaturan/branding":
        return { title: "Branding", description: "Branding platform.", endpoint: "/superadmin/pengaturan/branding", kind: "json" as const };
      case "pengaturan/domain":
        return { title: "Domain/Subdomain", description: "Pengaturan domain multi-tenant.", endpoint: "/superadmin/pengaturan/domain", kind: "list" as const };
      case "pengaturan/integrasi":
        return { title: "Integrasi Sistem", description: "Integrasi pihak ketiga.", endpoint: "/superadmin/pengaturan/integrasi", kind: "list" as const };
      case "pengaturan/backup":
        return { title: "Backup", description: "Backup & restore.", endpoint: "/superadmin/pengaturan/backup", kind: "json" as const };
      case "pengaturan/keamanan":
        return { title: "Keamanan Sistem", description: "Kebijakan keamanan.", endpoint: "/superadmin/pengaturan/keamanan", kind: "json" as const };
      case "pengaturan/system-settings":
        return { title: "System Settings", description: "Parameter global sistem.", endpoint: "/superadmin/pengaturan/system-settings", kind: "json" as const };
      case "pengaturan/umum":
        return { title: "Pengaturan Umum", description: "Konfigurasi umum sistem.", endpoint: "/superadmin/pengaturan/umum", kind: "json" as const };
      case "pengaturan/konfigurasi-menu":
        return { title: "Konfigurasi Menu", description: "Kontrol menu per role (placeholder).", endpoint: "/superadmin/pengaturan/konfigurasi-menu", kind: "json" as const };
      case "pengaturan/feature-toggle":
        return { title: "Feature Toggle", description: "Aktif/nonaktif modul (placeholder).", endpoint: "/superadmin/pengaturan/feature-toggle", kind: "list" as const };
      case "pengaturan/api-webhook":
        return { title: "API & Webhook", description: "Integrasi teknis (placeholder).", endpoint: "/superadmin/pengaturan/api-webhook", kind: "list" as const };
      case "pengaturan/error-monitoring":
        return { title: "Error Monitoring", description: "Monitoring error (placeholder).", endpoint: "/superadmin/pengaturan/error-monitoring", kind: "list" as const };

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
        <div className="text-xs font-bold text-slate-500">/superadmin/{slugPath}</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">{meta.title}</h1>
        <div className="text-sm text-slate-600 mt-1">{meta.description}</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/dashboards/superadmin" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Dashboard Superadmin
          </Link>
          <Link href="/dashboards" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Pilih Dashboard
          </Link>
        </div>

        {loading ? <div className="mt-4 text-sm text-slate-600 font-medium">Memuat...</div> : null}
        {error ? <div className="mt-4 text-sm text-red-700 font-semibold">{error}</div> : null}

        {!loading && !error && meta.kind === "placeholder" ? (
          <div className="mt-4 text-sm text-slate-600">Belum ada modul backend untuk halaman ini.</div>
        ) : null}

        {!loading && !error && meta.kind === "json" && data ? (
          <pre className="mt-4 text-xs bg-white/50 border border-white/60 rounded-2xl p-4 overflow-auto">{JSON.stringify(data, null, 2)}</pre>
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

        {!loading && !error && meta.kind === "users" && data?.rows ? (
          <div className="mt-4 overflow-x-auto">
            <table className="w-full text-left text-sm">
              <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                <tr>
                  <th className="p-3 font-bold text-slate-800">Nama</th>
                  <th className="p-3 font-bold text-slate-800">Email</th>
                  <th className="p-3 font-bold text-slate-800">Sekolah</th>
                  <th className="p-3 font-bold text-slate-800">Aktif</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {data.rows.map((u: any) => (
                  <tr key={u.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-3 text-slate-800 font-semibold">{u.name}</td>
                    <td className="p-3 text-slate-700">{u.email}</td>
                    <td className="p-3 text-slate-700">{u.school?.name ?? "-"}</td>
                    <td className="p-3 text-slate-700">{u.isActive ? "Ya" : "Tidak"}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : null}

        {!loading && !error && meta.kind === "list" && data?.rows ? (
          <div className="mt-4 grid grid-cols-1 md:grid-cols-2 gap-4">
            {data.rows.map((r: any) => (
              <div key={r.id} className="bg-white/50 border border-white/60 rounded-2xl p-4">
                <div className="text-sm font-bold text-slate-800">{r.title ?? r.name ?? r.subject ?? r.action ?? r.id}</div>
                {r.date ? <div className="text-xs text-slate-600 mt-1">{r.date}</div> : null}
                {r.severity ? <div className="text-xs text-slate-600 mt-1">Severity: {r.severity}</div> : null}
                {r.status ? <div className="text-xs text-slate-600 mt-1">Status: {r.status}</div> : null}
                {typeof r.questionCount === "number" ? <div className="text-xs text-slate-600 mt-1">Jumlah Soal: {r.questionCount}</div> : null}
                {typeof r.count === "number" ? <div className="text-xs text-slate-600 mt-1">Jumlah: {r.count}</div> : null}
                {r.unit ? <div className="text-xs text-slate-600 mt-1">Unit: {r.unit}</div> : null}
                {r.detail ? <div className="text-xs text-slate-600 mt-1">{r.detail}</div> : null}
              </div>
            ))}
          </div>
        ) : null}
      </div>
    </main>
  );
}
