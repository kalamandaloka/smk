"use client";

export default function AnnouncementsPage() {
  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <h1 className="text-2xl font-bold text-slate-800">Pengumuman</h1>
        <div className="text-sm text-slate-600 mt-1">Informasi resmi dari sekolah.</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-slate-700 font-semibold">Belum ada pengumuman</div>
        <div className="text-sm text-slate-600 mt-1">Nanti pengumuman akan tampil di sini setelah dipublikasikan.</div>
      </div>
    </main>
  );
}

