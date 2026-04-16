# Siswa LMS SMK - Struktur Menu Lengkap + Dummy Data

Dokumen ini berisi struktur lengkap menu **Siswa** untuk sistem LMS SMK, termasuk fungsi utama dan dummy data yang perlu tersedia pada tiap menu.

Siswa di sini adalah role **pengguna utama pembelajaran** yang berfokus pada mengikuti kelas, mengakses materi, mengerjakan tugas dan ujian, melihat nilai, memantau progres belajar, mengakses layanan BK, serta melihat status administrasi dan keuangan pribadi.

---

## 1. Gambaran Peran Siswa

Siswa adalah role yang berfungsi untuk:

- mengikuti pembelajaran sesuai kelas dan jurusan
- mengakses materi pelajaran
- mengerjakan tugas, quiz, dan ujian
- melihat nilai dan rapor
- melihat absensi pribadi
- menyimpan portofolio hasil belajar
- mengakses layanan BK/konseling
- menerima pengumuman dan berkomunikasi dengan guru
- melihat tagihan dan riwayat pembayaran
- mengunduh dokumen pribadi seperti rapor dan sertifikat

Siswa **tidak memiliki akses untuk mengubah data akademik inti**, tetapi memiliki akses penuh terhadap aktivitas dan data pribadinya sendiri.

---

## 2. Struktur Sidebar Siswa

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
| 1 | Beranda | Dashboard Siswa, Notifikasi, Kalender Belajar |
| 2 | Akademik | Kelas Saya, Mata Pelajaran, Materi Belajar, Tugas Saya, Quiz/Ujian, Jadwal Pelajaran |
| 3 | Penilaian | Nilai Tugas, Nilai Ujian, Nilai Praktik, Rapor |
| 4 | Siswa | Absensi, Portofolio, BK/Konseling |
| 5 | Administrasi | Dokumen Siswa, Sertifikat |
| 6 | Keuangan | Tagihan, Status Pembayaran, Riwayat Pembayaran |
| 7 | Komunikasi | Forum Diskusi, Pesan, Pengumuman |
| 8 | Laporan | Progress Belajar, Rekap Kehadiran, Ringkasan Nilai |
| 9 | Pengaturan | Profil Akun, Ganti Password, Preferensi |

---

## 3. Tabel Lengkap Menu Siswa

| Kelompok Menu | Menu | Fungsi | Dummy Data yang Harus Ada |
|---|---|---|---|
| Beranda | Dashboard Siswa | Menampilkan ringkasan aktivitas belajar siswa | Kelas aktif: X RPL 1, tugas belum selesai: 3, quiz minggu ini: 2, rata-rata nilai: 82, kehadiran: 91% |
| Beranda | Notifikasi | Menampilkan notifikasi pembelajaran dan administrasi | “Tugas HTML deadline besok”, “Quiz Basis Data dimulai pukul 09:00”, “SPP Juli belum dibayar”, “Guru mengirim komentar pada tugas” |
| Beranda | Kalender Belajar | Menampilkan jadwal belajar dan deadline | Senin 07:00 Matematika, Selasa 10:00 Produktif RPL, deadline tugas 12 Agustus 2026 |
| Akademik | Kelas Saya | Menampilkan identitas kelas siswa | X RPL 1, wali kelas: Siti Rahma, S.Kom |
| Akademik | Mata Pelajaran | Menampilkan daftar mapel aktif | Matematika, Bahasa Indonesia, Bahasa Inggris, Produktif RPL, Basis Data |
| Akademik | Materi Belajar | Mengakses materi pembelajaran | Modul HTML Dasar, Video SQL Dasar, PDF Algoritma |
| Akademik | Tugas Saya | Melihat dan mengumpulkan tugas | Tugas Landing Page, Tugas ERD, Essay Algoritma |
| Akademik | Quiz / Ujian | Mengikuti quiz dan ujian online | Quiz HTML 20 soal, UTS Basis Data, latihan pilihan ganda |
| Akademik | Jadwal Pelajaran | Melihat jadwal pelajaran | Senin 07:00–08:30 Matematika, Selasa 08:30–10:00 Produktif RPL |
| Penilaian | Nilai Tugas | Melihat nilai tugas | Tugas Landing Page: 85, Tugas ERD: 78 |
| Penilaian | Nilai Ujian | Melihat nilai quiz/ujian | Quiz HTML: 81, UTS Basis Data: 79 |
| Penilaian | Nilai Praktik | Melihat nilai praktik | Praktik Form HTML: 88, Praktik Query SQL: 84 |
| Penilaian | Rapor | Melihat rapor semester | Semester Ganjil 2026/2027, rata-rata 82, peringkat kelas 7 |
| Siswa | Absensi | Melihat riwayat kehadiran pribadi | Hadir: 91%, izin: 3, sakit: 2, alpha: 1 |
| Siswa | Portofolio | Menyimpan hasil karya dan proyek | Website profil pribadi, desain UI sederhana, hasil query SQL |
| Siswa | BK / Konseling | Mengakses layanan BK | Ajukan konseling, lihat jadwal konseling, lihat status pengajuan |
| Administrasi | Dokumen Siswa | Mengakses dokumen pribadi | Kartu pelajar digital, rapor PDF, surat aktif sekolah |
| Administrasi | Sertifikat | Menyimpan sertifikat kegiatan atau prestasi | Sertifikat lomba coding, sertifikat seminar teknologi |
| Keuangan | Tagihan | Melihat tagihan aktif | SPP Juli 2026 Rp450.000, Praktikum Ganjil Rp150.000 |
| Keuangan | Status Pembayaran | Melihat status pembayaran | SPP Juli: belum lunas, UTS: lunas |
| Keuangan | Riwayat Pembayaran | Melihat riwayat transaksi | 08-07-2026 bayar SPP Juli Rp450.000 |
| Komunikasi | Forum Diskusi | Berpartisipasi dalam forum kelas/mapel | Forum HTML Dasar, forum tanya jawab tugas |
| Komunikasi | Pesan | Berkomunikasi dengan guru atau wali kelas | Pesan ke guru tentang revisi tugas, pesan ke wali kelas |
| Komunikasi | Pengumuman | Melihat pengumuman sekolah dan kelas | “Libur nasional”, “Deadline tugas diperpanjang”, “Jadwal ujian diperbarui” |
| Laporan | Progress Belajar | Melihat progres capaian belajar | 75% materi selesai, 80% tugas selesai, 2 remedial aktif |
| Laporan | Rekap Kehadiran | Melihat ringkasan kehadiran | Kehadiran semester ini 91% |
| Laporan | Ringkasan Nilai | Melihat ringkasan semua nilai | Rata-rata mapel umum 80, produktif 84 |
| Pengaturan | Profil Akun | Melihat dan mengubah data profil pribadi terbatas | Nama, email, no HP, foto profil |
| Pengaturan | Ganti Password | Mengubah password akun | Password terakhir diubah 30 hari lalu |
| Pengaturan | Preferensi | Mengatur preferensi tampilan dan notifikasi | Notifikasi deadline aktif, mode tampilan terang |

---

## 4. Dummy Data Minimum yang Harus Disiapkan

| Kategori | Dummy Minimum |
|---|---|
| User Siswa | 1 siswa |
| Data Kelas | 1 kelas |
| Mata Pelajaran | 5–10 mapel |
| Materi Belajar | 5–10 materi |
| Tugas | 3–5 tugas |
| Quiz/Ujian | 2–3 quiz/ujian |
| Nilai | 10–20 entri nilai |
| Absensi | 10–20 entri kehadiran |
| Portofolio | 2–5 karya |
| Pengajuan BK | 1–3 data |
| Dokumen Siswa | 3–5 dokumen |
| Sertifikat | 1–3 sertifikat |
| Tagihan | 2–5 tagihan |
| Riwayat Pembayaran | 2–5 transaksi |
| Forum Diskusi | 2–3 forum |
| Pengumuman | 5–10 pengumuman |
| Laporan | 3 laporan utama |

---

## 5. Contoh Dummy Data Konkret

### 5.1 Data Siswa

| Field | Dummy |
|---|---|
| Nama | Andi Saputra |
| NIS | 26001 |
| Kelas | X RPL 1 |
| Jurusan | Rekayasa Perangkat Lunak |
| Wali Kelas | Siti Rahma, S.Kom |
| Email | andi26001@student.smknusabangsa.sch.id |
| No HP | 081234567111 |

### 5.2 Data Mata Pelajaran

| Kode | Nama Mata Pelajaran |
|---|---|
| MTK | Matematika |
| BIN | Bahasa Indonesia |
| BIG | Bahasa Inggris |
| PRPL | Produktif RPL |
| BDT | Basis Data |

### 5.3 Data Materi Belajar

| Kode | Judul Materi | Tipe |
|---|---|---|
| MAT001 | Pengenalan HTML | PDF |
| MAT002 | Struktur Dasar Web | Video |
| MAT003 | Dasar SQL | PDF |
| MAT004 | Relasi Database | Video |

### 5.4 Data Tugas

| Kode | Judul Tugas | Status | Deadline |
|---|---|---|---|
| TGS001 | Membuat Landing Page Sederhana | Belum Selesai | 2026-08-12 |
| TGS002 | Membuat Tabel Database | Sudah Submit | 2026-08-15 |
| TGS003 | Essay Logika Pemrograman | Belum Selesai | 2026-08-18 |

### 5.5 Data Quiz/Ujian

| Kode | Nama | Status | Nilai |
|---|---|---|---|
| QZ001 | Quiz HTML Dasar | Selesai | 81 |
| QZ002 | UTS Basis Data | Selesai | 79 |
| QZ003 | Latihan SQL | Belum Dimulai | - |

### 5.6 Data Nilai

| Komponen | Nilai |
|---|---|
| Tugas Landing Page | 85 |
| Tugas ERD | 78 |
| Quiz HTML | 81 |
| UTS Basis Data | 79 |
| Praktik Form HTML | 88 |
| Praktik Query SQL | 84 |

### 5.7 Data Absensi

| Tanggal | Status |
|---|---|
| 2026-08-01 | Hadir |
| 2026-08-02 | Hadir |
| 2026-08-03 | Izin |
| 2026-08-04 | Hadir |
| 2026-08-05 | Alpha |

### 5.8 Data Portofolio

| Kode | Judul Karya | Tipe |
|---|---|---|
| PRT001 | Website Profil Pribadi | Web Project |
| PRT002 | Desain UI Login Page | Image |
| PRT003 | Hasil Query SQL Sederhana | Document |

### 5.9 Data BK / Konseling

| No | Jenis | Status | Jadwal |
|---|---|---|---|
| 1 | Konseling Akademik | Menunggu | 2026-08-20 09:00 |
| 2 | Konseling Pribadi | Selesai | 2026-07-15 10:00 |

### 5.10 Data Dokumen dan Sertifikat

| Kode | Nama Dokumen | Kategori |
|---|---|---|
| DOC001 | Kartu Pelajar Digital | Dokumen |
| DOC002 | Rapor Semester Ganjil 2026/2027 | Dokumen |
| DOC003 | Surat Aktif Sekolah | Dokumen |
| CRT001 | Sertifikat Lomba Coding | Sertifikat |
| CRT002 | Sertifikat Seminar Teknologi | Sertifikat |

### 5.11 Data Keuangan

| Jenis | Periode | Nominal | Status |
|---|---|---|---|
| SPP | Juli 2026 | 450000 | Belum Lunas |
| Praktikum | Ganjil 2026 | 150000 | Belum Lunas |
| UTS | Ganjil 2026 | 100000 | Lunas |

### 5.12 Riwayat Pembayaran

| Tanggal | Jenis | Nominal | Metode |
|---|---|---|---|
| 2026-07-08 | SPP Juni 2026 | 450000 | Transfer BCA |
| 2026-09-03 | UTS Ganjil 2026 | 100000 | QRIS |

---

## 6. Hak Akses Siswa Secara Umum

| Menu | Hak Akses |
|---|---|
| Beranda | View |
| Akademik | View, Create terbatas pada submit tugas/ujian |
| Penilaian | View |
| Siswa | View, Create/Edit terbatas pada portofolio dan pengajuan BK |
| Administrasi | View |
| Keuangan | View |
| Komunikasi | View, Create terbatas |
| Laporan | View |
| Pengaturan | View, Edit terbatas |

---

## 7. Permission Key Contoh untuk Developer

### 7.1 Akademik
- `student.class.view`
- `student.subject.view`
- `student.material.view`
- `student.assignment.view`
- `student.assignment.submit`
- `student.exam.view`
- `student.exam.submit`
- `student.schedule.view`

### 7.2 Penilaian
- `student.assignment_score.view`
- `student.exam_score.view`
- `student.practice_score.view`
- `student.report.view`

### 7.3 Siswa
- `student.attendance.view`
- `student.portfolio.view`
- `student.portfolio.create`
- `student.portfolio.edit`
- `student.counseling.view`
- `student.counseling.create`

### 7.4 Administrasi
- `student.document.view`
- `student.certificate.view`

### 7.5 Keuangan
- `student.bill.view`
- `student.payment_status.view`
- `student.payment_history.view`

### 7.6 Komunikasi
- `student.forum.view`
- `student.forum.create`
- `student.message.view`
- `student.message.create`
- `student.announcement.view`

### 7.7 Laporan
- `student.learning_progress.view`
- `student.attendance_recap.view`
- `student.score_summary.view`

### 7.8 Pengaturan
- `student.profile.view`
- `student.profile.edit`
- `student.password.edit`
- `student.preference.view`
- `student.preference.edit`

---

## 8. YAML Ringkas untuk Dibaca AI

```yaml
siswa:
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
    - dashboard_siswa
    - notifikasi
    - kalender_belajar

  akademik:
    - kelas_saya
    - mata_pelajaran
    - materi_belajar
    - tugas_saya
    - quiz_ujian
    - jadwal_pelajaran

  penilaian:
    - nilai_tugas
    - nilai_ujian
    - nilai_praktik
    - rapor

  siswa:
    - absensi
    - portofolio
    - bk_konseling

  administrasi:
    - dokumen_siswa
    - sertifikat

  keuangan:
    - tagihan
    - status_pembayaran
    - riwayat_pembayaran

  komunikasi:
    - forum_diskusi
    - pesan
    - pengumuman

  laporan:
    - progress_belajar
    - rekap_kehadiran
    - ringkasan_nilai

  pengaturan:
    - profil_akun
    - ganti_password
    - preferensi_akun