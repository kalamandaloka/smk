"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function TentangKami() {
  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="absolute top-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/30 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-purple-400/30 blur-[120px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
        <h1 className="text-4xl md:text-5xl font-bold text-center mb-12 text-slate-900">Tentang Kami</h1>
        
        <div className="bg-white/40 backdrop-blur-xl border border-white/50 p-8 md:p-12 rounded-[2rem] shadow-xl">
          <div className="aspect-video w-full rounded-2xl overflow-hidden mb-8 border border-white/60">
            <img src="https://placehold.co/1200x600?text=Gedung+Sekolah" alt="Gedung Sekolah" className="w-full h-full object-cover" />
          </div>
          
          <h2 className="text-2xl font-bold mb-4 text-[#3A36DB]">Sejarah Singkat</h2>
          <p className="text-slate-600 leading-relaxed mb-8">
            SMK MERAH PUTIH didirikan pada tahun 1980 dengan tujuan untuk mencetak generasi penerus bangsa yang memiliki keterampilan dan siap terjun ke dunia industri. Seiring berjalannya waktu, sekolah kami terus berkembang dan menambah berbagai program keahlian yang relevan dengan kebutuhan pasar kerja saat ini.
          </p>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mb-8">
            <div className="bg-white/50 p-6 rounded-2xl border border-white/60">
              <h3 className="text-xl font-bold mb-3 text-[#3A36DB]">Visi</h3>
              <p className="text-slate-600 leading-relaxed">
                Menjadi lembaga pendidikan kejuruan yang unggul, menghasilkan lulusan yang berkarakter, kompeten, dan berdaya saing global pada tahun 2030.
              </p>
            </div>
            <div className="bg-white/50 p-6 rounded-2xl border border-white/60">
              <h3 className="text-xl font-bold mb-3 text-[#3A36DB]">Misi</h3>
              <ul className="list-disc list-inside text-slate-600 leading-relaxed space-y-2">
                <li>Menyelenggarakan pembelajaran berbasis kompetensi dan nilai-nilai karakter.</li>
                <li>Meningkatkan kualitas pendidik dan tenaga kependidikan.</li>
                <li>Menjalin kemitraan yang kuat dengan dunia usaha dan dunia industri.</li>
                <li>Menerapkan manajemen mutu berbasis ISO.</li>
              </ul>
            </div>
          </div>
        </div>
      </main>

      <Footer />
    </div>
  );
}

