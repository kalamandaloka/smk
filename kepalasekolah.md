# Kepala Sekolah LMS SMK - Struktur Menu Lengkap + Dummy Data

Dokumen ini berisi struktur lengkap menu **Kepala Sekolah** untuk sistem LMS SMK, termasuk fungsi utama dan dummy data yang perlu tersedia pada tiap menu.

Kepala Sekolah di sini adalah role **pimpinan operasional sekolah**, dengan fokus pada monitoring akademik, pengawasan guru dan siswa, validasi hasil pembelajaran, pengawasan disiplin, serta pengambilan keputusan di level sekolah.

---

## 1. Gambaran Peran Kepala Sekolah

Kepala Sekolah adalah role yang berfungsi untuk:

- memantau operasional akademik sekolah
- memantau performa guru dan tenaga kependidikan
- memantau perkembangan siswa
- memvalidasi nilai akhir, rapor, dan kelulusan
- memantau BK dan kesiswaan
- memantau ringkasan keuangan sekolah
- menyetujui program, kegiatan, dan keputusan penting di level sekolah
- mengakses laporan sekolah secara menyeluruh

Kepala Sekolah **tidak mengelola sistem global yayasan**, tetapi memiliki akses monitoring luas dan approval di unit/sekolahnya sendiri.

---

## 2. Struktur Sidebar Kepala Sekolah

### 2.1 Kelompok Menu

1. Beranda
2. Akademik
3. Penilaian
4. Siswa
5. Administrasi
6. Keuangan
7. Komunikasi
8. Laporan
9. Pengaturan

### 2.2 Struktur Sidebar Detail

| Urutan | Kelompok Menu | Isi |
|---|---|---|
| 1 | Beranda | Dashboard Kepala Sekolah, Notifikasi, Kalender Sekolah |
| 2 | Akademik | Monitoring Pembelajaran, Monitoring Guru, Kurikulum & Jadwal, Absensi Sekolah |
| 3 | Penilaian | Monitoring Nilai, Validasi Nilai Akhir, Rapor, Kelulusan |
| 4 | Siswa | Monitoring Siswa, BK & Kesiswaan, Prestasi, Pelanggaran |
| 5 | Administrasi | Approval Program, Dokumen Sekolah, Monitoring SDM |
| 6 | Keuangan | Keuangan Ringkas, Monitoring Pembayaran |
| 7 | Komunikasi | Pengumuman Sekolah, Pesan Internal |
| 8 | Laporan | Laporan Akademik, Laporan Guru, Laporan Siswa, Laporan Disiplin, Laporan Keuangan Ringkas |
| 9 | Pengaturan | Profil Sekolah, Preferensi Dashboard |

---

## 3. Tabel Lengkap Menu Kepala Sekolah

| Kelompok Menu | Menu | Fungsi | Dummy Data yang Harus Ada |
|---|---|---|---|
| Beranda | Dashboard Kepala Sekolah | Menampilkan ringkasan performa sekolah | Total siswa: 780, total guru: 48, total kelas: 24, kehadiran siswa: 91%, kehadiran guru: 96%, ketuntasan belajar: 88% |
| Beranda | Notifikasi | Menampilkan notifikasi penting sekolah | “5 guru belum finalisasi nilai”, “2 kelas belum lengkap jurnal mingguan”, “7 siswa pelanggaran sedang”, “Approval kegiatan OSIS menunggu” |
| Beranda | Kalender Sekolah | Menampilkan agenda penting sekolah | MPLS 15 Juli 2026, UTS 10 Sept 2026, UAS 5 Des 2026, rapat guru 1 Agustus 2026 |
| Akademik | Monitoring Pembelajaran | Memantau aktivitas pembelajaran di seluruh kelas | 24 kelas aktif, 92% materi terunggah, 89% tugas berjalan sesuai jadwal |
| Akademik | Monitoring Guru | Memantau performa guru | 48 guru aktif, 46 guru rutin isi jurnal, 2 guru terlambat input nilai |
| Akademik | Kurikulum & Jadwal | Memantau implementasi kurikulum dan jadwal | Kurikulum Merdeka aktif, jadwal semester ganjil final, 3 revisi jadwal minggu ini |
| Akademik | Absensi Sekolah | Memantau absensi siswa dan guru | Kehadiran siswa 91%, kehadiran guru 96%, 22 siswa alpha bulan ini |
| Penilaian | Monitoring Nilai | Memantau perkembangan nilai siswa | Rata-rata nilai sekolah 82, nilai tertinggi 98, remedial aktif 54 siswa |
| Penilaian | Validasi Nilai Akhir | Menyetujui nilai akhir yang sudah final | 18 kelas siap validasi, 6 kelas masih menunggu guru mapel |
| Penilaian | Rapor | Memeriksa dan menyetujui rapor | 22 rapor kelas siap cetak, 2 kelas belum lengkap |
| Penilaian | Kelulusan | Memantau status kelulusan siswa akhir | 248 siswa kelas XII, 243 lulus, 5 dalam review |
| Siswa | Monitoring Siswa | Memantau kondisi umum siswa | Total siswa aktif 780, mutasi keluar 4, mutasi masuk 2 |
| Siswa | BK & Kesiswaan | Memantau layanan BK dan disiplin siswa | 38 sesi konseling bulan ini, 14 kasus pelanggaran aktif |
| Siswa | Prestasi | Memantau prestasi siswa | 12 prestasi akademik, 8 prestasi non-akademik |
| Siswa | Pelanggaran | Memantau kasus disiplin | 7 pelanggaran sedang, 2 pelanggaran berat |
| Administrasi | Approval Program | Menyetujui program dan kegiatan sekolah | Kegiatan class meeting, program kunjungan industri, revisi kalender sekolah |
| Administrasi | Dokumen Sekolah | Menyimpan dan membaca dokumen resmi sekolah | SK pembagian tugas, dokumen akreditasi, SOP akademik |
| Administrasi | Monitoring SDM | Memantau guru dan staff sekolah | 48 guru, 2 BK, 2 keuangan, 3 admin, 4 staff umum |
| Keuangan | Keuangan Ringkas | Melihat ringkasan finansial sekolah | Pemasukan bulan ini Rp145.000.000, tunggakan Rp27.500.000 |
| Keuangan | Monitoring Pembayaran | Memantau pembayaran siswa | 550 pembayaran berhasil, 68 siswa menunggak |
| Komunikasi | Pengumuman Sekolah | Menyampaikan pengumuman resmi sekolah | “Libur nasional”, “Batas input nilai”, “Rapat guru semester ganjil” |
| Komunikasi | Pesan Internal | Komunikasi dengan guru, admin, BK, keuangan | Pesan ke wali kelas, pesan ke kurikulum, pesan ke admin sekolah |
| Laporan | Laporan Akademik | Melihat rekap akademik sekolah | Rata-rata nilai per jurusan, keterisian jurnal, distribusi mapel |
| Laporan | Laporan Guru | Melihat laporan performa guru | Kehadiran guru, keterisian jurnal, keterlambatan input nilai |
| Laporan | Laporan Siswa | Melihat statistik siswa | Kehadiran siswa, mutasi, distribusi per jurusan |
| Laporan | Laporan Disiplin | Melihat laporan BK dan kesiswaan | Kasus konseling, pelanggaran, pembinaan |
| Laporan | Laporan Keuangan Ringkas | Melihat laporan keuangan sekolah | Total tagihan, total pembayaran, total tunggakan |
| Pengaturan | Profil Sekolah | Mengelola profil dasar sekolah | Nama sekolah, alamat, email, telepon, kepala sekolah, akreditasi |
| Pengaturan | Preferensi Dashboard | Mengatur komponen dashboard kepala sekolah | Tampilkan grafik nilai, tampilkan absensi, tampilkan notifikasi prioritas |

---

## 4. Dummy Data Minimum yang Harus Disiapkan

| Kategori | Dummy Minimum |
|---|---|
| Sekolah / Unit | 1 sekolah |
| Tahun Ajaran | 1–2 tahun ajaran |
| Semester | 2 semester |
| Statistik Akademik | 1 set data sekolah |
| Statistik Guru | 1 set data guru |
| Statistik Siswa | 1 set data siswa |
| Statistik Penilaian | 1 set data nilai |
| Statistik BK/Kesiswaan | 1 set data kasus |
| Statistik Keuangan | 1 set data keuangan |
| Approval Program | 5–10 data approval |
| Dokumen Sekolah | 5–10 dokumen |
| Pengumuman Sekolah | 3–5 pengumuman |
| Laporan Sekolah | 4–5 jenis laporan |

---

## 5. Contoh Dummy Data Konkret

### 5.1 Data Sekolah

| Field | Dummy |
|---|---|
| Nama Sekolah | SMK Nusa Bangsa |
| Kode Sekolah | SMKNB01 |
| Jenjang | SMK |
| NPSN | 12345678 |
| Kepala Sekolah | Budi Santoso, M.Pd |
| Email | info@smknusabangsa.sch.id |
| Telepon | 021-7778899 |
| Akreditasi | A |

### 5.2 Data Monitoring Akademik

| Indikator | Nilai |
|---|---|
| Total Kelas Aktif | 24 |
| Materi Terunggah | 92% |
| Tugas Aktif | 148 |
| Keterisian Jurnal Guru | 93% |
| Kepatuhan Jadwal | 96% |

### 5.3 Data Monitoring Guru

| Indikator | Nilai |
|---|---|
| Total Guru | 48 |
| Guru Hadir Bulan Ini | 96% |
| Guru Lengkap Isi Jurnal | 46 |
| Guru Belum Input Nilai | 2 |
| Wali Kelas Aktif | 24 |

### 5.4 Data Monitoring Siswa

| Indikator | Nilai |
|---|---|
| Total Siswa Aktif | 780 |
| Kehadiran Siswa | 91% |
| Mutasi Masuk | 2 |
| Mutasi Keluar | 4 |
| Siswa Remedial | 54 |

### 5.5 Data Monitoring BK & Kesiswaan

| Indikator | Nilai |
|---|---|
| Sesi Konseling Bulan Ini | 38 |
| Pelanggaran Ringan | 21 |
| Pelanggaran Sedang | 7 |
| Pelanggaran Berat | 2 |
| Prestasi Akademik | 12 |
| Prestasi Non-Akademik | 8 |

### 5.6 Data Monitoring Keuangan

| Indikator | Nilai |
|---|---|
| Total Tagihan Bulan Ini | 172500000 |
| Total Pembayaran Masuk | 145000000 |
| Total Tunggakan | 27500000 |
| Jumlah Siswa Menunggak | 68 |

### 5.7 Data Approval Program

| No | Jenis Approval | Unit | Status |
|---|---|---|---|
| 1 | Validasi Nilai Akhir | SMK Nusa Bangsa | Menunggu |
| 2 | Persetujuan Rapor | SMK Nusa Bangsa | Menunggu |
| 3 | Kegiatan Kunjungan Industri | SMK Nusa Bangsa | Disetujui |
| 4 | Revisi Jadwal Pelajaran | SMK Nusa Bangsa | Menunggu |
| 5 | Program Class Meeting | SMK Nusa Bangsa | Disetujui |

### 5.8 Dokumen Sekolah

| Kode | Nama Dokumen | Kategori |
|---|---|---|
| DOC001 | SK Pembagian Tugas Guru | SDM |
| DOC002 | SOP Akademik Sekolah | Akademik |
| DOC003 | Dokumen Akreditasi Sekolah | Mutu |
| DOC004 | Kalender Akademik 2026/2027 | Akademik |
| DOC005 | Tata Tertib Sekolah | Kesiswaan |

---

## 6. Hak Akses Kepala Sekolah Secara Umum

| Menu | Hak Akses |
|---|---|
| Beranda | View |
| Akademik | View |
| Penilaian | View, Approve terbatas |
| Siswa | View |
| Administrasi | View, Approve terbatas |
| Keuangan | View |
| Komunikasi | View, Create, Edit, Approve terbatas |
| Laporan | View |
| Pengaturan | View, Edit terbatas |

---

## 7. Permission Key Contoh untuk Developer

### 7.1 Akademik
- `principal.learning_monitor.view`
- `principal.teacher_monitor.view`
- `principal.curriculum_schedule_monitor.view`
- `principal.school_attendance.view`

### 7.2 Penilaian
- `principal.score_monitor.view`
- `principal.final_score_validation.view`
- `principal.final_score_validation.approve`
- `principal.report.view`
- `principal.report.approve`
- `principal.graduation.view`
- `principal.graduation.approve`

### 7.3 Siswa
- `principal.student_monitor.view`
- `principal.bk_monitor.view`
- `principal.student_achievement.view`
- `principal.student_violation.view`

### 7.4 Administrasi
- `principal.program_approval.view`
- `principal.program_approval.approve`
- `principal.school_document.view`
- `principal.school_document.create`
- `principal.school_document.edit`
- `principal.hrd_monitor.view`

### 7.5 Keuangan
- `principal.finance_summary.view`
- `principal.payment_monitor.view`

### 7.6 Komunikasi
- `principal.announcement.view`
- `principal.announcement.create`
- `principal.announcement.edit`
- `principal.announcement.approve`
- `principal.message.view`
- `principal.message.create`

### 7.7 Laporan
- `principal.academic_report.view`
- `principal.teacher_report.view`
- `principal.student_report.view`
- `principal.discipline_report.view`
- `principal.finance_report.view`

### 7.8 Pengaturan
- `principal.school_profile.view`
- `principal.school_profile.edit`
- `principal.dashboard_preference.view`
- `principal.dashboard_preference.edit`

---

## 8. YAML Ringkas untuk Dibaca AI

```yaml
kepala_sekolah:
  sidebar:
    - beranda
    - akademik
    - penilaian
    - siswa
    - administrasi
    - keuangan
    - komunikasi
    - laporan
    - pengaturan

  beranda:
    - dashboard_kepala_sekolah
    - notifikasi
    - kalender_sekolah

  akademik:
    - monitoring_pembelajaran
    - monitoring_guru
    - kurikulum_dan_jadwal
    - absensi_sekolah

  penilaian:
    - monitoring_nilai
    - validasi_nilai_akhir
    - rapor
    - kelulusan

  siswa:
    - monitoring_siswa
    - bk_dan_kesiswaan
    - prestasi
    - pelanggaran

  administrasi:
    - approval_program
    - dokumen_sekolah
    - monitoring_sdm

  keuangan:
    - keuangan_ringkas
    - monitoring_pembayaran

  komunikasi:
    - pengumuman_sekolah
    - pesan_internal

  laporan:
    - laporan_akademik
    - laporan_guru
    - laporan_siswa
    - laporan_disiplin
    - laporan_keuangan_ringkas

  pengaturan:
    - profil_sekolah
    - preferensi_dashboard