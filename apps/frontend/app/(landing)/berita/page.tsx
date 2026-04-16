"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { ArrowUpRight, Calendar, User } from "lucide-react";

export default function Berita() {
  const news = [
    { title: "Pendaftaran SMK MERAH PUTIH Telah Dibuka!", date: "12 Agustus 2026", author: "Admin", category: "PPDB", image: "https://placehold.co/600x400?text=Berita+1" },
    { title: "Siswa TKJ Meraih Juara 1 LKS Tingkat Provinsi", date: "10 Agustus 2026", author: "Humas", category: "Prestasi", image: "https://placehold.co/600x400?text=Berita+2" },
    { title: "Kunjungan Industri ke PT. Telkom Indonesia", date: "05 Agustus 2026", author: "Kaprog TKJ", category: "Kegiatan", image: "https://placehold.co/600x400?text=Berita+3" },
    { title: "Pelatihan Kewirausahaan untuk Siswa Kelas XII", date: "01 Agustus 2026", author: "BKK", category: "Pelatihan", image: "https://placehold.co/600x400?text=Berita+4" },
    { title: "Peresmian Laboratorium Komputer Baru", date: "28 Juli 2026", author: "Admin", category: "Fasilitas", image: "https://placehold.co/600x400?text=Berita+5" },
    { title: "Sosialisasi Keselamatan Kerja di Bengkel", date: "25 Juli 2026", author: "Humas", category: "Kegiatan", image: "https://placehold.co/600x400?text=Berita+6" }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="absolute top-[30%] right-[10%] w-[30%] h-[30%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Berita & Informasi</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Dapatkan informasi terbaru seputar kegiatan, prestasi, dan pengumuman penting dari SMK MERAH PUTIH.</p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {news.map((item, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-xl border border-white/50 rounded-[2rem] overflow-hidden group cursor-pointer hover:shadow-lg transition-all">
              <div className="aspect-[4/3] w-full overflow-hidden relative">
                <img src={item.image} alt={item.title} className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500" />
                <div className="absolute top-4 left-4 bg-[#3A36DB] text-white text-xs font-bold px-3 py-1 rounded-full">
                  {item.category}
                </div>
              </div>
              <div className="p-6">
                <div className="flex items-center gap-4 text-xs text-slate-500 mb-3 font-medium">
                  <div className="flex items-center gap-1"><Calendar size={14} /> {item.date}</div>
                  <div className="flex items-center gap-1"><User size={14} /> {item.author}</div>
                </div>
                <h3 className="font-bold text-lg mb-4 text-slate-800 leading-snug group-hover:text-[#3A36DB] transition-colors">
                  {item.title}
                </h3>
                <div className="flex items-center text-[#3A36DB] text-sm font-semibold">
                  Baca Selengkapnya <ArrowUpRight size={16} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-12 flex justify-center">
          <button className="bg-[#3A36DB] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm shadow-lg shadow-blue-500/30">
            Muat Lebih Banyak
          </button>
        </div>
      </main>

      <Footer />
    </div>
  );
}

