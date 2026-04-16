"use client";

import Navbar from "../../components/Navbar";
import Footer from "../../components/Footer";

export default function Guru() {
  const teachers = [
    { name: "Budi Santoso, S.Pd, M.T", role: "Kepala Sekolah", subject: "Manajemen Pendidikan", image: "https://placehold.co/300x300?text=Budi" },
    { name: "Siti Aminah, S.Kom", role: "Ketua Jurusan", subject: "Rekayasa Perangkat Lunak", image: "https://placehold.co/300x300?text=Siti" },
    { name: "Ahmad Riyadi, S.T", role: "Guru Produktif", subject: "Teknik Komputer Jaringan", image: "https://placehold.co/300x300?text=Ahmad" },
    { name: "Dina Mariana, M.Pd", role: "Guru Adaptif", subject: "Bahasa Inggris", image: "https://placehold.co/300x300?text=Dina" },
    { name: "Rudi Hermawan, S.T", role: "Guru Produktif", subject: "Teknik Kendaraan Ringan", image: "https://placehold.co/300x300?text=Rudi" },
    { name: "Nina Wulandari, S.Si", role: "Guru Normatif", subject: "Matematika", image: "https://placehold.co/300x300?text=Nina" },
    { name: "Eko Prasetyo, S.Pd", role: "Pembina OSIS", subject: "Pendidikan Jasmani", image: "https://placehold.co/300x300?text=Eko" },
    { name: "Maya Sari, S.E", role: "Guru Produktif", subject: "Akuntansi", image: "https://placehold.co/300x300?text=Maya" }
  ];

  return (
    <div className="min-h-screen font-sans text-slate-800 relative overflow-hidden bg-gradient-to-br from-indigo-50 via-purple-50 to-blue-50 flex flex-col">
      <div className="absolute top-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-blue-400/20 blur-[120px] pointer-events-none"></div>
      <div className="absolute bottom-[-10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-indigo-400/20 blur-[120px] pointer-events-none"></div>

      <Navbar />

      <main className="flex-1 pt-32 pb-20 px-6 md:px-12 max-w-7xl mx-auto relative z-10 w-full">
        <div className="text-center mb-16">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 text-slate-900">Tenaga Pendidik</h1>
          <p className="text-slate-600 max-w-2xl mx-auto">Kami didukung oleh tenaga pendidik profesional dan berpengalaman di bidangnya masing-masing untuk memberikan pendidikan terbaik bagi siswa.</p>
        </div>
        
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8">
          {teachers.map((teacher, i) => (
            <div key={i} className="bg-white/40 backdrop-blur-xl border border-white/50 p-6 rounded-[2rem] text-center hover:shadow-xl transition-shadow group">
              <div className="w-32 h-32 mx-auto rounded-full overflow-hidden mb-6 border-4 border-white shadow-md">
                <img src={teacher.image} alt={teacher.name} className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" />
              </div>
              <h3 className="font-bold text-lg text-slate-800 mb-1">{teacher.name}</h3>
              <p className="text-[#3A36DB] font-medium text-sm mb-2">{teacher.role}</p>
              <div className="inline-block bg-white/60 px-3 py-1 rounded-full text-xs text-slate-600 border border-white/60">
                {teacher.subject}
              </div>
            </div>
          ))}
        </div>
      </main>

      <Footer />
    </div>
  );
}

