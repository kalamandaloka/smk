"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";
import { MapPin, Phone, Mail, Clock } from "lucide-react";

export default function Contact() {
  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Hubungi Kami</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Punya pertanyaan atau ingin mengetahui lebih lanjut tentang SMK MERAH PUTIH? Jangan ragu untuk menghubungi kami.</p>
        </div>

        <div className="flex flex-col lg:flex-row gap-12">
          <div className="flex-1 space-y-8">
            <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-sm">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Informasi Kontak</h2>
              
              <div className="space-y-6">
                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#3A36DB]/10 text-[#3A36DB] rounded-xl flex items-center justify-center shrink-0">
                    <MapPin size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">Alamat</h3>
                    <p className="text-slate-600 text-sm leading-relaxed">Jl. Pendidikan No. 123, Kec. Rappocini, Kota Makassar, Sulawesi Selatan 90222</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#3A36DB]/10 text-[#3A36DB] rounded-xl flex items-center justify-center shrink-0">
                    <Phone size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">Telepon</h3>
                    <p className="text-slate-600 text-sm">(0411) 123456</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#3A36DB]/10 text-[#3A36DB] rounded-xl flex items-center justify-center shrink-0">
                    <Mail size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">Email</h3>
                    <p className="text-slate-600 text-sm">info@smknmakassar.sch.id</p>
                  </div>
                </div>

                <div className="flex items-start gap-4">
                  <div className="w-12 h-12 bg-[#3A36DB]/10 text-[#3A36DB] rounded-xl flex items-center justify-center shrink-0">
                    <Clock size={24} />
                  </div>
                  <div>
                    <h3 className="font-bold text-slate-800 mb-1">Jam Operasional</h3>
                    <p className="text-slate-600 text-sm">Senin - Jumat: 07:00 - 15:30 WITA</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <div className="flex-1">
            <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 rounded-[2rem] shadow-xl">
              <h2 className="text-2xl font-bold mb-6 text-slate-800">Kirim Pesan</h2>
              <form className="space-y-4">
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Nama Lengkap</label>
                  <input type="text" className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A36DB]/50 transition-all" placeholder="Masukkan nama Anda" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Email</label>
                  <input type="email" className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A36DB]/50 transition-all" placeholder="Masukkan email Anda" />
                </div>
                <div>
                  <label className="block text-sm font-medium text-slate-700 mb-1">Pesan</label>
                  <textarea rows={4} className="w-full bg-white/60 border border-white/80 rounded-xl px-4 py-3 focus:outline-none focus:ring-2 focus:ring-[#3A36DB]/50 transition-all resize-none" placeholder="Tulis pesan Anda di sini..."></textarea>
                </div>
                <button type="button" className="w-full bg-[#3A36DB] text-white py-3 rounded-xl font-bold hover:bg-blue-700 transition-colors shadow-lg shadow-blue-500/30">
                  Kirim Pesan
                </button>
              </form>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

