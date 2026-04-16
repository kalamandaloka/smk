"use client";

import { FormEvent, useEffect, useState } from "react";
import { fetchJson } from "@/app/lib/api";
import { useAuth } from "@/app/providers";
import { getRoleCodes } from "@/app/lib/auth";

type Course = { id: string; title: string; slug: string };
type CourseModule = { id: string; courseId: string; title: string; order: number; createdAt: string };

export default function CourseModulesPage() {
  const { token, user } = useAuth();
  const roles = getRoleCodes(user);
  const isStudent = roles.includes("STUDENT");
  const canManage = !isStudent;

  const [courses, setCourses] = useState<Course[]>([]);
  const [courseId, setCourseId] = useState("");
  const [items, setItems] = useState<CourseModule[]>([]);
  const [title, setTitle] = useState("");
  const [order, setOrder] = useState(0);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  async function loadCourses() {
    if (!token) return;
    const c = await fetchJson<Course[]>("/courses", { token, cache: "no-store" });
    setCourses(c);
    if (!courseId && c.length > 0) setCourseId(c[0].id);
  }

  async function loadModules(nextCourseId?: string) {
    if (!token) return;
    const id = nextCourseId ?? courseId;
    if (!id) {
      setItems([]);
      return;
    }
    const m = await fetchJson<CourseModule[]>(`/course-modules/by-course/${id}`, { token, cache: "no-store" });
    setItems(m);
  }

  async function load() {
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      await loadCourses();
      await loadModules();
    } catch {
      setError("Gagal memuat modul course");
    } finally {
      setLoading(false);
    }
  }

  useEffect(() => {
    load();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [token]);

  async function onChangeCourse(nextId: string) {
    setCourseId(nextId);
    if (!token) return;
    setLoading(true);
    setError(null);
    try {
      await loadModules(nextId);
    } catch {
      setError("Gagal memuat modul");
    } finally {
      setLoading(false);
    }
  }

  async function onSubmit(e: FormEvent) {
    e.preventDefault();
    if (!token) return;
    setError(null);
    try {
      await fetchJson("/course-modules", {
        token,
        method: "POST",
        body: JSON.stringify({ courseId, title, order }),
      });
      setTitle("");
      setOrder(0);
      await loadModules();
    } catch {
      setError("Gagal membuat modul");
    }
  }

  async function onDelete(id: string) {
    if (!token) return;
    const ok = window.confirm("Hapus modul ini?");
    if (!ok) return;
    setDeletingId(id);
    setError(null);
    try {
      await fetchJson(`/course-modules/${id}`, { token, method: "DELETE" });
      await loadModules();
    } catch {
      setError("Gagal menghapus modul");
    } finally {
      setDeletingId(null);
    }
  }

  return (
    <main className="space-y-4">
      <div>
        <h1 className="text-xl font-bold">Modul Course</h1>
        {canManage && <p className="text-sm text-gray-600">GET /course-modules/by-course/:courseId, POST /course-modules, DELETE /course-modules/:id</p>}
      </div>

      <div className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm p-4 grid gap-3 md:grid-cols-3">
        <div className="md:col-span-2">
          <label className="block text-sm font-medium">Course</label>
          <select className="mt-1 w-full border rounded px-3 py-2" value={courseId} onChange={(e) => onChangeCourse(e.target.value)}>
            {courses.map((c) => (
              <option key={c.id} value={c.id}>
                {c.title} ({c.slug})
              </option>
            ))}
          </select>
        </div>
      </div>

      {canManage && (
        <form onSubmit={onSubmit} className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm p-4 grid gap-3 md:grid-cols-4">
          <div className="md:col-span-2">
            <label className="block text-sm font-medium">Judul modul</label>
            <input className="mt-1 w-full border rounded px-3 py-2" value={title} onChange={(e) => setTitle(e.target.value)} />
          </div>
          <div>
            <label className="block text-sm font-medium">Order</label>
            <input className="mt-1 w-full border rounded px-3 py-2" value={order} onChange={(e) => setOrder(Number(e.target.value))} type="number" />
          </div>
          <div className="flex items-end justify-end">
            <button className="px-4 py-2 rounded bg-gray-900 text-white hover:bg-gray-800 disabled:bg-gray-400" type="submit" disabled={!courseId || !title}>
              Tambah
            </button>
          </div>
        </form>
      )}

      {error ? <div className="text-sm text-red-600">{error}</div> : null}

      <div className="bg-white/60 backdrop-blur-lg border border-white/50 rounded-2xl shadow-sm overflow-hidden">
        <div className="p-3 border-b text-sm font-medium">Daftar</div>
        {loading ? (
          <div className="p-3 text-sm text-gray-600">Memuat...</div>
        ) : (
          <table className="w-full text-sm">
            <thead className="bg-white/40">
              <tr>
                <th className="text-left p-2">Order</th>
                <th className="text-left p-2">Judul</th>
                <th className="text-left p-2">Dibuat</th>
                {canManage && <th className="text-left p-2">Aksi</th>}
              </tr>
            </thead>
            <tbody>
              {items.map((m) => (
                <tr key={m.id} className="border-t">
                  <td className="p-2">{m.order}</td>
                  <td className="p-2">{m.title}</td>
                  <td className="p-2">{new Date(m.createdAt).toLocaleString()}</td>
                  {canManage && (
                    <td className="p-2">
                      <button className="text-red-700 hover:underline disabled:text-gray-400" onClick={() => onDelete(m.id)} disabled={deletingId === m.id} type="button">
                        {deletingId === m.id ? "Menghapus..." : "Hapus"}
                      </button>
                    </td>
                  )}
                </tr>
              ))}
              {items.length === 0 ? (
                <tr>
                  <td className="p-3 text-gray-600" colSpan={canManage ? 4 : 3}>
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
