"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Users, Award, BookOpen } from "lucide-react";

export default function Siswa() {
  const stats = [
    { icon: Users, label: "Total Siswa Aktif", value: "1,245" },
    { icon: Award, label: "Prestasi Akademik", value: "85+" },
    { icon: BookOpen, label: "Lulusan Terserap Industri", value: "92%" }
  ];

  const activities = [
    { title: "Praktik Kerja Lapangan (PKL)", image: "https://placehold.co/600x400?text=PKL", desc: "Program wajib bagi siswa kelas XI untuk terjun langsung ke industri selama 3-6 bulan." },
    { title: "Uji Kompetensi Keahlian (UKK)", image: "https://placehold.co/600x400?text=UKK", desc: "Ujian akhir untuk mengukur pencapaian kompetensi siswa yang diuji langsung oleh asesor eksternal." },
    { title: "Pameran Karya Inovasi", image: "https://placehold.co/600x400?text=Inovasi", desc: "Ajang tahunan bagi siswa untuk memamerkan hasil karya proyek akhir mereka." }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="absolute top-[20%] left-[20%] w-[30%] h-[30%] rounded-full bg-purple-400/20 blur-[120px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Kesiswaan</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Membangun karakter unggul, kreatif, dan inovatif melalui berbagai kegiatan akademik maupun non-akademik di SMK MERAH PUTIH.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {stats.map((stat, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] flex items-center gap-6 shadow-sm">
              <div className="w-16 h-16 bg-[#3A36DB]/10 text-[#3A36DB] rounded-2xl flex items-center justify-center shrink-0">
                <stat.icon size={32} />
              </div>
              <div>
                <div className="text-3xl font-extrabold text-slate-900 mb-1">{stat.value}</div>
                <div className="text-sm text-slate-500 font-medium">{stat.label}</div>
              </div>
            </div>
          ))}
        </div>

        <h2 className="text-3xl font-bold text-center mb-10 text-slate-900">Kegiatan Unggulan Siswa</h2>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {activities.map((act, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2rem] overflow-hidden group">
              <div className="aspect-[4/3] w-full overflow-hidden">
                <img src={act.image} alt={act.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
              </div>
              <div className="p-6">
                <h3 className="font-bold text-xl mb-3 text-slate-800">{act.title}</h3>
                <p className="text-slate-600 text-sm leading-relaxed">{act.desc}</p>
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

