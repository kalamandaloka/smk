"use client";

import Link from "next/link";
import { useMemo } from "react";

function getSubroleMeta(subrole: string) {
  switch (subrole) {
    case "umum":
      return { title: "Guru - Umum", links: [{ href: "/dashboards/guru", label: "Dashboard Guru" }] };
    case "matapelajaran":
      return { title: "Guru - Mata Pelajaran", links: [{ href: "/dashboards/courses", label: "Mata Pelajaran" }, { href: "/dashboards/lessons", label: "Lesson" }, { href: "/dashboards/quizzes", label: "Quiz" }] };
    case "walikelas":
      return { title: "Guru - Wali Kelas", links: [{ href: "/dashboards/classes", label: "Kelas" }, { href: "/dashboards/reports", label: "Laporan" }] };
    case "kurikulum":
      return { title: "Guru - Kurikulum", links: [{ href: "/dashboards/programs", label: "Program" }, { href: "/dashboards/departments", label: "Jurusan" }, { href: "/dashboards/courses", label: "Mata Pelajaran" }] };
    case "kesiswaan":
      return { title: "Guru - Kesiswaan", links: [{ href: "/dashboards/reports", label: "Laporan" }, { href: "/dashboards/progress", label: "Progress" }] };
    default:
      return { title: "Guru", links: [{ href: "/dashboards/guru", label: "Kembali" }] };
  }
}

export default function GuruSubroleDashboardPage({ params }: { params: { subrole: string } }) {
  const meta = useMemo(() => getSubroleMeta(params.subrole), [params.subrole]);

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-xs font-bold text-slate-500">/guru/{params.subrole}</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">{meta.title}</h1>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
        {meta.links.map((s) => (
          <Link key={s.href} href={s.href} className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] hover:bg-white/60 transition-all">
            <div className="text-lg font-bold text-slate-800">{s.label}</div>
            <div className="text-sm text-slate-600 mt-1">{s.href}</div>
          </Link>
        ))}
      </div>
    </main>
  );
}
