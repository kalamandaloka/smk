"use client";

import { Facebook, Twitter, Instagram, Youtube } from "./icons";

export default function Footer() {
  return (
    <footer className="relative pt-20 pb-8 px-6 md:px-12 z-10 text-white mt-auto">
      <div className="absolute inset-0 bg-[#DC2626]/90 backdrop-blur-xl -z-10"></div>
      <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8">
        <div className="space-y-4 text-center md:text-left">
          <h3 className="text-2xl font-bold tracking-tight">SMK MERAH PUTIH</h3>
          <p className="text-sm text-white/80 max-w-sm">
            sekolah adalah tempat mencetak penerus bangsa yang berkarakter dan berprestasi di segala bidang yang dapat bersaing di kancah internasional.
          </p>
        </div>
        
        <div className="space-y-4 text-center md:text-right">
          <div className="flex gap-4 justify-center md:justify-end">
            <Facebook size={20} className="hover:text-red-200 cursor-pointer transition-colors" />
            <Twitter size={20} className="hover:text-red-200 cursor-pointer transition-colors" />
            <Instagram size={20} className="hover:text-red-200 cursor-pointer transition-colors" />
            <Youtube size={20} className="hover:text-red-200 cursor-pointer transition-colors" />
          </div>
          <p className="text-sm text-white/80">
            Dibuat Oleh <span className="font-semibold">Sekolahku.Id</span><br/>
            Menggunakan Tailwind css dan Next.js
          </p>
        </div>
      </div>
    </footer>
  );
}
