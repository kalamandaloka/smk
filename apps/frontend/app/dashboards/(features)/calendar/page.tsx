"use client";

export default function AcademicCalendarPage() {
  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <h1 className="text-2xl font-bold text-slate-800">Kalender Akademik</h1>
        <div className="text-sm text-slate-600 mt-1">Jadwal kegiatan akademik (libur, ujian, agenda).</div>
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-slate-700 font-semibold">Belum ada agenda</div>
        <div className="text-sm text-slate-600 mt-1">Nanti bisa diisi dari Admin: kalender, libur nasional, jadwal ujian, dll.</div>
      </div>
    </main>
  );
}

