"use client";

import { ReactNode, useEffect, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { Sidebar } from "@/app/components/Sidebar";
import { Topbar } from "@/app/components/Topbar";
import { getRoleCodes } from "@/app/lib/auth";
import { useAuth } from "@/app/providers";

export default function DashboardLayout({ children }: { children: ReactNode }) {
  const router = useRouter();
  const { user, loading, signOut } = useAuth();
  const roles = useMemo(() => getRoleCodes(user), [user]);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  useEffect(() => {
    if (loading) return;
    if (!user) router.replace("/login");
  }, [loading, user, router]);

  if (loading) {
    return (
      <main className="min-h-screen flex items-center justify-center">
        <div className="text-sm text-gray-600">Memuat...</div>
      </main>
    );
  }

  if (!user) return null;

  return (
    <div className="min-h-screen flex relative overflow-hidden font-sans text-slate-800">
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-400 to-red-400 opacity-80 -z-20"></div>
      
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-300/60 rounded-full mix-blend-multiply filter blur-[100px] -z-10 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-400/60 rounded-full mix-blend-multiply filter blur-[120px] -z-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-300/60 rounded-full mix-blend-multiply filter blur-[120px] -z-10 animate-blob animation-delay-4000"></div>

      <div className="relative z-10 flex w-full h-screen p-2 md:p-4 gap-4">
        <Sidebar roles={roles} isOpen={sidebarOpen} setIsOpen={setSidebarOpen} />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Topbar title="Dashboard" userName={user.name} roles={roles} onSignOut={signOut} onMenuClick={() => setSidebarOpen(true)} />
          <div className="flex-1 overflow-auto rounded-2xl pb-4 md:pb-0">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
