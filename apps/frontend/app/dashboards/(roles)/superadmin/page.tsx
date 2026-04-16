"use client";

export default function SuperadminDashboardPage() {
  return (
    <main className="space-y-6">
      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-8 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <h1 className="text-2xl font-bold text-slate-800">Dashboard Superadmin</h1>
        <div className="text-sm text-slate-600 mt-1">Ringkasan seluruh sekolah/unit dan status sistem.</div>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6">
        {[
          { label: "Total Unit Sekolah", value: "-" },
          { label: "User Aktif", value: "-" },
          { label: "Pembelajaran Aktif", value: "-" },
          { label: "Keuangan Ringkas", value: "-" },
        ].map((item) => (
          <div key={item.label} className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
            <div className="text-xs font-bold text-slate-500">{item.label}</div>
            <div className="text-2xl font-extrabold text-slate-800 mt-2">{item.value}</div>
          </div>
        ))}
      </div>

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)]">
        <div className="text-slate-800 font-bold">Server Status</div>
        <div className="text-sm text-slate-600 mt-1">Nanti bisa tampilkan health check backend, storage, dan job queue.</div>
      </div>
    </main>
  );
}

