"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { Code, Monitor, Building, Wrench, Camera, Zap, Car, Briefcase } from "lucide-react";

export default function Program() {
  const programs = [
    { icon: Code, title: "Teknik Komputer Dan Jaringan", desc: "Mempelajari tentang perakitan komputer, instalasi jaringan, administrasi server, dan keamanan jaringan." },
    { icon: Monitor, title: "Rekayasa Perangkat Lunak", desc: "Fokus pada pembuatan aplikasi desktop, web, dan mobile, serta pemahaman tentang database dan algoritma." },
    { icon: Building, title: "Arsitektur", desc: "Mempelajari desain bangunan, perencanaan struktur, dan penggunaan perangkat lunak desain seperti AutoCAD." },
    { icon: Wrench, title: "Teknik Elektronika Industri", desc: "Mempelajari sistem kontrol industri, robotika, dan mikrokontroler." },
    { icon: Camera, title: "Teknik Audio Video", desc: "Fokus pada pengolahan sinyal audio dan video, serta perbaikan peralatan elektronika terkait." },
    { icon: Zap, title: "Teknik Instalasi Tenaga Listrik", desc: "Mempelajari perencanaan dan instalasi sistem kelistrikan pada bangunan komersial maupun industri." },
    { icon: Car, title: "Kendaraan Ringan Otomotif", desc: "Fokus pada perawatan dan perbaikan mesin kendaraan roda empat atau lebih." },
    { icon: Briefcase, title: "Teknik Pengelasan", desc: "Mempelajari berbagai teknik pengelasan industri sesuai standar internasional." }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/30 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/30 blur-[120px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Program Keahlian</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Kami menawarkan berbagai program keahlian yang disesuaikan dengan kebutuhan industri masa kini, membekali siswa dengan keterampilan praktis yang siap kerja.</p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {programs.map((item, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] hover:-translate-y-2 transition-transform shadow-lg shadow-blue-900/5">
              <div className="w-14 h-14 bg-[#3A36DB] rounded-2xl flex items-center justify-center mb-6 text-white shadow-md">
                <item.icon size={28} />
              </div>
              <h3 className="font-bold text-xl mb-3 text-slate-800">{item.title}</h3>
              <p className="text-slate-600 leading-relaxed text-sm">
                {item.desc}
              </p>
              <button className="mt-6 text-[#3A36DB] font-semibold text-sm hover:underline">
                Pelajari Lebih Lanjut &rarr;
              </button>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

