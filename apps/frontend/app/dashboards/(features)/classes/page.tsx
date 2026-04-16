"use client";

import { FormEvent, useEffect, useMemo, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";

type School = { id: string; name: string };
type Department = { id: string; name: string; schoolId: string };
type AcademicYear = { id: string; label: string };
type ClassItem = {
  id: string;
  name: string;
  schoolId: string;
  departmentId?: string | null;
  academicYearId?: string | null;
  createdAt: string;
  school?: School;
  department?: Department | null;
  academicYear?: AcademicYear | null;
};

export default function ClassesPage() {
  const { token } = useAuth();
  const [schools, setSchools] = useState<School[]>([]);
  const [departments, setDepartments] = useState<Department[]>([]);
  const [years, setYears] = useState<AcademicYear[]>([]);
  const [items, setItems] = useState<ClassItem[]>([]);
  const [schoolId, setSchoolId] = useState("");
  const [departmentId, setDepartmentId] = useState("");
  const [academicYearId, setAcademicYearId] = useState("");
  const [name, setName] = useState("");
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      const [s, d, y, c] = await Promise.all([
        fetchJson<School[]>("/schools", { token, cache: "no-store" }),
        fetchJson<Department[]>("/departments", { token, cache: "no-store" }),
        fetchJson<AcademicYear[]>("/academic-years", { token, cache: "no-store" }),
        fetchJson<ClassItem[]>("/classes", { token, cache: "no-store" }),
      ]);
      setSchools(s);
      setDepartments(d);
      setYears(y);
      setItems(c);
      if (!schoolId && s.length > 0) setSchoolId(s[0].id);
    } catch {
      setError("Gagal memuat kelas");
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
  const yearLabelById = useMemo(() => new Map(years.map((y) => [y.id, y.label])), [years]);

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    try {
      await fetchJson("/classes", {
        token,
        method: "POST",
        body: JSON.stringify({
          name,
          schoolId,
          departmentId: departmentId || undefined,
          academicYearId: academicYearId || undefined,
        }),
      });
      setName("");
      await load();
    } catch {
      setError("Gagal membuat kelas");
    }
  }

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Kelas</h1>
        <p className="text-sm text-gray-600">GET/POST /classes</p>
      </div>

      <form onSubmit={onSubmit} className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl p-6 shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] mb-8 grid gap-4 md:grid-cols-4">
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">Sekolah</label>
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
          <label className="block mb-1 text-sm font-semibold text-slate-700">Jurusan (opsional)</label>
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
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">Tahun ajaran (opsional)</label>
          <select
            className="w-full border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 shadow-inner"
            value={academicYearId}
            onChange={(e) => setAcademicYearId(e.target.value)}
          >
            <option value="">-</option>
            {years.map((y) => (
              <option key={y.id} value={y.id}>
                {y.label}
              </option>
            ))}
          </select>
        </div>
        <div>
          <label className="block mb-1 text-sm font-semibold text-slate-700">Nama kelas</label>
          <div className="flex gap-2">
            <input
              className="flex-1 border border-white/60 bg-white/50 backdrop-blur-md rounded-xl p-3 focus:outline-none focus:ring-2 focus:ring-blue-400 focus:bg-white/70 transition-all text-slate-800 placeholder-slate-400 shadow-inner"
              value={name}
              onChange={(e) => setName(e.target.value)}
              placeholder="X PPLG 1"
            />
            <button
              className="bg-blue-600/90 hover:bg-blue-700 text-white font-bold py-3 px-6 rounded-xl shadow-lg shadow-blue-500/30 backdrop-blur-md transition-all border border-blue-500/50 hover:scale-[1.02] disabled:opacity-50 disabled:hover:scale-100"
              type="submit"
              disabled={!name || !schoolId}
            >
              Tambah
            </button>
          </div>
        </div>
      </form>

      {error ? <div className="text-sm text-red-600 mb-4">{error}</div> : null}

      <div className="bg-white/40 backdrop-blur-2xl border border-white/50 rounded-3xl shadow-[0_8px_32px_0_rgba(31,38,135,0.1)] overflow-hidden">
        {loading ? (
          <div className="p-8 text-center text-slate-500 font-medium bg-white/20">Memuat data...</div>
        ) : (
          <table className="w-full text-left">
            <thead className="bg-white/50 border-b border-white/60 backdrop-blur-md">
              <tr>
                <th className="p-4 font-bold text-slate-800">Sekolah</th>
                <th className="p-4 font-bold text-slate-800">Jurusan</th>
                <th className="p-4 font-bold text-slate-800">Tahun</th>
                <th className="p-4 font-bold text-slate-800">Nama</th>
                <th className="p-4 font-bold text-slate-800">Dibuat</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-white/40">
              {items.map((c) => (
                <tr key={c.id} className="hover:bg-white/30 transition-colors">
                  <td className="p-4 text-slate-800 font-semibold">{c.school?.name ?? schoolNameById.get(c.schoolId) ?? c.schoolId}</td>
                  <td className="p-4 text-slate-700">{c.department?.name ?? (c.departmentId ? deptNameById.get(c.departmentId) ?? c.departmentId : "-")}</td>
                  <td className="p-4 text-slate-700">{c.academicYear?.label ?? (c.academicYearId ? yearLabelById.get(c.academicYearId) ?? c.academicYearId : "-")}</td>
                  <td className="p-4 text-slate-800 font-medium">{c.name}</td>
                  <td className="p-4 text-slate-600 text-sm">{new Date(c.createdAt).toLocaleDateString("id-ID")}</td>
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td colSpan={5} className="p-8 text-center text-slate-500 font-medium bg-white/20">
                    Belum ada data
                  </td>
                </tr>
              ) : null}
            </tbody>
          </table>
        )}
      </div>
    </main>
  );
}
