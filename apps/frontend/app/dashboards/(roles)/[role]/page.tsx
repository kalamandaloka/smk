"use client";

import Link from "next/link";
import { useMemo } from "react";

function getRoleMeta(role: string) {
  switch (role) {
    case "superadmin":
      return { title: "Dashboard Superadmin", description: "Akses penuh platform." };
    case "admin":
      return { title: "Dashboard Admin", description: "Kelola data akademik dan operasional." };
    case "ketuayayasan":
      return { title: "Dashboard Ketua Yayasan", description: "Ringkasan dan monitoring yayasan." };
    case "kepalasekolah":
      return { title: "Dashboard Kepala Sekolah", description: "Ringkasan sekolah dan monitoring akademik." };
    case "siswa":
      return { title: "Dashboard Siswa", description: "Aktivitas belajar dan progress." };
    case "bk":
      return { title: "Dashboard BK", description: "Bimbingan konseling dan monitoring siswa." };
    case "keuangan":
      return { title: "Dashboard Keuangan", description: "Keuangan sekolah dan laporan." };
    default:
      return { title: "Dashboard", description: "Role tidak dikenal." };
  }
}

export default function RoleDashboardPage({ params }: { params: { role: string } }) {
  const meta = useMemo(() => getRoleMeta(params.role), [params.role]);

  const shortcuts = useMemo(() => {
    switch (params.role) {
      case "superadmin":
        return [
          { href: "/dashboards/superadmin", label: "Dashboard Superadmin" },
          { href: "/dashboards/users", label: "Pengguna" },
          { href: "/dashboards/schools", label: "Sekolah" },
          { href: "/dashboards/reports", label: "Laporan" },
        ];
      case "admin":
        return [
          { href: "/dashboards/academic-years", label: "Tahun Ajaran" },
          { href: "/dashboards/semesters", label: "Semester" },
          { href: "/dashboards/programs", label: "Program" },
          { href: "/dashboards/departments", label: "Jurusan" },
          { href: "/dashboards/classes", label: "Kelas" },
        ];
      case "kepalasekolah":
      case "ketuayayasan":
        return [
          { href: "/dashboards/reports", label: "Laporan" },
          { href: "/dashboards/schools", label: "Sekolah" },
        ];
      case "siswa":
        return [
          { href: "/dashboards/courses", label: "Mata Pelajaran" },
          { href: "/dashboards/course-modules", label: "Modul Course" },
          { href: "/dashboards/lessons", label: "Lesson" },
          { href: "/dashboards/progress", label: "Progress" },
        ];
      case "bk":
        return [{ href: "/dashboards/reports", label: "Laporan" }];
      case "keuangan":
        return [{ href: "/dashboards/reports", label: "Laporan" }];
      default:
        return [{ href: "/dashboards", label: "Kembali" }];
    }
  }, [params.role]);

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-xs font-bold text-slate-500">/{params.role}</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">{meta.title}</h1>
        <p className="text-slate-600 mt-1 text-sm">{meta.description}</p>
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
