"use client";

import { Menu } from "lucide-react";

export function Topbar({
  title,
  userName,
  roles,
  onSignOut,
  onMenuClick,
}: {
  title: string;
  userName: string;
  roles: string[];
  onSignOut: () => void;
  onMenuClick?: () => void;
}) {
  return (
    <header className="h-20 mb-4 bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] flex items-center justify-between px-4 md:px-8">
      <div className="flex items-center gap-4">
        {onMenuClick && (
          <button 
            onClick={onMenuClick}
            className="md:hidden p-2 bg-white/50 hover:bg-white/70 rounded-xl text-slate-700 transition-colors border border-white/60"
          >
            <Menu className="w-5 h-5" />
          </button>
        )}
        <div className="font-bold text-lg md:text-xl text-slate-800 tracking-tight drop-shadow-sm truncate max-w-[150px] md:max-w-none">{title}</div>
      </div>
      <div className="flex items-center gap-3 md:gap-6">
        <div className="text-right hidden sm:block">
          <div className="text-sm font-bold text-slate-800 drop-shadow-sm">{userName}</div>
          <div className="text-xs font-bold text-blue-800 bg-white/70 px-2 py-0.5 rounded-full inline-block mt-1 shadow-sm border border-white/50">{roles.join(", ")}</div>
        </div>
        <div className="w-px h-8 bg-white/60 mx-1 md:mx-2 hidden sm:block"></div>
        <button
          className="px-3 py-2 md:px-5 md:py-2.5 text-xs md:text-sm font-bold rounded-xl bg-white/50 hover:bg-white/70 text-blue-700 shadow-sm backdrop-blur-md transition-all border border-white/60"
          onClick={onSignOut}
          type="button"
        >
          Keluar
        </button>
      </div>
    </header>
  );
}

