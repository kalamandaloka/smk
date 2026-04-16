"use client";

import { FormEvent, useMemo, useState } from "react";
import { useRouter } from "next/navigation";
import { ApiError } from "../lib/api";
import { useAuth } from "../providers";

export default function LoginPage() {
  const router = useRouter();
  const { signIn } = useAuth();
  const [email, setEmail] = useState("admin@smk.local");
  const [password, setPassword] = useState("Admin123!");
  const [submitting, setSubmitting] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const disabled = useMemo(() => submitting || !email || !password, [submitting, email, password]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    setSubmitting(true);
    setError(null);
    try {
      await signIn(email, password);
      router.push("/dashboard");
    } catch (e2) {
      if (e2 instanceof ApiError) {
        setError(typeof e2.body === "string" ? e2.body : `Login gagal (${e2.status})`);
      } else {
        setError("Login gagal");
      }
    } finally {
      setSubmitting(false);
    }
  }

  return (
    <main className="min-h-screen flex items-center justify-center relative overflow-hidden font-sans text-slate-800">
      {/* Dynamic Animated Gradient Background: Blue, Sky Blue, Purple, Red */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500 via-purple-400 to-red-400 opacity-80 -z-20"></div>
      
      {/* Decorative Blur Blobs for Extra Depth */}
      <div className="absolute top-[-10%] left-[-10%] w-[500px] h-[500px] bg-sky-300/60 rounded-full mix-blend-multiply filter blur-[100px] -z-10 animate-blob"></div>
      <div className="absolute top-[20%] right-[-10%] w-[600px] h-[600px] bg-blue-400/60 rounded-full mix-blend-multiply filter blur-[120px] -z-10 animate-blob animation-delay-2000"></div>
      <div className="absolute bottom-[-20%] left-[20%] w-[600px] h-[600px] bg-purple-300/60 rounded-full mix-blend-multiply filter blur-[120px] -z-10 animate-blob animation-delay-4000"></div>

      <div className="w-full max-w-md bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] p-8 relative z-10">
        <div className="text-center mb-8">
          <div className="w-16 h-16 bg-white/80 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg shadow-blue-500/20 backdrop-blur-md border border-white/60">
            <span className="text-blue-600 font-extrabold text-2xl">LMS</span>
          </div>
          <h1 className="text-2xl font-bold text-slate-800 drop-shadow-sm mb-1">Selamat Datang</h1>
          <p className="text-slate-600 font-medium">Silakan masuk ke akun Anda</p>
        </div>

        <form className="mt-6 space-y-5" onSubmit={onSubmit}>
          {error && <div className="text-sm text-red-600 bg-red-100/50 p-3 rounded-xl border border-red-200/50 backdrop-blur-sm">{error}</div>}
          
          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Email</label>
            <input 
              type="email" 
              required 
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner"
              value={email}
              onChange={e => setEmail(e.target.value)}
              placeholder="admin@example.com"
            />
          </div>

          <div>
            <label className="block mb-1 text-sm font-semibold text-slate-700">Password</label>
            <input 
              type="password" 
              required 
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner"
              value={password}
              onChange={e => setPassword(e.target.value)}
              placeholder="••••••••"
            />
          </div>

          <button 
            type="submit" 
            disabled={disabled}
            className="w-full bg-blue-600/90 hover:bg-blue-700 disabled:bg-gray-400/80 disabled:hover:scale-100 disabled:shadow-none text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 backdrop-blur-md transition-all border border-blue-500/50 hover:scale-[1.02] mt-4"
          >
            {submitting ? "Memproses..." : "Masuk"}
          </button>
        </form>
      </div>
    </main>
  );
}

