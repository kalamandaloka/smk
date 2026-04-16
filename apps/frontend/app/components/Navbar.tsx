"use client";

import Link from "next/link";
import { ChevronDown } from "lucide-react";
import { usePathname } from "next/navigation";

const PRIMARY_COLOR = "bg-[#DC2626]";

export default function Navbar() {
  const pathname = usePathname();

  return (
    <nav className="fixed w-full top-0 bg-white/40 backdrop-blur-xl z-50 border-b border-white/50 shadow-sm">
      <div className="max-w-7xl mx-auto px-6 md:px-12 h-20 flex items-center justify-between">
        <Link href="/" className="text-xl md:text-2xl font-bold tracking-tight text-slate-900">SMK MERAH PUTIH</Link>
        
        <div className="hidden md:flex items-center gap-8 text-sm font-semibold text-slate-600">
          <Link href="/" className={`hover:text-[#DC2626] transition-colors ${pathname === "/" ? "text-[#DC2626]" : ""}`}>Beranda</Link>
          <Link href="/tentang-kami" className={`flex items-center gap-1 hover:text-[#DC2626] transition-colors ${pathname.startsWith("/tentang-kami") ? "text-[#DC2626]" : ""}`}>
            Tentang Kami <ChevronDown size={14} />
          </Link>
          <Link href="/program" className={`flex items-center gap-1 hover:text-[#DC2626] transition-colors ${pathname.startsWith("/program") ? "text-[#DC2626]" : ""}`}>
            Program <ChevronDown size={14} />
          </Link>
          <Link href="/guru" className={`flex items-center gap-1 hover:text-[#DC2626] transition-colors ${pathname.startsWith("/guru") ? "text-[#DC2626]" : ""}`}>
            Guru <ChevronDown size={14} />
          </Link>
          <Link href="/siswa" className={`flex items-center gap-1 hover:text-[#DC2626] transition-colors ${pathname.startsWith("/siswa") ? "text-[#DC2626]" : ""}`}>
            Siswa <ChevronDown size={14} />
          </Link>
          <Link href="/berita" className={`hover:text-[#DC2626] transition-colors ${pathname.startsWith("/berita") ? "text-[#DC2626]" : ""}`}>Berita</Link>
          <Link href="/ppdb" className={`flex items-center gap-1 hover:text-[#DC2626] transition-colors ${pathname.startsWith("/ppdb") ? "text-[#DC2626]" : ""}`}>
            PPDB <ChevronDown size={14} />
          </Link>
        </div>

        <div className="flex items-center gap-3">
          <Link href="/login">
            <button className="text-[#DC2626] px-6 py-2.5 rounded-full font-semibold hover:bg-white/60 transition-colors text-sm border border-white/60 backdrop-blur-md">
              Login
            </button>
          </Link>
          <Link href="/contact">
            <button className={`${PRIMARY_COLOR} text-white px-8 py-2.5 rounded-full font-semibold hover:opacity-90 transition-opacity text-sm shadow-lg shadow-red-500/30`}>
              Contact
            </button>
          </Link>
        </div>
      </div>
    </nav>
  );
}
