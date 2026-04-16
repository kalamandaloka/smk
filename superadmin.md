# Superadmin LMS SMK - Struktur Menu Lengkap + Dummy Data

Dokumen ini berisi struktur lengkap menu **Superadmin** untuk sistem LMS SMK multi-sekolah / multi-unit, termasuk fungsi utama dan dummy data yang perlu tersedia pada tiap menu.

---

## 1. Gambaran Peran Superadmin

Superadmin adalah role tertinggi yang mengelola seluruh ekosistem platform, mencakup:

- multi-yayasan / multi-sekolah
- master akademik global
- role dan permission
- monitoring operasional
- approval strategis
- pengaturan sistem
- audit dan keamanan
- laporan lintas unit

---

## 2. Struktur Sidebar Superadmin

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
| 1 | Beranda | Dashboard Global, Notifikasi, Kalender Akademik Global |
| 2 | Akademik | Tahun Ajaran, Semester, Kurikulum, Jenjang, Jurusan, Mata Pelajaran, Fase/Tingkat, Rombel Template, Kalender Template |
| 3 | Penilaian | Sistem Penilaian, Template Rapor, Predikat Nilai, Jenis Penilaian, KKM/Ketuntasan, Bank Soal Global, Aturan Kelulusan |
| 4 | Siswa | Status Siswa, Data Siswa Global, Prestasi, Pelanggaran, Tata Tertib, Alumni & Mutasi |
| 5 | Administrasi | Yayasan, Sekolah/Unit, Profil Sekolah, User, Role, Subrole, Permission, SDM, Jabatan, Dokumen, Approval, Audit Log, Arsip Global |
| 6 | Keuangan | Jenis Biaya, Struktur Biaya, Template Tagihan, Monitoring Pembayaran, Tunggakan, Diskon/Beasiswa, Payment Settings, Rekap Pemasukan |
| 7 | Komunikasi | Pengumuman Global, Pesan Internal, Template Notifikasi, Email/WhatsApp Gateway, Helpdesk |
| 8 | Laporan | Akademik, User, Siswa, Guru & Staff, Penilaian, Keuangan, Aktivitas Sistem, Executive Analytics |
| 9 | Pengaturan | Branding, Pengaturan Umum, Domain/Subdomain, Integrasi, Backup, Keamanan, Konfigurasi Menu, Feature Toggle, API & Webhook, Error Monitoring |

---

## 3. Tabel Lengkap Menu Superadmin

| Kelompok Menu | Menu | Fungsi | Dummy Data yang Harus Ada |
|---|---|---|---|
| Beranda | Dashboard Global | Menampilkan ringkasan seluruh sistem | Total sekolah: 3, total user: 2.450, total siswa aktif: 2.100, total guru: 180, total kelas: 72, total pembayaran bulan ini: Rp425.000.000, total tunggakan: Rp73.500.000 |
| Beranda | Notifikasi Sistem | Menampilkan notifikasi penting lintas unit | “SMK Nusa Bangsa belum finalisasi jadwal”, “20 siswa menunggak > 60 hari”, “Backup berhasil”, “5 user gagal login berulang” |
| Beranda | Kalender Akademik Global | Menampilkan agenda besar seluruh unit | Tahun ajaran 2026/2027, MPLS 15 Juli 2026, UTS 10 Sept 2026, UAS 5 Des 2026, pembagian rapor 20 Des 2026 |
| Akademik | Master Tahun Ajaran | Mengelola tahun ajaran aktif/nonaktif | 2025/2026 (inactive), 2026/2027 (active) |
| Akademik | Master Semester | Mengelola semester global | Semester Ganjil, Semester Genap |
| Akademik | Master Kurikulum | Menentukan kurikulum yang dipakai sekolah | Kurikulum Merdeka SMK, Kurikulum Internal Yayasan, Kurikulum Industri Mitra |
| Akademik | Master Jenjang | Mengelola jenjang pendidikan | SMK, SMA, SMP |
| Akademik | Master Jurusan / Program Keahlian | Menentukan daftar jurusan | RPL, TKJ, Multimedia, Akuntansi, Tata Boga, Tata Busana, Teknik Kendaraan Ringan |
| Akademik | Master Mata Pelajaran | Menentukan mapel global | Matematika, Bahasa Indonesia, Bahasa Inggris, Produktif RPL, Produktif TKJ, Projek P5 |
| Akademik | Master Fase / Tingkat | Menentukan tingkat/fase belajar | Kelas X, Kelas XI, Kelas XII |
| Akademik | Master Rombel Template | Menyediakan template struktur kelas | X RPL 1, X RPL 2, XI TKJ 1, XII MM 1 |
| Akademik | Master Kalender Template | Template kalender akademik | Kalender SMK Reguler, Kalender Boarding, Kalender Industri Intensif |
| Penilaian | Master Sistem Penilaian | Mengatur komponen penilaian | Pengetahuan 30%, Keterampilan 50%, Sikap 20% |
| Penilaian | Template Rapor | Template rapor global | Template Rapor SMK A4 Portrait, Template eRapor Yayasan |
| Penilaian | Master Predikat Nilai | Mengatur rentang predikat | A: 90–100, B: 80–89, C: 70–79, D: <70 |
| Penilaian | Master Jenis Penilaian | Menentukan tipe penilaian | Tugas Harian, Quiz, UTS, UAS, Praktik, Proyek, Portofolio, Observasi Sikap |
| Penilaian | Aturan KKM / Ketuntasan | Menentukan batas lulus | KKM Umum 75, KKM Produktif 78 |
| Penilaian | Master Bank Soal Global | Menyediakan soal yang bisa diwariskan ke sekolah | 500 soal Matematika, 300 soal Bahasa Inggris, 250 soal TKJ Dasar |
| Penilaian | Aturan Kelulusan | Menentukan syarat naik kelas/lulus | Minimal kehadiran 80%, nilai rata-rata 75, tidak ada tunggakan administrasi tertentu |
| Siswa | Master Status Siswa | Menentukan status siswa | Aktif, Cuti, Mutasi Masuk, Mutasi Keluar, Alumni, Dropout |
| Siswa | Master Data Siswa Global | Monitoring siswa lintas sekolah | NIS: 26001, Nama: Andi Saputra, Sekolah: SMK Nusa Bangsa, Jurusan: RPL, Status: Aktif |
| Siswa | Master Kategori Prestasi | Klasifikasi prestasi | Akademik, Non Akademik, Lomba, Sertifikasi |
| Siswa | Master Kategori Pelanggaran | Kategori disiplin siswa | Ringan, Sedang, Berat |
| Siswa | Master Tata Tertib | Aturan umum siswa | Terlambat = 5 poin, Alpha = 10 poin, Merokok = 25 poin |
| Siswa | Alumni & Mutasi | Mengelola siswa lulus / pindah | Alumni 2025: 320 siswa, mutasi keluar: 12 siswa, mutasi masuk: 8 siswa |
| Administrasi | Manajemen Yayasan | Mengelola data yayasan induk | Nama yayasan: Yayasan Pendidikan Nusantara, alamat, NPWP, logo yayasan |
| Administrasi | Manajemen Sekolah / Unit | Mengelola unit sekolah | SMK Nusa Bangsa, SMA Nusa Bangsa, SMP Nusa Bangsa |
| Administrasi | Profil Sekolah | Menyimpan identitas tiap unit | NPSN, alamat, email, nomor telepon, kepala sekolah, status akreditasi |
| Administrasi | Manajemen User | Mengelola seluruh akun | superadmin1, admin_smk, kepsek_smk, guru_rpl01, siswa_xrpl01_01 |
| Administrasi | Role Management | Daftar role utama | superadmin, admin, ketuayayasan, kepalasekolah, guru, siswa, bk, keuangan |
| Administrasi | Subrole Management | Daftar subrole khusus guru | matapelajaran, walikelas, kurikulum, kesiswaan |
| Administrasi | Permission Management | Mengatur hak akses detail | academic.class.view, academic.schedule.create, finance.bill.approve |
| Administrasi | Master SDM | Data guru dan staff global | Guru: 180, BK: 6, Keuangan: 5, Admin: 7 |
| Administrasi | Master Jabatan | Data posisi organisasi | Ketua Yayasan, Kepala Sekolah, Wakasek Kurikulum, Guru, BK, Staff Keuangan |
| Administrasi | Master Dokumen | Template dokumen resmi | Kop surat yayasan, template surat aktif, template surat mutasi |
| Administrasi | Approval Center | Persetujuan data penting | Approval jadwal, approval rapor, approval struktur biaya, approval kegiatan |
| Administrasi | Audit Log | Histori aktivitas user | “Admin SMK edit data siswa”, “Guru RPL upload nilai”, “Keuangan approve pembayaran” |
| Administrasi | Arsip Global | Penyimpanan dokumen lintas unit | SOP akademik, panduan LMS, kebijakan yayasan, SK pengangkatan |
| Keuangan | Master Jenis Biaya | Mengatur daftar biaya yang berlaku | SPP, Uang Pangkal, Ujian, Praktikum, Seragam, Study Tour |
| Keuangan | Struktur Biaya Global | Template nominal biaya | SPP SMK Rp450.000/bulan, Praktikum TKJ Rp150.000/semester |
| Keuangan | Template Tagihan | Pola tagihan bulanan/tahunan | Tagihan bulanan SPP, tagihan semester praktik, tagihan tahunan daftar ulang |
| Keuangan | Monitoring Pembayaran Global | Monitoring pembayaran lintas sekolah | Total tagihan bulan ini Rp500.000.000, lunas Rp425.000.000 |
| Keuangan | Monitoring Tunggakan | Monitoring piutang siswa | 145 siswa menunggak, tunggakan terbesar Rp4.500.000 |
| Keuangan | Master Diskon / Beasiswa | Mengatur potongan biaya | Beasiswa Prestasi 50%, Keringanan yatim 25%, Diskon saudara kandung 10% |
| Keuangan | Payment Channel Settings | Mengatur metode pembayaran | Transfer BCA, Mandiri VA, QRIS Yayasan |
| Keuangan | Rekap Pemasukan Unit | Ringkasan cashflow per sekolah | SMK Rp250.000.000, SMA Rp120.000.000, SMP Rp55.000.000 |
| Komunikasi | Pengumuman Global | Broadcast ke seluruh unit | “Libur nasional”, “Migrasi server Sabtu 22.00”, “Penutupan input nilai 30 Juni” |
| Komunikasi | Pesan Internal | Komunikasi antar role | Pesan ke admin sekolah, ke kepala sekolah, ke keuangan |
| Komunikasi | Template Notifikasi | Template pesan otomatis | Notifikasi tagihan jatuh tempo, notifikasi tugas baru, notifikasi approval |
| Komunikasi | Email / WhatsApp Gateway | Pengiriman notifikasi eksternal | Template WA tunggakan, email aktivasi akun, email reset password |
| Komunikasi | Helpdesk / Ticketing | Mengelola masalah sistem | Tiket #1001 “Tidak bisa upload nilai”, tiket #1002 “Tagihan ganda” |
| Laporan | Laporan Akademik Global | Rekap performa akademik lintas unit | Rata-rata nilai per sekolah, jumlah kelas aktif, keterisian jurnal guru |
| Laporan | Laporan User | Statistik pengguna | User aktif harian: 1.245, login mingguan: 2.010 |
| Laporan | Laporan Siswa | Statistik siswa | Jumlah aktif per jurusan, mutasi, alumni, tingkat kehadiran |
| Laporan | Laporan Guru & Staff | Statistik SDM | Kehadiran guru, jumlah wali kelas, distribusi beban mengajar |
| Laporan | Laporan Penilaian | Statistik nilai dan ketuntasan | Persentase siswa tuntas, mapel dengan remedial tertinggi |
| Laporan | Laporan Keuangan | Pemasukan, tunggakan, pelunasan | Laporan bulanan yayasan, laporan per unit, laporan per jenis biaya |
| Laporan | Laporan Aktivitas Sistem | Aktivitas sistem dan operasional | login count, upload materi, create class, update fee |
| Laporan | Executive Analytics | Dashboard manajemen | sekolah terbaik berdasarkan kehadiran, jurusan dengan tunggakan tertinggi |
| Pengaturan | Branding Sistem | Mengatur tampilan platform | Logo yayasan, nama platform “NalarEdu”, favicon, warna utama biru |
| Pengaturan | Pengaturan Umum Sistem | Parameter global | timezone Asia/Jakarta, bahasa Indonesia, format tanggal dd-mm-yyyy |
| Pengaturan | Pengaturan Domain / Subdomain | Mengatur domain multi-tenant | smk.nalaredu.id, sma.nalaredu.id, yayasan.nalaredu.id |
| Pengaturan | Integrasi Sistem | Integrasi pihak ketiga | Midtrans, SMTP Gmail, WhatsApp gateway, Google Meet |
| Pengaturan | Backup & Restore | Pengelolaan backup data | backup harian 02:00, restore point 7 hari terakhir |
| Pengaturan | Keamanan Sistem | Kebijakan keamanan | password minimal 8 karakter, 2FA off, session timeout 30 menit |
| Pengaturan | Master Konfigurasi Menu | Kontrol tampilan menu per role | Role guru tidak melihat menu keuangan, siswa hanya melihat menu sendiri |
| Pengaturan | Feature Toggle | Aktif/nonaktif modul | Modul PKL aktif, modul AR/VR nonaktif, modul alumni aktif |
| Pengaturan | API & Webhook | Integrasi teknis | API key sandbox, webhook pembayaran aktif |
| Pengaturan | Log System / Error Monitoring | Monitoring error teknis | Error login, timeout upload file, webhook failed |

---

## 4. Dummy Data Minimum yang Harus Disiapkan

| Kategori | Dummy Minimum |
|---|---|
| Yayasan | 1 yayasan |
| Sekolah / Unit | 2–3 sekolah |
| Tahun Ajaran | 2 tahun ajaran |
| Semester | 2 semester |
| Jenjang | 3 jenjang |
| Jurusan | 5–7 jurusan |
| Mata Pelajaran | 20–40 mapel |
| Kelas / Rombel Template | 15–30 kelas |
| User | 1 superadmin, 3 admin, 3 kepala sekolah, 20 guru, 50 siswa, 2 BK, 2 keuangan |
| Role | 8 role utama |
| Subrole | 4 subrole guru |
| Permission | 100+ permission key |
| Jenis Biaya | 5–10 jenis biaya |
| Template Notifikasi | 10 template |
| Template Dokumen | 5 template |
| Bank Soal | 50–100 soal awal |
| Kalender Akademik | 1 kalender aktif |
| Tata Tertib | 10–20 aturan |
| Prestasi/Pelanggaran | 5 kategori masing-masing |

---

## 5. Contoh Dummy Data Konkret

### 5.1 Data Yayasan

| Field | Dummy |
|---|---|
| Nama Yayasan | Yayasan Pendidikan Nusantara |
| Kode Yayasan | YPN001 |
| Email | yayasan@nusantara.sch.id |
| Telepon | 021-5556677 |
| NPWP | 01.234.567.8-999.000 |
| Alamat | Jl. Pendidikan No. 88, Jakarta |

### 5.2 Data Sekolah / Unit

| Field | Dummy |
|---|---|
| Nama Sekolah | SMK Nusa Bangsa |
| Kode Sekolah | SMKNB01 |
| Jenjang | SMK |
| NPSN | 12345678 |
| Kepala Sekolah | Budi Santoso, M.Pd |
| Akreditasi | A |
| Email | info@smknusabangsa.sch.id |

### 5.3 Data User

| Username | Role | Subrole | Unit |
|---|---|---|---|
| superadmin | Superadmin | - | Global |
| admin_smk | Admin | - | SMK Nusa Bangsa |
| kepsek_smk | Kepala Sekolah | - | SMK Nusa Bangsa |
| guru_rpl01 | Guru | matapelajaran | SMK Nusa Bangsa |
| walikelas_xrpl1 | Guru | walikelas | SMK Nusa Bangsa |
| kurikulum_smk | Guru | kurikulum | SMK Nusa Bangsa |
| kesiswaan_smk | Guru | kesiswaan | SMK Nusa Bangsa |
| bk_smk01 | BK | - | SMK Nusa Bangsa |
| finance_smk | Keuangan | - | SMK Nusa Bangsa |
| siswa_xrpl1_01 | Siswa | - | SMK Nusa Bangsa |

### 5.4 Data Jurusan

| Kode | Nama Jurusan |
|---|---|
| RPL | Rekayasa Perangkat Lunak |
| TKJ | Teknik Komputer dan Jaringan |
| MM | Multimedia |
| AKL | Akuntansi dan Keuangan Lembaga |
| TBG | Tata Boga |
| TBS | Tata Busana |
| TKR | Teknik Kendaraan Ringan |

### 5.5 Data Jenis Biaya

| Kode | Nama Biaya | Frekuensi |
|---|---|---|
| SPP | SPP Bulanan | Bulanan |
| DAF | Daftar Ulang | Tahunan |
| PRK | Praktikum | Semester |
| UJN | Ujian Semester | Semester |
| SRG | Seragam | Sekali |

---

## 6. Hak Akses Superadmin Secara Umum

| Menu | Hak Akses |
|---|---|
| Beranda | View |
| Akademik | View, Create, Edit, Delete, Approve |
| Penilaian | View, Create, Edit, Delete, Approve |
| Siswa | View, Create, Edit, Delete, Approve |
| Administrasi | View, Create, Edit, Delete, Approve |
| Keuangan | View, Create, Edit, Delete, Approve |
| Komunikasi | View, Create, Edit, Delete, Approve |
| Laporan | View |
| Pengaturan | View, Create, Edit, Delete, Approve |

---

## 7. Permission Key Contoh untuk Developer

### 7.1 Akademik
- `academic.year.view`
- `academic.year.create`
- `academic.year.edit`
- `academic.year.delete`
- `academic.year.approve`

- `academic.curriculum.view`
- `academic.curriculum.create`
- `academic.curriculum.edit`
- `academic.curriculum.delete`
- `academic.curriculum.approve`

### 7.2 Penilaian
- `assessment.rule.view`
- `assessment.rule.create`
- `assessment.rule.edit`
- `assessment.rule.delete`
- `assessment.rule.approve`

- `assessment.report_template.view`
- `assessment.report_template.create`
- `assessment.report_template.edit`
- `assessment.report_template.delete`
- `assessment.report_template.approve`

### 7.3 Siswa
- `student.global.view`
- `student.global.create`
- `student.global.edit`
- `student.global.delete`
- `student.global.approve`

### 7.4 Administrasi
- `admin.user.view`
- `admin.user.create`
- `admin.user.edit`
- `admin.user.delete`
- `admin.user.approve`

- `admin.role.view`
- `admin.role.create`
- `admin.role.edit`
- `admin.role.delete`
- `admin.role.approve`

### 7.5 Keuangan
- `finance.fee_type.view`
- `finance.fee_type.create`
- `finance.fee_type.edit`
- `finance.fee_type.delete`
- `finance.fee_type.approve`

- `finance.payment_channel.view`
- `finance.payment_channel.create`
- `finance.payment_channel.edit`
- `finance.payment_channel.delete`
- `finance.payment_channel.approve`

### 7.6 Pengaturan
- `system.branding.view`
- `system.branding.create`
- `system.branding.edit`
- `system.branding.approve`

- `system.integration.view`
- `system.integration.create`
- `system.integration.edit`
- `system.integration.delete`
- `system.integration.approve`

---

## 8. YAML Ringkas untuk Dibaca AI

```yaml
superadmin:
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
    - dashboard_global
    - notifikasi_sistem
    - kalender_akademik_global

  akademik:
    - master_tahun_ajaran
    - master_semester
    - master_kurikulum
    - master_jenjang
    - master_jurusan
    - master_mata_pelajaran
    - master_fase_tingkat
    - master_rombel_template
    - master_kalender_template

  penilaian:
    - master_sistem_penilaian
    - template_rapor
    - master_predikat_nilai
    - master_jenis_penilaian
    - aturan_kkm
    - bank_soal_global
    - aturan_kelulusan

  siswa:
    - master_status_siswa
    - master_data_siswa_global
    - master_kategori_prestasi
    - master_kategori_pelanggaran
    - master_tata_tertib
    - alumni_dan_mutasi

  administrasi:
    - manajemen_yayasan
    - manajemen_sekolah_unit
    - profil_sekolah
    - manajemen_user
    - role_management
    - subrole_management
    - permission_management
    - master_sdm
    - master_jabatan
    - master_dokumen
    - approval_center
    - audit_log
    - arsip_global

  keuangan:
    - master_jenis_biaya
    - struktur_biaya_global
    - template_tagihan
    - monitoring_pembayaran_global
    - monitoring_tunggakan
    - master_diskon_beasiswa
    - payment_channel_settings
    - rekap_pemasukan_unit

  komunikasi:
    - pengumuman_global
    - pesan_internal
    - template_notifikasi
    - email_whatsapp_gateway
    - helpdesk_ticketing

  laporan:
    - laporan_akademik_global
    - laporan_user
    - laporan_siswa
    - laporan_guru_staff
    - laporan_penilaian
    - laporan_keuangan
    - laporan_aktivitas_sistem
    - executive_analytics

  pengaturan:
    - branding_sistem
    - pengaturan_umum_sistem
    - pengaturan_domain_subdomain
    - integrasi_sistem
    - backup_restore
    - keamanan_sistem
    - master_konfigurasi_menu
    - feature_toggle
    - api_webhook
    - log_system_error_monitoring