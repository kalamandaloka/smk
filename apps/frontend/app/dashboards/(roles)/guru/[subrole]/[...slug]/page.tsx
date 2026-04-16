"use client";

import Link from "next/link";

function titleize(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function GuruSubrolePlaceholderPage({ params }: { params: { subrole: string; slug: string[] } }) {
  const last = params.slug.length ? titleize(params.slug[params.slug.length - 1]) : "Menu";

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-xs font-bold text-slate-500">Guru / {titleize(params.subrole)}</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">{last}</h1>
        <div className="text-sm text-slate-600 mt-1">Halaman placeholder untuk fitur role guru.</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-sm text-slate-700 font-semibold">Path</div>
        <div className="text-sm text-slate-600 mt-1">/dashboards/guru/{params.subrole}/{params.slug.join("/")}</div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link href={`/dashboards/guru/${params.subrole}`} className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Kembali ke Dashboard Subrole
          </Link>
          <Link href="/dashboards/guru" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Dashboard Guru
          </Link>
        </div>
      </div>
    </main>
  );
}
