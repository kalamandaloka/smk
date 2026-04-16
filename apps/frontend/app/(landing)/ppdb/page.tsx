"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { CheckCircle, FileText, Users, Calendar } from "lucide-react";

export default function PPDB() {
  const steps = [
    { title: "Pendaftaran Online", desc: "Isi formulir pendaftaran melalui website resmi sekolah.", icon: <FileText size={24} /> },
    { title: "Verifikasi Berkas", desc: "Serahkan berkas persyaratan fisik ke panitia PPDB di sekolah.", icon: <CheckCircle size={24} /> },
    { title: "Tes Seleksi", desc: "Ikuti tes akademik dan wawancara sesuai jadwal.", icon: <Users size={24} /> },
    { title: "Pengumuman", desc: "Hasil seleksi akan diumumkan melalui website dan papan pengumuman.", icon: <Calendar size={24} /> }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="absolute top-[20%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16">
          <div className="inline-block bg-[#3A36DB]/10 text-[#3A36DB] px-4 py-1.5 rounded-full text-sm font-bold mb-4">
            Tahun Ajaran 2026/2027
          </div>
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Penerimaan Peserta Didik Baru</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Bergabunglah bersama kami dan wujudkan mimpimu. Kami membuka kesempatan bagi siswa-siswi berprestasi untuk menjadi bagian dari SMK MERAH PUTIH.</p>
        </div>

        <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-[2rem] shadow-xl mb-16">
          <h2 className="text-2xl font-bold mb-8 text-center text-[#3A36DB]">Alur Pendaftaran</h2>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 relative">
            <div className="hidden md:block absolute top-8 left-[10%] right-[10%] h-0.5 bg-[#3A36DB]/20 -z-10"></div>
            
            {steps.map((step, i) => (
              <div key={i} className="text-center">
                <div className="w-16 h-16 bg-[#3A36DB] text-white rounded-full flex items-center justify-center mx-auto mb-6 shadow-lg shadow-blue-900/20 relative z-10">
                  {step.icon}
                </div>
                <h3 className="font-bold text-lg mb-2 text-slate-800">{step.title}</h3>
                <p className="text-sm text-slate-600 leading-relaxed">{step.desc}</p>
              </div>
            ))}
          </div>
        </div>

        <div className="text-center">
          <button className="bg-[#3A36DB] text-white px-10 py-4 rounded-full font-bold text-lg hover:shadow-lg hover:shadow-blue-500/30 transition-all transform hover:-translate-y-1">
            Daftar Sekarang
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

