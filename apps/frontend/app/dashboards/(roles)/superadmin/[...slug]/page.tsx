"use client";

import { useMemo } from "react";
import Link from "next/link";

function titleize(segment: string) {
  return segment.replace(/-/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

export default function SuperadminPlaceholderPage({ params }: { params: { slug: string[] } }) {
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

  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-xs font-bold text-slate-500">Superadmin</div>
        <h1 className="text-2xl font-bold text-slate-800 mt-1">{breadcrumb.length ? breadcrumb[breadcrumb.length - 1].label : "Menu"}</h1>
        <div className="text-sm text-slate-600 mt-1">Halaman placeholder. Nanti kita isi sesuai modulnya.</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-sm text-slate-700 font-semibold">Path</div>
        <div className="text-sm text-slate-600 mt-1">/dashboards/superadmin/{params.slug.join("/")}</div>

        <div className="mt-6 flex flex-wrap gap-2">
          <Link href="/dashboards/superadmin" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Dashboard Superadmin
          </Link>
          <Link href="/dashboards" className="px-3 py-2 rounded-xl bg-white/60 border border-white/70 text-sm font-semibold text-slate-800 hover:bg-white/80 transition-colors">
            Pilih Dashboard
          </Link>
        </div>
      </div>
    </main>
  );
}
