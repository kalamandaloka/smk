# Admin LMS SMK - Struktur Menu Lengkap + Dummy Data

Dokumen ini berisi struktur lengkap menu **Admin** untuk sistem LMS SMK, termasuk fungsi utama dan dummy data yang perlu tersedia pada tiap menu.

Admin di sini adalah **admin operasional sekolah/unit**, bukan superadmin global. Fokusnya pada pengelolaan data harian, operasional akademik, manajemen user sekolah, monitoring pembelajaran, dan dukungan administrasi sekolah.

---

## 1. Gambaran Peran Admin

Admin adalah role yang mengelola operasional harian di level sekolah/unit, mencakup:

- pengelolaan data akademik sekolah
- pengelolaan user sekolah
- pengelolaan kelas, jurusan, rombel, dan mapel
- monitoring pembelajaran
- dukungan administrasi sekolah
- monitoring penilaian
- monitoring absensi
- monitoring keuangan sekolah
- pengelolaan dokumen sekolah

Admin **tidak mengelola sistem global lintas yayasan**, tetapi fokus pada unit/sekolahnya sendiri.

---

## 2. Struktur Sidebar Admin

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
| 1 | Beranda | Dashboard Admin, Notifikasi, Kalender Akademik |
| 2 | Akademik | Tahun Ajaran, Semester, Jurusan, Kelas/Rombel, Mata Pelajaran, Jadwal Pelajaran, Jadwal Ujian, LMS Management |
| 3 | Penilaian | Ujian & Penilaian, Bank Soal, Rekap Nilai, Monitoring Input Nilai |
| 4 | Siswa | Data Siswa, Mutasi Siswa, Kenaikan Kelas, Data Kelas |
| 5 | Administrasi | Manajemen User, Data Guru & Staff, Arsip Dokumen, Approval Data, Pengaturan Sekolah |
| 6 | Keuangan | Monitoring Tagihan, Monitoring Pembayaran, Monitoring Tunggakan |
| 7 | Komunikasi | Pengumuman, Pesan Internal |
| 8 | Laporan | Laporan Akademik, Laporan Absensi, Laporan Keuangan, Laporan Pengguna |
| 9 | Pengaturan | Identitas Sekolah, Template Dokumen, Logo/Kop Rapor |

---

## 3. Tabel Lengkap Menu Admin

| Kelompok Menu | Menu | Fungsi | Dummy Data yang Harus Ada |
|---|---|---|---|
| Beranda | Dashboard Admin | Menampilkan ringkasan operasional sekolah | Total siswa: 780, total guru: 48, total kelas: 24, kelas aktif hari ini: 24, pembayaran bulan ini: Rp145.000.000, tunggakan aktif: Rp27.500.000 |
| Beranda | Notifikasi | Menampilkan notifikasi operasional sekolah | “3 guru belum input jurnal”, “12 siswa menunggak bulan ini”, “Jadwal ujian kelas XI belum final”, “2 akun siswa baru belum aktif” |
| Beranda | Kalender Akademik | Menampilkan agenda sekolah | MPLS 15 Juli 2026, UTS 10 Sept 2026, UAS 5 Des 2026, pembagian rapor 20 Des 2026 |
| Akademik | Tahun Ajaran | Mengelola tahun ajaran aktif di sekolah | 2025/2026 (inactive), 2026/2027 (active) |
| Akademik | Semester | Mengelola semester aktif | Semester Ganjil, Semester Genap |
| Akademik | Jurusan | Mengelola jurusan di sekolah | RPL, TKJ, Multimedia, Akuntansi, Tata Boga |
| Akademik | Kelas / Rombel | Mengelola kelas dan rombel | X RPL 1, X RPL 2, XI TKJ 1, XII MM 1 |
| Akademik | Mata Pelajaran | Mengelola mapel di sekolah | Matematika, Bahasa Indonesia, Bahasa Inggris, Produktif RPL, Produktif TKJ |
| Akademik | Jadwal Pelajaran | Menyusun jadwal belajar | Senin 07:00–08:30 Matematika X RPL 1, Selasa 08:30–10:00 Produktif TKJ XI TKJ 1 |
| Akademik | Jadwal Ujian | Menyusun jadwal ujian | UTS Matematika X RPL 1 - 10 Sept 2026, UAS Produktif TKJ XI TKJ 1 - 5 Des 2026 |
| Akademik | LMS Management | Mengatur struktur kelas digital | Kelas digital X RPL 1 aktif, kategori kursus produktif, forum kelas aktif |
| Penilaian | Ujian & Penilaian | Monitoring dan pengaturan penilaian | UTS aktif, 32 penilaian tugas berjalan, 10 penilaian belum selesai |
| Penilaian | Bank Soal | Menyimpan soal level sekolah | 120 soal Matematika, 80 soal Bahasa Inggris, 60 soal Produktif RPL |
| Penilaian | Rekap Nilai | Melihat hasil penilaian | Nilai rata-rata X RPL 1 = 82, XI TKJ 1 = 78 |
| Penilaian | Monitoring Input Nilai | Memantau keterlambatan input nilai | Guru Matematika belum input nilai kelas X RPL 2, Guru TKJ belum finalisasi UTS |
| Siswa | Data Siswa | Mengelola data siswa | NIS: 26001, Nama: Andi Saputra, Kelas: X RPL 1, Status: Aktif |
| Siswa | Mutasi Siswa | Mengelola siswa pindah masuk/keluar | Mutasi keluar: 2 siswa, mutasi masuk: 1 siswa |
| Siswa | Kenaikan Kelas | Mengatur naik kelas siswa | Andi Saputra dari X RPL 1 ke XI RPL 1 |
| Siswa | Data Kelas | Melihat komposisi tiap kelas | X RPL 1 = 32 siswa, X RPL 2 = 31 siswa |
| Administrasi | Manajemen User | Mengelola akun sekolah | admin_smk, kepsek_smk, guru_rpl01, bk_smk01, finance_smk, siswa_xrpl1_01 |
| Administrasi | Data Guru & Staff | Mengelola data guru dan staff | Guru: 48, BK: 2, Keuangan: 2, Staff Admin: 3 |
| Administrasi | Arsip Dokumen | Menyimpan dokumen sekolah | Surat aktif sekolah, dokumen akreditasi, SK pembagian tugas |
| Administrasi | Approval Data | Melakukan approval operasional tertentu | Approval perubahan data siswa, approval mutasi, approval jadwal |
| Administrasi | Pengaturan Sekolah | Mengatur data sekolah | Nama sekolah, alamat, email, nomor telepon, kepala sekolah, NPSN |
| Keuangan | Monitoring Tagihan | Melihat tagihan siswa | SPP Juli 2026, Praktikum Semester Ganjil, Ujian Tengah Semester |
| Keuangan | Monitoring Pembayaran | Melihat pembayaran masuk | 550 pembayaran berhasil, total Rp145.000.000 |
| Keuangan | Monitoring Tunggakan | Melihat tunggakan siswa | 68 siswa menunggak, tunggakan tertinggi Rp2.250.000 |
| Komunikasi | Pengumuman | Menyebarkan informasi sekolah | “Libur nasional”, “Batas input nilai”, “Perubahan jadwal kelas XII” |
| Komunikasi | Pesan Internal | Komunikasi antar user sekolah | Pesan ke guru, kepala sekolah, BK, keuangan |
| Laporan | Laporan Akademik | Rekap kegiatan akademik sekolah | Jumlah kelas aktif, keterisian jurnal, distribusi mapel |
| Laporan | Laporan Absensi | Rekap kehadiran siswa/guru | Kehadiran siswa 92%, kehadiran guru 96% |
| Laporan | Laporan Keuangan | Rekap pembayaran dan tunggakan | Total tagihan, total lunas, total tunggakan per kelas |
| Laporan | Laporan Pengguna | Statistik user sekolah | Login harian: 420 user, akun aktif: 812 |
| Pengaturan | Identitas Sekolah | Mengatur identitas sekolah | SMK Nusa Bangsa, NPSN 12345678, email sekolah |
| Pengaturan | Template Dokumen | Mengatur template dokumen sekolah | Template surat aktif, template surat mutasi, template cetak kartu ujian |
| Pengaturan | Logo / Kop Rapor | Mengatur branding dokumen sekolah | Logo sekolah, kop rapor, stempel digital |

---

## 4. Dummy Data Minimum yang Harus Disiapkan

| Kategori | Dummy Minimum |
|---|---|
| Sekolah / Unit | 1 sekolah |
| Tahun Ajaran | 2 tahun ajaran |
| Semester | 2 semester |
| Jurusan | 4–6 jurusan |
| Mata Pelajaran | 20–30 mapel |
| Kelas / Rombel | 12–24 kelas |
| User | 1 admin, 1 kepala sekolah, 10 guru, 20 siswa, 1 BK, 1 keuangan |
| Guru & Staff | 10–20 guru/staff |
| Data Siswa | 30–100 siswa |
| Jadwal Pelajaran | 1 minggu penuh |
| Jadwal Ujian | 1 periode ujian |
| Bank Soal | 30–50 soal |
| Data Tagihan | 3–5 jenis tagihan |
| Arsip Dokumen | 5 dokumen |
| Pengumuman | 5 pengumuman |
| Laporan | 4 jenis laporan dasar |

---

## 5. Contoh Dummy Data Konkret

### 5.1 Data Sekolah

| Field | Dummy |
|---|---|
| Nama Sekolah | SMK Nusa Bangsa |
| Kode Sekolah | SMKNB01 |
| NPSN | 12345678 |
| Email | info@smknusabangsa.sch.id |
| Telepon | 021-7778899 |
| Kepala Sekolah | Budi Santoso, M.Pd |
| Akreditasi | A |

### 5.2 Data User

| Username | Role | Unit |
|---|---|---|
| admin_smk | Admin | SMK Nusa Bangsa |
| kepsek_smk | Kepala Sekolah | SMK Nusa Bangsa |
| guru_rpl01 | Guru | SMK Nusa Bangsa |
| walikelas_xrpl1 | Guru | SMK Nusa Bangsa |
| bk_smk01 | BK | SMK Nusa Bangsa |
| finance_smk | Keuangan | SMK Nusa Bangsa |
| siswa_xrpl1_01 | Siswa | SMK Nusa Bangsa |

### 5.3 Data Jurusan

| Kode | Nama Jurusan |
|---|---|
| RPL | Rekayasa Perangkat Lunak |
| TKJ | Teknik Komputer dan Jaringan |
| MM | Multimedia |
| AKL | Akuntansi dan Keuangan Lembaga |
| TBG | Tata Boga |

### 5.4 Data Kelas

| Kode Kelas | Nama Kelas | Jurusan | Wali Kelas |
|---|---|---|---|
| XRPL1 | X RPL 1 | RPL | Siti Rahma, S.Kom |
| XRPL2 | X RPL 2 | RPL | Dedi Kurniawan, S.Kom |
| XITKJ1 | XI TKJ 1 | TKJ | Ahmad Fauzi, S.Kom |
| XIIMM1 | XII MM 1 | MM | Rina Puspita, S.Sn |

### 5.5 Data Mata Pelajaran

| Kode | Nama Mata Pelajaran |
|---|---|
| MTK | Matematika |
| BIN | Bahasa Indonesia |
| BIG | Bahasa Inggris |
| PRPL | Produktif RPL |
| PTKJ | Produktif TKJ |

### 5.6 Data Tagihan

| Kode | Nama Tagihan | Frekuensi | Nominal |
|---|---|---|---|
| SPP | SPP Bulanan | Bulanan | 450000 |
| PRK | Praktikum | Semester | 150000 |
| UTS | Ujian Tengah Semester | Semester | 100000 |
| UAS | Ujian Akhir Semester | Semester | 125000 |

---

## 6. Hak Akses Admin Secara Umum

| Menu | Hak Akses |
|---|---|
| Beranda | View |
| Akademik | View, Create, Edit |
| Penilaian | View, Create, Edit |
| Siswa | View, Create, Edit, Approve terbatas |
| Administrasi | View, Create, Edit, Delete terbatas, Approve terbatas |
| Keuangan | View |
| Komunikasi | View, Create, Edit, Delete, Approve terbatas |
| Laporan | View |
| Pengaturan | View, Edit |

---

## 7. Permission Key Contoh untuk Developer

### 7.1 Akademik
- `academic.year.view`
- `academic.year.create`
- `academic.year.edit`

- `academic.class.view`
- `academic.class.create`
- `academic.class.edit`

- `academic.schedule.view`
- `academic.schedule.create`
- `academic.schedule.edit`
- `academic.schedule.approve`

### 7.2 Penilaian
- `assessment.exam.view`
- `assessment.exam.create`
- `assessment.exam.edit`

- `assessment.bank_question.view`
- `assessment.bank_question.create`
- `assessment.bank_question.edit`
- `assessment.bank_question.delete`

- `assessment.score_recap.view`

### 7.3 Siswa
- `student.data.view`
- `student.data.create`
- `student.data.edit`

- `student.mutation.view`
- `student.mutation.create`
- `student.mutation.edit`
- `student.mutation.approve`

- `student.promotion.view`
- `student.promotion.create`
- `student.promotion.edit`
- `student.promotion.approve`

### 7.4 Administrasi
- `admin.user.view`
- `admin.user.create`
- `admin.user.edit`
- `admin.user.delete`

- `admin.staff.view`
- `admin.staff.create`
- `admin.staff.edit`

- `admin.document.view`
- `admin.document.create`
- `admin.document.edit`
- `admin.document.delete`

### 7.5 Keuangan
- `finance.bill_monitor.view`
- `finance.payment_monitor.view`
- `finance.arrears_monitor.view`

### 7.6 Komunikasi
- `communication.announcement.view`
- `communication.announcement.create`
- `communication.announcement.edit`
- `communication.announcement.delete`
- `communication.announcement.approve`

- `communication.message.view`
- `communication.message.create`

### 7.7 Pengaturan
- `school.profile.view`
- `school.profile.edit`

- `school.document_template.view`
- `school.document_template.create`
- `school.document_template.edit`

- `school.branding.view`
- `school.branding.edit`

---

## 8. YAML Ringkas untuk Dibaca AI

```yaml
admin:
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
    - dashboard_admin
    - notifikasi
    - kalender_akademik

  akademik:
    - tahun_ajaran
    - semester
    - jurusan
    - kelas_rombel
    - mata_pelajaran
    - jadwal_pelajaran
    - jadwal_ujian
    - lms_management

  penilaian:
    - ujian_dan_penilaian
    - bank_soal
    - rekap_nilai
    - monitoring_input_nilai

  siswa:
    - data_siswa
    - mutasi_siswa
    - kenaikan_kelas
    - data_kelas

  administrasi:
    - manajemen_user
    - data_guru_staff
    - arsip_dokumen
    - approval_data
    - pengaturan_sekolah

  keuangan:
    - monitoring_tagihan
    - monitoring_pembayaran
    - monitoring_tunggakan

  komunikasi:
    - pengumuman
    - pesan_internal

  laporan:
    - laporan_akademik
    - laporan_absensi
    - laporan_keuangan
    - laporan_pengguna

  pengaturan:
    - identitas_sekolah
    - template_dokumen
    - logo_kop_rapor