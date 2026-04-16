"use client";

import { useState } from "react";
import { useAuth } from "@/app/providers";
import { API_BASE_URL } from "@/app/lib/api";

export default function MediaPage() {
  const { token } = useAuth();
  const [file, setFile] = useState<File | null>(null);
  const [uploading, setUploading] = useState(false);
  const [result, setResult] = useState<{ url: string; filename: string } | null>(null);
  const [error, setError] = useState<string | null>(null);

  async function handleUpload(e: React.FormEvent) {
    e.preventDefault();
    if (!file || !token) return;

    setUploading(true);
    setError(null);
    setResult(null);

    const formData = new FormData();
    formData.append("file", file);

    try {
      const res = await fetch(`${API_BASE_URL}/media/upload`, {
        method: "POST",
        headers: {
          Authorization: `Bearer ${token}`,
        },
        body: formData,
      });

      if (!res.ok) throw new Error("Upload gagal");

      const data = await res.json();
      setResult(data);
      setFile(null);
    } catch (err: any) {
      setError(err.message);
    } finally {
      setUploading(false);
    }
  }

  return (
    <main>
      <h1 className="text-2xl font-bold mb-4">Media Library (Upload)</h1>
      <div className="bg-white/60 backdrop-blur-lg p-4 border border-white/50 rounded-2xl shadow-sm max-w-md">
        <form onSubmit={handleUpload} className="flex flex-col gap-4">
          <input
            type="file"
            onChange={(e) => setFile(e.target.files?.[0] || null)}
            className="border border-white/50 bg-white/50 p-2 rounded-xl focus:outline-none focus:ring-2 focus:ring-blue-400/50 transition-all"
          />
          <button type="submit" disabled={!file || uploading} className="bg-blue-600 text-white py-2 rounded hover:bg-blue-700 disabled:opacity-50">
            {uploading ? "Mengunggah..." : "Upload File"}
          </button>
        </form>

        {error && <div className="mt-4 text-red-600 text-sm">{error}</div>}

        {result && (
          <div className="mt-4 p-3 bg-green-50 text-green-800 rounded border border-green-200">
            <p className="font-semibold">Upload Berhasil!</p>
            <p className="text-sm mt-1">
              URL:{" "}
              <a href={`${API_BASE_URL}${result.url}`} target="_blank" rel="noreferrer" className="underline text-blue-600">
                {result.url}
              </a>
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
