"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";
import { getRoleCodes } from "@/app/lib/auth";

type School = { id: string; name: string };
type Department = { id: string; name: string; schoolId: string };
type Course = {
  id: string;
  title: string;
  slug: string;
  description?: string | null;
  status: "DRAFT" | "PUBLISHED";
  schoolId: string;
  departmentId?: string | null;
  createdAt: string;
  school?: School;
  department?: Department | null;
};

export default function CoursesPage() {
  const { token, user } = useAuth();
  const roles = getRoleCodes(user);
  const isStudent = roles.includes("STUDENT");
  const canManage = !isStudent;

  const [schools, setSchools] = useState<School[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [items, setItems] = useState<Course[]>([]);
  const [schoolId, setSchoolId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [title, setTitle] = useState("");
  const [slug, setSlug] = useState("");
  const [description, setDescription] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [s, d, c] = await Promise.all([
        fetchJson<School[]>("/schools", { token, cache: "no-store" }),
        fetchJson<Department[]>("/departments", { token, cache: "no-store" }),
        fetchJson<Course[]>("/courses", { token, cache: "no-store" }),
      ]);
      setSchools(s);
      setDepartments(d);
      setItems(c);
      if (!schoolId && s.length > 0) setSchoolId(s[0].id);
    } catch {
      setError("Gagal memuat course");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  const deptOptions = useMemo(() => departments.filter((d) => !schoolId || d.schoolId === schoolId), [departments, schoolId]);
  const schoolNameById = useMemo(() => new Map(schools.map((s) => [s.id, s.name])), [schools]);
  const deptNameById = useMemo(() => new Map(departments.map((d) => [d.id, d.name])), [departments]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    try {
      await fetchJson("/courses", {
        token,
        method: "POST",
        body: JSON.stringify({
          title,
          slug,
          description: description || undefined,
          schoolId,
          departmentId: departmentId || undefined,
        }),
      });
      setTitle("");
      setSlug("");
      setDescription("");
      await load();
    } catch {
      setError("Gagal membuat course");
    }
  }

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Mata Pelajaran (Course)</h1>
        {canManage && <p className="text-sm text-gray-600">GET/POST /courses</p>}
      </div>

      {canManage && (
        <form onSubmit={onSubmit} className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] grid gap-4 md:grid-cols-4 mb-8">
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Sekolah</label>
            <select
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 shadow-inner"
              value={schoolId}
              onChange={(e) => {
                setSchoolId(e.target.value);
                setDepartmentId("");
              }}
            >
              {schools.map((s) => (
                <option key={s.id} value={s.id}>
                  {s.name}
                </option>
              ))}
            </select>
          </div>
          <div>
            <label className="block text-sm font-semibold text-slate-700 mb-1">Jurusan (opsional)</label>
            <select
              className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 shadow-inner"
              value={departmentId}
              onChange={(e) => setDepartmentId(e.target.value)}
            >
              <option value="">-</option>
              {deptOptions.map((d) => (
                <option key={d.id} value={d.id}>
                  {d.name}
                </option>
              ))}
            </select>
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Judul</label>
            <input className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner" value={title} onChange={(e) => setTitle(e.target.value)} placeholder="Masukkan judul course" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Slug</label>
            <input className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner" value={slug} onChange={(e) => setSlug(e.target.value)} placeholder="dasar-pemrograman" />
          </div>
          <div className="md:col-span-2">
            <label className="block text-sm font-semibold text-slate-700 mb-1">Deskripsi (opsional)</label>
            <input className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner" value={description} onChange={(e) => setDescription(e.target.value)} placeholder="Masukkan deskripsi course" />
          </div>
          <div className="md:col-span-4 flex justify-end mt-2">
            <button
              className="bg-blue-600/90 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 backdrop-blur-md transition-all border border-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100 disabled:cursor-not-allowed"
              type="submit"
              disabled={!title || !slug || !schoolId}
            >
              Tambah Course
            </button>
          </div>
        </form>
      )}

      {error ? <div className="text-sm text-red-600 font-medium mb-4 px-4 py-2 bg-red-50 rounded-lg border border-red-200">{error}</div> : null}

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] overflow-hidden">
        <div className="p-4 border-b border-white/60 text-lg font-bold text-slate-800 bg-white/50 backdrop-blur-md">Daftar Course</div>
        {loading ? (
          <div className="p-8 text-center text-slate-600 font-medium">Memuat...</div>
        ) : (
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
                <tr>
                  <th className="p-4 font-bold text-slate-800">Sekolah</th>
                  <th className="p-4 font-bold text-slate-800">Jurusan</th>
                  <th className="p-4 font-bold text-slate-800">Judul</th>
                  <th className="p-4 font-bold text-slate-800">Slug</th>
                  <th className="p-4 font-bold text-slate-800">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-white/40">
                {items.map((c) => (
                  <tr key={c.id} className="hover:bg-white/30 transition-colors">
                    <td className="p-4 text-slate-700 font-medium">{c.school?.name ?? schoolNameById.get(c.schoolId) ?? c.schoolId}</td>
                    <td className="p-4 text-slate-600">{c.department?.name ?? (c.departmentId ? deptNameById.get(c.departmentId) ?? c.departmentId : "-")}</td>
                    <td className="p-4 text-slate-800 font-semibold">{c.title}</td>
                    <td className="p-4 text-slate-600">{c.slug}</td>
                    <td className="p-4 text-slate-600">
                      <span className={`px-2 py-1 rounded-full text-xs font-semibold ${c.status === "PUBLISHED" ? "bg-green-100 text-green-700" : "bg-gray-100 text-gray-700"}`}>
                        {c.status}
                      </span>
                    </td>
                  </tr>
                ))}
                {items.length === 0 ? (
                  <tr>
                    <td className="p-8 text-center text-slate-500 font-medium bg-white/20" colSpan={5}>
                      Belum ada data course.
                    </td>
                  </tr>
                ) : null}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </main>
  );
}
