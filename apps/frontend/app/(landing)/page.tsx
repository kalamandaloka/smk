"use client";

import Link from "next/link";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Facebook, Twitter, Instagram, Youtube } from "../components/icons";
import { 
  Play, 
  ArrowRight, 
  Monitor, 
  Leaf, 
  UserCheck, 
  Briefcase, 
  ChevronDown, 
  ArrowUpRight,
  Code, 
  Wrench, 
  Zap, 
  Building, 
  Camera, 
  Car,
  Tent, 
  HeartPulse, 
  Mountain, 
  Film,
  Wifi,
  Hotel,
  PenTool,
  ArrowRightCircle
} from "lucide-react";

const PRIMARY_TEXT = "text-[#DC2626]";

export default function Home() {
  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-gradient-to-br from-rose-50 via-red-50 to-orange-50">
      {/* Glassmorphism Background Blobs */}
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-red-400/30 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-rose-400/30 blur-[120px] pointer-events-none"></div>
      <div className="absolute top-[40%] left-[60%] w-[30%] h-[30%] rounded-full bg-orange-400/20 blur-[100px] pointer-events-none"></div>

      {/* Navbar */}
      <Navbar />

      {/* Hero Section */}
      <section className="pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto flex flex-col-reverse md:flex-row items-center gap-12 relative z-10">
        <div className="flex-1 space-y-8">
          <h1 className="text-5xl md:text-[56px] font-extrabold text-slate-900 leading-[1.1] tracking-tight">
            SMK MERAH <br /> PUTIH
          </h1>
          <p className="text-slate-500 leading-relaxed max-w-md text-base">
            sekolah adalah tempat mencetak penerus bangsa yang berkarakter dan berprestasi di segala bidang yang dapat bersaing di kancah internasional.
          </p>
          <div className="flex flex-wrap items-center gap-4">
            <button className="bg-[#DC2626] text-white px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:shadow-lg hover:shadow-red-500/30 transition-all text-sm">
              Get Started <ArrowRight size={18} />
            </button>
            <button className="bg-white/40 backdrop-blur-md text-[#DC2626] border border-white/60 px-8 py-3.5 rounded-full font-semibold flex items-center gap-2 hover:bg-white/60 transition-all text-sm shadow-sm">
              Video <Play size={18} fill="currentColor" />
            </button>
          </div>
          <div className="pt-8 flex items-center gap-4 text-slate-900 font-bold text-sm">
            We are in Social Media : 
            <div className="flex gap-4 text-slate-800">
              <Facebook size={18} className="hover:text-[#DC2626] cursor-pointer transition-colors" />
              <Twitter size={18} className="hover:text-[#DC2626] cursor-pointer transition-colors" />
              <Instagram size={18} className="hover:text-[#DC2626] cursor-pointer transition-colors" />
              <Youtube size={18} className="hover:text-[#DC2626] cursor-pointer transition-colors" />
            </div>
          </div>
        </div>
        <div className="flex-1 relative">
          <div className="relative w-full aspect-[4/3] rounded-[2rem] overflow-hidden bg-white/40 backdrop-blur-sm border border-white/50 shadow-xl">
            <img src="/images/smkmerahputih.png" alt="SMK MERAH PUTIH" className="w-full h-full object-cover" />
          </div>
          {/* Floating badges simulation */}
          <div className="absolute top-6 right-[-2rem] bg-white/70 backdrop-blur-lg border border-white/50 p-3 rounded-2xl shadow-xl flex items-center gap-3 w-48">
             <div className="w-10 h-10 bg-slate-200/50 rounded-full overflow-hidden shrink-0"></div>
             <div className="w-full">
               <div className="h-2 w-full bg-slate-300/50 rounded mb-2"></div>
               <div className="h-2 w-2/3 bg-slate-200/50 rounded"></div>
             </div>
          </div>
          <div className="absolute bottom-6 left-[-3rem] bg-white/70 backdrop-blur-lg border border-white/50 p-4 rounded-2xl shadow-xl max-w-[220px]">
             <div className="text-[10px] text-slate-600 leading-relaxed font-medium">&quot;Siswa di sini sangat ramah, saya bangga bisa bersekolah di sini...&quot;</div>
          </div>
        </div>
      </section>

      {/* Keunggulan */}
      <section className="py-20 px-6 md:px-12 text-center max-w-7xl mx-auto relative z-10">
        <h2 className="text-[32px] font-bold mb-4">Kenapa Harus <span className={PRIMARY_TEXT}>SMK MERAH<br/>PUTIH?</span></h2>
        <p className="text-slate-500 mb-16 text-sm">Alasan kenapa harus memilih untuk bergabung dengan<br/>SMK MERAH PUTIH.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {[
            { icon: <Monitor className="w-8 h-8 text-[#DC2626]" strokeWidth={1.5} />, title: "Fasilitas Lengkap", desc: "Penunjang belajar dengan fasilitas terbaik" },
            { icon: <Leaf className="w-8 h-8 text-[#DC2626]" strokeWidth={1.5} />, title: "Lingkungan Nyaman", desc: "Berada di lingkungan yang nyaman dan asri" },
            { icon: <UserCheck className="w-8 h-8 text-[#DC2626]" strokeWidth={1.5} />, title: "Pengajar Kompeten", desc: "Guru terbaik dengan pengalaman" },
            { icon: <Briefcase className="w-8 h-8 text-[#DC2626]" strokeWidth={1.5} />, title: "Kerja Sama Luas", desc: "Membantu Anda untuk praktik industri" }
          ].map((item, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-lg p-8 rounded-[1.5rem] border border-white/50 shadow-[0_8px_30px_rgb(0,0,0,0.04)] hover:-translate-y-2 transition-all duration-300 flex flex-col items-center text-center group">
              <div className="w-16 h-16 bg-white/60 shadow-sm rounded-2xl flex items-center justify-center mb-6 group-hover:bg-white transition-colors border border-white/60">
                {item.icon}
              </div>
              <h3 className="font-bold text-lg mb-3 text-slate-800">{item.title}</h3>
              <p className="text-slate-600 text-sm leading-relaxed">{item.desc}</p>
            </div>
          ))}
        </div>
      </section>

      {/* Profil SMK */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10">
        <h2 className="text-[32px] font-bold text-center mb-16">Profil <span className={PRIMARY_TEXT}>SMK MERAH<br/>PUTIH</span></h2>
        <div className="flex flex-col md:flex-row gap-12 items-center">
          <div className="flex-1 w-full">
            <div className="w-full aspect-[16/9] bg-white/40 backdrop-blur-sm border border-white/50 shadow-xl rounded-[2rem] overflow-hidden">
              <img src="/images/otomotifmerahputih.png" alt="Profil SMK MERAH PUTIH" className="w-full h-full object-cover" />
            </div>
          </div>
          <div className="flex-1 space-y-6">
            <h3 className="text-2xl font-bold leading-snug">Sambutan Kepala Sekolah SMK MERAH PUTIH</h3>
            <p className="text-slate-600 leading-relaxed text-sm">
              sekolah adalah tempat mencetak penerus bangsa yang berkarakter dan berprestasi di segala bidang yang dapat bersaing di kancah internasional.
            </p>
            <p className="text-slate-600 leading-relaxed text-sm">
              SMK MERAH PUTIH adalah tempat dimana anak-anak muda berkumpul dan belajar untuk menyongsong pembangunan bangsa di masa depan.
            </p>
            <button className="bg-[#DC2626] text-white px-8 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity mt-4 text-sm shadow-lg shadow-red-500/30">
              Baca Sambutan <ArrowRight size={16} className="inline ml-2" />
            </button>
          </div>
        </div>
      </section>

      {/* Jurusan */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-[32px] font-bold mb-4">Jurusan Di <span className={PRIMARY_TEXT}>SMK MERAH<br/>PUTIH</span></h2>
        <p className="text-slate-500 mb-16 text-sm">Pilihan program keahlian di SMK MERAH PUTIH.</p>
        
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
          {[
            { icon: Code, title: "Teknik Komputer\nDan Jaringan" },
            { icon: Monitor, title: "Perhotelan" },
            { icon: Monitor, title: "Rekayasa\nperangkat lunak" },
            { icon: Building, title: "Arsitektur" },
            { icon: Wrench, title: "Teknik\nElektronika Industri" },
            { icon: Camera, title: "Teknik\nAudio Video" },
            { icon: Zap, title: "Teknik Instalasi\nTenaga Listrik" },
            { icon: Car, title: "Kendaraan Ringan\nOtomotif" },
            { icon: Building, title: "Pemodelan dan\nInformasi Bangunan" },
            { icon: Briefcase, title: "Teknik Pengelasan" }
          ].map((item, i) => (
            <div key={i} className="bg-[#DC2626]/80 backdrop-blur-xl border border-white/20 p-6 rounded-[1.5rem] text-white flex flex-col items-start text-left hover:-translate-y-1 transition-transform cursor-pointer shadow-lg shadow-red-900/10">
              <div className="w-10 h-10 bg-white/20 rounded-xl flex items-center justify-center mb-12 border border-white/20">
                <item.icon size={20} />
              </div>
              <h3 className="font-bold text-[15px] whitespace-pre-line leading-snug">{item.title}</h3>
              <div className="mt-4 text-[10px] text-white/80 flex items-center gap-1 font-medium">
                Lihat Detail <ArrowRight size={12} />
              </div>
            </div>
          ))}
        </div>
      </section>

      {/* Ekstrakulikuler */}
      <section className="py-20 px-6 md:px-12 text-center relative z-10">
        <div className="max-w-7xl mx-auto">
          <h2 className="text-[32px] font-bold mb-4">Ekstrakulikuler Di <span className={PRIMARY_TEXT}>SMK MERAH<br/>PUTIH</span></h2>
          <p className="text-slate-500 mb-16 text-sm">Pilihan ekstrakulikuler di SMK MERAH PUTIH.</p>
          
          <div className="grid grid-cols-1 md:grid-cols-4 gap-6 text-left">
            {[
              { icon: Tent, title: "Praja Muda\nKarana", desc: "Pramuka adlaah ekstrakulikuler wajib di SMK" },
              { icon: HeartPulse, title: "Palang Merah\nRemaja", desc: "PMR adalah ekstrakulikuler wajib di SMK" },
              { icon: Mountain, title: "Pecinta Alam", desc: "Pecinta alam adlaah ekstrakulikuler wajib di SMK" },
              { icon: Film, title: "Cinematografi", desc: "Cinematografi adlaah ekstrakulikuler wajib di SMK" }
            ].map((item, i) => (
              <div key={i} className="bg-white/40 backdrop-blur-lg p-6 rounded-[1.5rem] shadow-[0_2px_20px_rgb(0,0,0,0.04)] border border-white/50 hover:-translate-y-1 transition-transform cursor-pointer">
                <div className="w-12 h-12 bg-red-50/80 border border-red-100 text-red-500 rounded-full flex items-center justify-center mb-6">
                  <item.icon size={24} />
                </div>
                <h3 className="font-bold text-[17px] mb-3 whitespace-pre-line leading-snug">{item.title}</h3>
                <p className="text-slate-600 text-[13px] leading-relaxed mb-6">{item.desc}</p>
                <div className="text-[11px] text-slate-500 font-medium flex items-center gap-1">
                  Lihat Detail <ArrowRight size={12} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Berita */}
      <section className="py-20 px-6 md:px-12 max-w-7xl mx-auto text-center relative z-10">
        <h2 className="text-[32px] font-bold mb-4">Berita Terbaru Di <span className={PRIMARY_TEXT}>SMK MERAH<br/>PUTIH</span></h2>
        <p className="text-slate-500 mb-16 text-sm">Berita terbaru tentang SMK MERAH PUTIH.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 text-left mb-12">
          {[1, 2, 3, 4, 5, 6, 7, 8].map((i) => (
            <div key={i} className="bg-white/40 backdrop-blur-lg rounded-[1.5rem] overflow-hidden border border-white/50 shadow-[0_2px_10px_rgb(0,0,0,0.02)] group hover:shadow-md transition-all cursor-pointer p-4">
              <div className="aspect-[4/3] overflow-hidden rounded-xl bg-white/60 mb-4 border border-white/60">
                <img src="https://placehold.co/400x300?text=Default+Image" alt="Berita" className="w-full h-full object-cover" />
              </div>
              <div>
                <div className="text-[10px] text-slate-500 mb-2 font-medium">12 Agustus 2026</div>
                <h3 className="font-bold text-sm leading-snug mb-4 group-hover:text-[#DC2626] transition-colors line-clamp-2 text-slate-800">
                  Pendaftaran SMK MERAH PUTIH telah dibuka!
                </h3>
                <div className="flex items-center text-[#DC2626] text-xs font-semibold">
                  Baca Selengkapnya <ArrowUpRight size={14} className="ml-1" />
                </div>
              </div>
            </div>
          ))}
        </div>
        <button className="bg-[#DC2626] text-white px-10 py-3 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm shadow-lg shadow-red-500/30">
          Semua Berita
        </button>
      </section>

      {/* Gallery */}
      <section className="py-20 px-6 md:px-12 text-center text-white relative z-10">
        {/* Using a background div to contain the primary color with glass effect */}
        <div className="absolute inset-0 bg-[#DC2626]/90 backdrop-blur-xl -z-10"></div>
        <div className="max-w-7xl mx-auto relative z-10">
          <h2 className="text-[32px] font-bold mb-16">Foto Documentasi Kegiatan<br/>SMK MERAH PUTIH</h2>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {[
              { title: "Unjuk Karya Salah Satu Siswa", desc: "SMK MERAH PUTIH" },
              { title: "Reuni Akbar Angkatan 23", desc: "Aula SMK MERAH PUTIH" },
              { title: "Perpustakaan Baru", desc: "Perpustakaan SMK MERAH PUTIH" }
            ].map((item, i) => (
              <div key={i} className="relative aspect-square md:aspect-[4/5] rounded-[2rem] overflow-hidden group bg-white/20 backdrop-blur-md border border-white/20">
                <img src="https://placehold.co/400x500?text=Default+Image" alt={item.title} className="w-full h-full object-cover" />
                <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/10 to-transparent flex flex-col justify-end p-8 text-left">
                  <h3 className="font-bold text-lg mb-1">{item.title}</h3>
                  <p className="text-sm text-white/80">{item.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Alumni */}
      <section className="py-20 px-6 md:px-12 max-w-5xl mx-auto text-center relative z-10">
        <h2 className="text-[32px] font-bold mb-4">Profil Alumni <span className={PRIMARY_TEXT}>SMK MERAH<br/>PUTIH</span></h2>
        <p className="text-slate-500 mb-16 text-sm">Profil alumni SMK MERAH PUTIH.</p>
        
        <div className="grid grid-cols-1 md:grid-cols-2 gap-12 text-left">
          {/* Alumni 1 */}
          <div className="flex gap-6 items-start bg-white/40 backdrop-blur-lg p-6 rounded-[1.5rem] border border-white/50 shadow-sm">
            <div className="w-20 h-20 rounded-full shrink-0 border border-white/60 overflow-hidden">
              <img src="https://placehold.co/150x150?text=User" alt="Alumni 1" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Wiliyam Arilsom ST</h3>
              <div className="text-[11px] text-slate-500 mb-3 font-medium">Angkatan 2019</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Sekolah adalah tempat dimana kita berkumpul dan belajar untuk menyongsong masa depan yang cerah. Saya bangga menjadi alumni di sekolah ini.
              </p>
              <a href="#" className="text-[#DC2626] text-[13px] font-semibold hover:underline">Baca Selengkapnya</a>
            </div>
          </div>
          {/* Alumni 2 */}
          <div className="flex gap-6 items-start bg-white/40 backdrop-blur-lg p-6 rounded-[1.5rem] border border-white/50 shadow-sm">
            <div className="w-20 h-20 rounded-full shrink-0 border border-white/60 overflow-hidden">
              <img src="https://placehold.co/150x150?text=User" alt="Alumni 2" className="w-full h-full object-cover" />
            </div>
            <div>
              <h3 className="font-bold text-lg mb-1">Windi alexiria ayu</h3>
              <div className="text-[11px] text-slate-500 mb-3 font-medium">Angkatan 2021</div>
              <p className="text-slate-600 text-sm leading-relaxed mb-4">
                Di sini saya dibentuk menjadi insan yang siap kerja dengan keahlian yang sangat dibutuhkan oleh industri.
              </p>
              <a href="#" className="text-[#DC2626] text-[13px] font-semibold hover:underline">Baca Selengkapnya</a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <Footer />
    </div>
  );
}

