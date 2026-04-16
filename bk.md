# BK LMS SMK - Struktur Menu Lengkap + Dummy Data

Dokumen ini berisi struktur lengkap menu **BK** untuk sistem LMS SMK, termasuk fungsi utama dan dummy data yang perlu tersedia pada tiap menu.

BK di sini adalah role **Bimbingan dan Konseling** yang berfokus pada pemantauan perkembangan siswa, konseling individu dan kelompok, penanganan kasus, rujukan dari wali kelas atau kesiswaan, serta dokumentasi intervensi dan perkembangan siswa.

---

## 1. Gambaran Peran BK

BK adalah role yang berfungsi untuk:

- memantau siswa yang membutuhkan pendampingan
- mengelola konseling individu dan kelompok
- mencatat kasus, pelanggaran, dan tindak lanjut
- menerima rujukan dari wali kelas, guru, atau kesiswaan
- memantau risiko akademik dan perilaku
- berkomunikasi dengan orang tua terkait pendampingan
- menyusun program BK
- membuat laporan layanan BK dan perkembangan siswa

BK **tidak mengelola pembelajaran**, tetapi memiliki akses penting ke data siswa, absensi, nilai, dan perilaku untuk kebutuhan intervensi.

---

## 2. Struktur Sidebar BK

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
| 1 | Beranda | Dashboard BK, Notifikasi, Kalender Konseling |
| 2 | Akademik | Monitoring Nilai, Monitoring Kehadiran |
| 3 | Penilaian | Monitoring Risiko Akademik, Monitoring Risiko Perilaku |
| 4 | Siswa | Data Siswa, Kasus & Pelanggaran, Konseling Individu, Konseling Kelompok, Rujukan Wali Kelas/Kesiswaan, Catatan Perkembangan |
| 5 | Administrasi | Program BK, Dokumen BK |
| 6 | Komunikasi | Komunikasi Orang Tua, Pesan Internal |
| 7 | Laporan | Laporan BK, Rekap Kasus, Rekap Intervensi |
| 8 | Pengaturan | Kategori Layanan, Kategori Kasus, Preferensi Dashboard |

---

## 3. Tabel Lengkap Menu BK

| Kelompok Menu | Menu | Fungsi | Dummy Data yang Harus Ada |
|---|---|---|---|
| Beranda | Dashboard BK | Menampilkan ringkasan layanan BK | Total siswa binaan: 42, sesi konseling bulan ini: 38, kasus aktif: 14, rujukan baru: 6 |
| Beranda | Notifikasi | Menampilkan notifikasi layanan BK | “2 rujukan baru dari wali kelas”, “1 siswa belum hadir sesi konseling”, “3 kasus perlu tindak lanjut”, “jadwal orang tua besok pukul 10:00” |
| Beranda | Kalender Konseling | Menampilkan jadwal konseling | Konseling Andi 12 Agustus 2026 pukul 09:00, pertemuan orang tua Budi 13 Agustus 2026 pukul 10:00 |
| Akademik | Monitoring Nilai | Memantau nilai siswa untuk deteksi dini | Andi rata-rata 68, Budi rata-rata 72, Citra rata-rata 88 |
| Akademik | Monitoring Kehadiran | Memantau absensi siswa | Andi alpha 4 kali, Budi izin 3 kali, Dimas hadir 78% |
| Penilaian | Monitoring Risiko Akademik | Mengidentifikasi siswa berisiko akademik | 12 siswa dengan rata-rata di bawah KKM, 8 siswa remedial berulang |
| Penilaian | Monitoring Risiko Perilaku | Mengidentifikasi siswa berisiko perilaku | 7 siswa dengan pelanggaran sedang, 2 siswa pelanggaran berat |
| Siswa | Data Siswa | Melihat profil lengkap siswa | NIS 26001, Andi Saputra, X RPL 1, wali kelas Siti Rahma |
| Siswa | Kasus & Pelanggaran | Mencatat kasus dan pelanggaran | Andi terlambat berulang, Budi konflik teman sekelas, Dimas merokok |
| Siswa | Konseling Individu | Mengelola sesi konseling personal | Sesi 1 Andi: motivasi belajar, sesi 2 Budi: kontrol emosi |
| Siswa | Konseling Kelompok | Mengelola sesi konseling kelompok | Konseling kelompok “manajemen belajar” untuk 8 siswa |
| Siswa | Rujukan Wali Kelas/Kesiswaan | Menindaklanjuti siswa hasil rujukan | Rujukan dari wali kelas untuk Andi karena alpha, rujukan dari kesiswaan untuk Dimas |
| Siswa | Catatan Perkembangan | Mencatat perkembangan pasca intervensi | Andi mulai rutin hadir, Budi lebih stabil dalam interaksi kelas |
| Administrasi | Program BK | Menyusun program kerja BK | Program orientasi siswa baru, program motivasi belajar, program anti-bullying |
| Administrasi | Dokumen BK | Menyimpan dokumen BK | Form asesmen awal, surat panggilan orang tua, SOP konseling |
| Komunikasi | Komunikasi Orang Tua | Berkomunikasi terkait pendampingan siswa | Undangan orang tua Andi, konfirmasi sesi konseling Budi |
| Komunikasi | Pesan Internal | Komunikasi dengan wali kelas, guru, kesiswaan | Pesan ke wali kelas tentang hasil konseling, pesan ke kesiswaan tentang tindak lanjut kasus |
| Laporan | Laporan BK | Melihat laporan layanan BK | Jumlah sesi, jumlah siswa binaan, jenis layanan dominan |
| Laporan | Rekap Kasus | Melihat ringkasan kasus siswa | 8 kasus akademik, 4 kasus perilaku, 2 kasus keluarga |
| Laporan | Rekap Intervensi | Melihat hasil tindak lanjut | 10 siswa membaik, 3 masih tahap pemantauan, 1 dirujuk lanjutan |
| Pengaturan | Kategori Layanan | Mengelola kategori layanan BK | Konseling akademik, pribadi, sosial, karier |
| Pengaturan | Kategori Kasus | Mengelola klasifikasi kasus | Akademik, disiplin, sosial, keluarga, psikologis ringan |
| Pengaturan | Preferensi Dashboard | Mengatur tampilan dashboard BK | Tampilkan siswa risiko tinggi, tampilkan agenda hari ini, tampilkan notifikasi rujukan |

---

## 4. Dummy Data Minimum yang Harus Disiapkan

| Kategori | Dummy Minimum |
|---|---|
| User BK | 1 user |
| Data Siswa | 20–50 siswa |
| Data Rujukan | 5–10 rujukan |
| Data Kasus | 10–20 kasus |
| Sesi Konseling Individu | 10–20 sesi |
| Sesi Konseling Kelompok | 2–5 sesi |
| Catatan Perkembangan | 10–20 catatan |
| Program BK | 3–5 program |
| Dokumen BK | 5–10 dokumen |
| Komunikasi Orang Tua | 5–10 komunikasi |
| Laporan | 3 laporan utama |
| Kategori Layanan | 4–6 kategori |
| Kategori Kasus | 5–8 kategori |

---

## 5. Contoh Dummy Data Konkret

### 5.1 Data User BK

| Field | Dummy |
|---|---|
| Nama | Nur Aini, S.Pd |
| NIP | 198905102017032001 |
| Email | bk@smknusabangsa.sch.id |
| No HP | 081355667788 |
| Jabatan | Guru BK |

### 5.2 Data Siswa Binaan

| NIS | Nama | Kelas | Wali Kelas | Status |
|---|---|---|---|---|
| 26001 | Andi Saputra | X RPL 1 | Siti Rahma, S.Kom | Aktif |
| 26002 | Budi Hartono | X RPL 1 | Siti Rahma, S.Kom | Aktif |
| 26015 | Dimas Prakoso | XI TKJ 1 | Ahmad Fauzi, S.Kom | Aktif |

### 5.3 Data Monitoring Akademik

| Nama Siswa | Kelas | Rata-rata Nilai | Kehadiran |
|---|---|---|---|
| Andi Saputra | X RPL 1 | 68 | 82% |
| Budi Hartono | X RPL 1 | 72 | 88% |
| Dimas Prakoso | XI TKJ 1 | 65 | 78% |

### 5.4 Data Kasus & Pelanggaran

| No | Nama Siswa | Jenis Kasus | Detail | Status |
|---|---|---|---|---|
| 1 | Andi Saputra | Akademik | Alpha berulang dan tugas tidak dikumpulkan | Aktif |
| 2 | Budi Hartono | Sosial | Konflik dengan teman sekelas | Monitoring |
| 3 | Dimas Prakoso | Disiplin | Merokok di area sekolah | Aktif |

### 5.5 Data Konseling Individu

| No | Nama Siswa | Tanggal | Topik | Hasil Awal |
|---|---|---|---|---|
| 1 | Andi Saputra | 2026-08-12 | Motivasi belajar | Siswa kooperatif |
| 2 | Budi Hartono | 2026-08-13 | Kontrol emosi | Perlu tindak lanjut |
| 3 | Dimas Prakoso | 2026-08-14 | Disiplin pribadi | Dalam pemantauan |

### 5.6 Data Konseling Kelompok

| No | Nama Program | Peserta | Tanggal |
|---|---|---|---|
| 1 | Manajemen Belajar | 8 siswa | 2026-08-20 |
| 2 | Anti Bullying | 12 siswa | 2026-08-25 |

### 5.7 Data Rujukan

| No | Asal Rujukan | Nama Siswa | Alasan | Status |
|---|---|---|---|---|
| 1 | Wali Kelas | Andi Saputra | Alpha berulang | Diproses |
| 2 | Kesiswaan | Dimas Prakoso | Pelanggaran merokok | Diproses |
| 3 | Guru Mapel | Budi Hartono | Perubahan perilaku di kelas | Selesai |

### 5.8 Data Catatan Perkembangan

| Nama Siswa | Tanggal | Catatan |
|---|---|---|
| Andi Saputra | 2026-08-18 | Mulai hadir lebih teratur dan mengumpulkan tugas |
| Budi Hartono | 2026-08-19 | Interaksi sosial membaik, konflik berkurang |
| Dimas Prakoso | 2026-08-21 | Masih perlu pengawasan intensif |

### 5.9 Program BK

| Kode | Nama Program | Jenis |
|---|---|---|
| BK001 | Orientasi Siswa Baru | Preventif |
| BK002 | Motivasi Belajar | Pengembangan |
| BK003 | Anti Bullying | Preventif |
| BK004 | Konseling Karier | Pengembangan |

### 5.10 Dokumen BK

| Kode | Nama Dokumen | Kategori |
|---|---|---|
| BKDOC001 | Form Asesmen Awal | Form |
| BKDOC002 | Surat Panggilan Orang Tua | Administrasi |
| BKDOC003 | SOP Konseling Individu | SOP |
| BKDOC004 | Format Laporan BK Bulanan | Laporan |

---

## 6. Hak Akses BK Secara Umum

| Menu | Hak Akses |
|---|---|
| Beranda | View |
| Akademik | View |
| Penilaian | View |
| Siswa | View, Create, Edit |
| Administrasi | View, Create, Edit, Delete terbatas |
| Komunikasi | View, Create, Edit |
| Laporan | View |
| Pengaturan | View, Create, Edit |

---

## 7. Permission Key Contoh untuk Developer

### 7.1 Akademik
- `bk.score_monitor.view`
- `bk.attendance_monitor.view`

### 7.2 Penilaian
- `bk.academic_risk.view`
- `bk.behavior_risk.view`

### 7.3 Siswa
- `bk.student.view`
- `bk.case.view`
- `bk.case.create`
- `bk.case.edit`
- `bk.individual_counseling.view`
- `bk.individual_counseling.create`
- `bk.individual_counseling.edit`
- `bk.group_counseling.view`
- `bk.group_counseling.create`
- `bk.group_counseling.edit`
- `bk.referral.view`
- `bk.referral.create`
- `bk.referral.edit`
- `bk.progress_note.view`
- `bk.progress_note.create`
- `bk.progress_note.edit`

### 7.4 Administrasi
- `bk.program.view`
- `bk.program.create`
- `bk.program.edit`
- `bk.document.view`
- `bk.document.create`
- `bk.document.edit`
- `bk.document.delete`

### 7.5 Komunikasi
- `bk.parent_communication.view`
- `bk.parent_communication.create`
- `bk.parent_communication.edit`
- `bk.internal_message.view`
- `bk.internal_message.create`

### 7.6 Laporan
- `bk.report.view`
- `bk.case_recap.view`
- `bk.intervention_recap.view`

### 7.7 Pengaturan
- `bk.service_category.view`
- `bk.service_category.create`
- `bk.service_category.edit`
- `bk.case_category.view`
- `bk.case_category.create`
- `bk.case_category.edit`
- `bk.dashboard_preference.view`
- `bk.dashboard_preference.edit`

---

## 8. YAML Ringkas untuk Dibaca AI

```yaml
bk:
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
    - dashboard_bk
    - notifikasi
    - kalender_konseling

  akademik:
    - monitoring_nilai
    - monitoring_kehadiran

  penilaian:
    - monitoring_risiko_akademik
    - monitoring_risiko_perilaku

  siswa:
    - data_siswa
    - kasus_dan_pelanggaran
    - konseling_individu
    - konseling_kelompok
    - rujukan_wali_kelas_kesiswaan
    - catatan_perkembangan

  administrasi:
    - program_bk
    - dokumen_bk

  komunikasi:
    - komunikasi_orang_tua
    - pesan_internal

  laporan:
    - laporan_bk
    - rekap_kasus
    - rekap_intervensi

  pengaturan:
    - kategori_layanan
    - kategori_kasus
    - preferensi_dashboard