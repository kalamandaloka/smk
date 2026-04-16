# Guru LMS SMK - Struktur Menu Lengkap + Dummy Data

Dokumen ini berisi struktur lengkap menu **Guru** untuk sistem LMS SMK, termasuk fungsi utama dan dummy data yang perlu tersedia pada tiap menu.

Guru di sini adalah role **pengajar utama** yang berfokus pada proses belajar mengajar, pengelolaan materi, tugas, ujian, penilaian, absensi, komunikasi dengan siswa, serta dokumentasi pembelajaran.

---

## 1. Gambaran Peran Guru

Guru adalah role yang berfungsi untuk:

- mengelola kelas yang diajar
- mengelola mata pelajaran yang diampu
- mengunggah materi pembelajaran
- membuat tugas, quiz, dan ujian
- mengisi absensi kelas
- menginput nilai siswa
- melakukan remedial dan pengayaan
- memantau perkembangan siswa di kelas yang diajar
- berkomunikasi dengan siswa
- menyusun jurnal mengajar dan dokumen ajar

Guru **tidak mengelola sistem sekolah secara administratif**, tetapi memiliki kontrol penuh atas proses pembelajaran pada kelas dan mapel yang diampu.

---

## 2. Struktur Sidebar Guru

### 2.1 Kelompok Menu

1. Beranda
2. Akademik
3. Penilaian
4. Siswa
5. Administrasi
6. Komunikasi
7. Laporan
8. Pengaturan

### 2.2 Struktur Sidebar Detail

| Urutan | Kelompok Menu | Isi |
|---|---|---|
| 1 | Beranda | Dashboard Guru, Notifikasi, Kalender Mengajar |
| 2 | Akademik | Kelas Saya, Mata Pelajaran Saya, Materi Pembelajaran, Tugas, Quiz/Ujian, Jurnal Mengajar, Absensi Kelas |
| 3 | Penilaian | Nilai Tugas, Nilai Ujian, Nilai Praktik, Remedial |
| 4 | Siswa | Daftar Siswa Kelas Ajar, Portofolio Siswa, Catatan Siswa |
| 5 | Administrasi | Dokumen Ajar |
| 6 | Komunikasi | Forum Diskusi, Pesan, Pengumuman Kelas |
| 7 | Laporan | Laporan Kelas, Rekap Nilai, Rekap Kehadiran |
| 8 | Pengaturan | Profil Akun, Preferensi Mengajar |

---

## 3. Tabel Lengkap Menu Guru

| Kelompok Menu | Menu | Fungsi | Dummy Data yang Harus Ada |
|---|---|---|---|
| Beranda | Dashboard Guru | Menampilkan ringkasan aktivitas mengajar | Total kelas diampu: 4, total siswa: 128, tugas belum dinilai: 18, quiz aktif: 3, absensi hari ini: 2 kelas |
| Beranda | Notifikasi | Menampilkan notifikasi pembelajaran | “12 tugas baru masuk”, “Quiz XI RPL 1 dimulai besok”, “2 siswa belum submit tugas”, “Deadline jurnal mengajar hari ini” |
| Beranda | Kalender Mengajar | Menampilkan jadwal mengajar dan deadline | Senin 07:00 X RPL 1, Selasa 10:00 XI TKJ 1, deadline input nilai 30 Sept 2026 |
| Akademik | Kelas Saya | Menampilkan daftar kelas yang diajar | X RPL 1, X RPL 2, XI RPL 1, XI TKJ 1 |
| Akademik | Mata Pelajaran Saya | Menampilkan mapel yang diampu | Produktif RPL, Dasar Pemrograman, Basis Data |
| Akademik | Materi Pembelajaran | Mengelola materi pembelajaran | Modul 1 HTML Dasar, Video Basis Data, PDF Algoritma Pemrograman |
| Akademik | Tugas | Mengelola tugas siswa | Tugas membuat landing page, tugas ERD sederhana, tugas essay algoritma |
| Akademik | Quiz / Ujian | Mengelola quiz dan ujian | Quiz HTML 20 soal, UTS Basis Data, latihan pilihan ganda |
| Akademik | Jurnal Mengajar | Mencatat aktivitas pembelajaran tiap pertemuan | Pertemuan 1: pengenalan HTML, pertemuan 2: struktur dasar halaman web |
| Akademik | Absensi Kelas | Mengelola kehadiran siswa per pertemuan | X RPL 1 hadir 30, izin 1, sakit 1 |
| Penilaian | Nilai Tugas | Menginput nilai tugas | Andi: 85, Budi: 78, Citra: 92 |
| Penilaian | Nilai Ujian | Menginput nilai quiz/ujian | Quiz HTML rata-rata 81, UTS Basis Data rata-rata 79 |
| Penilaian | Nilai Praktik | Menilai kegiatan praktik | Praktik membuat form HTML, praktik query database |
| Penilaian | Remedial | Mengelola remedial dan pengayaan | 8 siswa remedial quiz HTML, 4 siswa pengayaan basis data |
| Siswa | Daftar Siswa Kelas Ajar | Menampilkan siswa pada kelas yang diajar | X RPL 1: 32 siswa, XI TKJ 1: 31 siswa |
| Siswa | Portofolio Siswa | Melihat hasil karya siswa | Website profil siswa, file desain UI, hasil query SQL |
| Siswa | Catatan Siswa | Menyimpan catatan akademik siswa | “Andi aktif bertanya”, “Budi perlu pendampingan logika” |
| Administrasi | Dokumen Ajar | Menyimpan perangkat ajar | Modul ajar semester ganjil, ATP, rubrik penilaian, bahan presentasi |
| Komunikasi | Forum Diskusi | Mengelola diskusi kelas/mapel | Forum HTML Dasar, forum tanya jawab tugas basis data |
| Komunikasi | Pesan | Komunikasi dengan siswa | Pesan ke siswa tentang revisi tugas, pengingat quiz |
| Komunikasi | Pengumuman Kelas | Menyampaikan info kelas/mapel | “Quiz dimulai pukul 09:00”, “Deadline tugas diperpanjang” |
| Laporan | Laporan Kelas | Melihat ringkasan performa kelas | X RPL 1 rata-rata 82, XI TKJ 1 rata-rata 78 |
| Laporan | Rekap Nilai | Melihat rekap semua nilai | Rekap tugas, quiz, ujian, praktik |
| Laporan | Rekap Kehadiran | Melihat rekap absensi siswa | Kehadiran X RPL 1 93%, XI TKJ 1 89% |
| Pengaturan | Profil Akun | Mengelola profil guru | Nama, email, nomor HP, NIP, foto profil |
| Pengaturan | Preferensi Mengajar | Mengatur preferensi tampilan dan pembelajaran | Tampilan jadwal mingguan, default kelas favorit, notifikasi deadline aktif |

---

## 4. Dummy Data Minimum yang Harus Disiapkan

| Kategori | Dummy Minimum |
|---|---|
| User Guru | 1 guru |
| Mata Pelajaran | 2–3 mapel |
| Kelas Diampu | 2–4 kelas |
| Siswa di Kelas | 20–40 siswa |
| Materi Pembelajaran | 5–10 materi |
| Tugas | 3–5 tugas |
| Quiz/Ujian | 2–3 quiz/ujian |
| Jurnal Mengajar | 5–10 entri |
| Absensi | 5–10 pertemuan |
| Nilai | 20–40 entri nilai |
| Remedial | 5–10 entri |
| Catatan Siswa | 5–10 catatan |
| Forum Diskusi | 2–3 forum |
| Pengumuman Kelas | 3–5 pengumuman |
| Dokumen Ajar | 5–10 dokumen |
| Laporan | 3 laporan utama |

---

## 5. Contoh Dummy Data Konkret

### 5.1 Data Guru

| Field | Dummy |
|---|---|
| Nama | Siti Rahma, S.Kom |
| NIP | 198706122015042001 |
| Email | siti.rahma@smknusabangsa.sch.id |
| No HP | 081234567890 |
| Mapel Utama | Produktif RPL |

### 5.2 Data Kelas Diampu

| Kode Kelas | Nama Kelas | Jumlah Siswa |
|---|---|---|
| XRPL1 | X RPL 1 | 32 |
| XRPL2 | X RPL 2 | 31 |
| XIRPL1 | XI RPL 1 | 33 |
| XITKJ1 | XI TKJ 1 | 32 |

### 5.3 Data Mata Pelajaran

| Kode | Nama Mata Pelajaran |
|---|---|
| PRPL | Produktif RPL |
| DPM | Dasar Pemrograman |
| BDT | Basis Data |

### 5.4 Data Materi

| Kode | Judul Materi | Tipe |
|---|---|---|
| MAT001 | Pengenalan HTML | PDF |
| MAT002 | Struktur Dasar Web | Video |
| MAT003 | Form HTML | Slide |
| MAT004 | Dasar SQL | PDF |
| MAT005 | Relasi Database | Video |

### 5.5 Data Tugas

| Kode | Judul Tugas | Kelas | Deadline |
|---|---|---|---|
| TGS001 | Membuat Landing Page Sederhana | X RPL 1 | 2026-08-12 |
| TGS002 | Membuat Tabel Database | XI RPL 1 | 2026-08-15 |
| TGS003 | Essay Logika Pemrograman | X RPL 2 | 2026-08-18 |

### 5.6 Data Quiz/Ujian

| Kode | Nama | Kelas | Jenis |
|---|---|---|---|
| QZ001 | Quiz HTML Dasar | X RPL 1 | Quiz |
| QZ002 | UTS Basis Data | XI RPL 1 | UTS |
| QZ003 | Latihan SQL | XI TKJ 1 | Quiz |

### 5.7 Data Nilai

| Nama Siswa | Kelas | Komponen | Nilai |
|---|---|---|---|
| Andi Saputra | X RPL 1 | Tugas Landing Page | 85 |
| Budi Hartono | X RPL 1 | Quiz HTML | 78 |
| Citra Lestari | XI RPL 1 | UTS Basis Data | 92 |

### 5.8 Data Absensi

| Tanggal | Kelas | Hadir | Izin | Sakit | Alpha |
|---|---|---|---|---|---|
| 2026-08-01 | X RPL 1 | 30 | 1 | 1 | 0 |
| 2026-08-02 | XI RPL 1 | 31 | 0 | 1 | 1 |

### 5.9 Data Catatan Siswa

| Nama Siswa | Kelas | Catatan |
|---|---|---|
| Andi Saputra | X RPL 1 | Aktif bertanya saat praktik |
| Budi Hartono | X RPL 1 | Perlu pendampingan saat menyusun query |
| Citra Lestari | XI RPL 1 | Sangat baik dalam tugas proyek |

### 5.10 Dokumen Ajar

| Kode | Nama Dokumen | Kategori |
|---|---|---|
| DOC001 | Modul Ajar HTML Dasar | Modul |
| DOC002 | ATP Semester Ganjil | Perangkat Ajar |
| DOC003 | Rubrik Penilaian Praktik Web | Penilaian |
| DOC004 | Presentasi Basis Data | Bahan Ajar |

---

## 6. Hak Akses Guru Secara Umum

| Menu | Hak Akses |
|---|---|
| Beranda | View |
| Akademik | View, Create, Edit, Delete terbatas |
| Penilaian | View, Create, Edit |
| Siswa | View, Create, Edit terbatas |
| Administrasi | View, Create, Edit, Delete terbatas |
| Komunikasi | View, Create, Edit, Delete terbatas |
| Laporan | View |
| Pengaturan | View, Edit |

---

## 7. Permission Key Contoh untuk Developer

### 7.1 Akademik
- `teacher.class.view`
- `teacher.subject.view`
- `teacher.material.view`
- `teacher.material.create`
- `teacher.material.edit`
- `teacher.material.delete`
- `teacher.assignment.view`
- `teacher.assignment.create`
- `teacher.assignment.edit`
- `teacher.assignment.delete`
- `teacher.exam.view`
- `teacher.exam.create`
- `teacher.exam.edit`
- `teacher.exam.delete`
- `teacher.journal.view`
- `teacher.journal.create`
- `teacher.journal.edit`
- `teacher.attendance.view`
- `teacher.attendance.create`
- `teacher.attendance.edit`

### 7.2 Penilaian
- `teacher.score_assignment.view`
- `teacher.score_assignment.create`
- `teacher.score_assignment.edit`
- `teacher.score_exam.view`
- `teacher.score_exam.create`
- `teacher.score_exam.edit`
- `teacher.score_practice.view`
- `teacher.score_practice.create`
- `teacher.score_practice.edit`
- `teacher.remedial.view`
- `teacher.remedial.create`
- `teacher.remedial.edit`

### 7.3 Siswa
- `teacher.student_list.view`
- `teacher.student_portfolio.view`
- `teacher.student_note.view`
- `teacher.student_note.create`
- `teacher.student_note.edit`

### 7.4 Administrasi
- `teacher.document.view`
- `teacher.document.create`
- `teacher.document.edit`
- `teacher.document.delete`

### 7.5 Komunikasi
- `teacher.forum.view`
- `teacher.forum.create`
- `teacher.forum.edit`
- `teacher.forum.delete`
- `teacher.message.view`
- `teacher.message.create`
- `teacher.announcement.view`
- `teacher.announcement.create`
- `teacher.announcement.edit`
- `teacher.announcement.delete`

### 7.6 Laporan
- `teacher.class_report.view`
- `teacher.score_recap.view`
- `teacher.attendance_recap.view`

### 7.7 Pengaturan
- `teacher.profile.view`
- `teacher.profile.edit`
- `teacher.preference.view`
- `teacher.preference.edit`

---

## 8. YAML Ringkas untuk Dibaca AI

```yaml
guru:
  sidebar:
    - beranda
    - akademik
    - penilaian
    - siswa
    - administrasi
    - komunikasi
    - laporan
    - pengaturan

  beranda:
    - dashboard_guru
    - notifikasi
    - kalender_mengajar

  akademik:
    - kelas_saya
    - mata_pelajaran_saya
    - materi_pembelajaran
    - tugas
    - quiz_ujian
    - jurnal_mengajar
    - absensi_kelas

  penilaian:
    - nilai_tugas
    - nilai_ujian
    - nilai_praktik
    - remedial

  siswa:
    - daftar_siswa_kelas_ajar
    - portofolio_siswa
    - catatan_siswa

  administrasi:
    - dokumen_ajar

  komunikasi:
    - forum_diskusi
    - pesan
    - pengumuman_kelas

  laporan:
    - laporan_kelas
    - rekap_nilai
    - rekap_kehadiran

  pengaturan:
    - profil_akun
    - preferensi_mengajar