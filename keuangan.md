# Keuangan LMS SMK - Struktur Menu Lengkap + Dummy Data

Dokumen ini berisi struktur lengkap menu **Keuangan** untuk sistem LMS SMK, termasuk fungsi utama dan dummy data yang perlu tersedia pada tiap menu.

Keuangan di sini adalah role **pengelola transaksi dan administrasi pembayaran sekolah**, dengan fokus pada tagihan siswa, pembayaran, tunggakan, cicilan, keringanan, bukti pembayaran, serta laporan pemasukan sekolah.

---

## 1. Gambaran Peran Keuangan

Keuangan adalah role yang berfungsi untuk:

- mengelola jenis biaya sekolah
- membuat dan memantau tagihan siswa
- memverifikasi pembayaran siswa
- memantau tunggakan
- mengelola cicilan, diskon, beasiswa, dan keringanan
- memvalidasi bukti pembayaran
- mengelola dokumen keuangan
- mengirim notifikasi tagihan
- menyusun laporan keuangan sekolah

Keuangan **tidak mengelola akademik secara langsung**, tetapi tetap membutuhkan akses data siswa dan kelas untuk kebutuhan penagihan dan pelaporan.

---

## 2. Struktur Sidebar Keuangan

### 2.1 Kelompok Menu

1. Beranda
2. Akademik
3. Siswa
4. Administrasi
5. Keuangan
6. Komunikasi
7. Laporan
8. Pengaturan

### 2.2 Struktur Sidebar Detail

| Urutan | Kelompok Menu | Isi |
|---|---|---|
| 1 | Beranda | Dashboard Keuangan, Notifikasi, Kalender Pembayaran |
| 2 | Akademik | Data Kelas untuk Rekap |
| 3 | Siswa | Data Siswa Terkait Tagihan, Rekap per Kelas |
| 4 | Administrasi | Master Biaya, Dokumen Keuangan, Validasi Bukti Pembayaran |
| 5 | Keuangan | Tagihan Siswa, Pembayaran, Tunggakan, Cicilan/Keringanan, Bukti Pembayaran, Integrasi Payment |
| 6 | Komunikasi | Notifikasi Tagihan, Pesan ke Orang Tua / Siswa |
| 7 | Laporan | Laporan Harian, Laporan Bulanan, Laporan Per Kelas, Laporan Per Siswa, Rekap Pemasukan |
| 8 | Pengaturan | Jenis Biaya, Format Kwitansi, Payment Settings |

---

## 3. Tabel Lengkap Menu Keuangan

| Kelompok Menu | Menu | Fungsi | Dummy Data yang Harus Ada |
|---|---|---|---|
| Beranda | Dashboard Keuangan | Menampilkan ringkasan keuangan sekolah | Total tagihan bulan ini: Rp172.500.000, total pembayaran masuk: Rp145.000.000, total tunggakan: Rp27.500.000, siswa menunggak: 68 |
| Beranda | Notifikasi | Menampilkan notifikasi transaksi penting | “12 pembayaran menunggu verifikasi”, “5 bukti transfer baru diunggah”, “8 tagihan jatuh tempo hari ini”, “1 integrasi payment gagal callback” |
| Beranda | Kalender Pembayaran | Menampilkan jadwal tagihan dan jatuh tempo | SPP jatuh tempo tiap tanggal 10, tagihan praktikum 15 Agustus 2026, UTS 5 September 2026 |
| Akademik | Data Kelas untuk Rekap | Menampilkan kelas untuk kebutuhan rekap tagihan | X RPL 1, X RPL 2, XI TKJ 1, XII MM 1 |
| Siswa | Data Siswa Terkait Tagihan | Menampilkan data siswa untuk transaksi | NIS: 26001, Andi Saputra, X RPL 1, status: aktif |
| Siswa | Rekap per Kelas | Menampilkan status tagihan per kelas | X RPL 1: 32 siswa, 25 lunas, 7 menunggak |
| Administrasi | Master Biaya | Mengelola daftar biaya sekolah | SPP, Praktikum, UTS, UAS, Seragam, Study Tour |
| Administrasi | Dokumen Keuangan | Menyimpan dokumen transaksi dan administrasi | Kwitansi, invoice, surat dispensasi, surat keringanan |
| Administrasi | Validasi Bukti Pembayaran | Memverifikasi bukti transfer/unggahan | Bukti transfer Andi Rp450.000, status: menunggu validasi |
| Keuangan | Tagihan Siswa | Mengelola tagihan per siswa | SPP Juli 2026 Andi Rp450.000, status: belum lunas |
| Keuangan | Pembayaran | Mengelola transaksi pembayaran | Pembayaran SPP oleh Andi tanggal 08-07-2026 Rp450.000 |
| Keuangan | Tunggakan | Memantau tagihan tertunggak | Budi menunggak SPP 2 bulan total Rp900.000 |
| Keuangan | Cicilan / Keringanan | Mengelola dispensasi pembayaran | Cicilan 3x untuk uang pangkal, diskon 25% siswa yatim |
| Keuangan | Bukti Pembayaran | Menyimpan bukti transfer / pembayaran | File transfer_bca_andi_juli2026.jpg |
| Keuangan | Integrasi Payment | Mengatur pembayaran online | QRIS aktif, Virtual Account BCA aktif, Midtrans sandbox aktif |
| Komunikasi | Notifikasi Tagihan | Mengirim pengingat pembayaran | “SPP Juli 2026 jatuh tempo tanggal 10”, “Tagihan praktikum belum dibayar” |
| Komunikasi | Pesan ke Orang Tua / Siswa | Komunikasi terkait pembayaran | Pesan ke wali murid terkait tunggakan dan cicilan |
| Laporan | Laporan Harian | Rekap transaksi per hari | 15 transaksi, total Rp6.750.000 |
| Laporan | Laporan Bulanan | Rekap transaksi bulanan | Juli 2026 total pemasukan Rp145.000.000 |
| Laporan | Laporan Per Kelas | Rekap pembayaran per kelas | X RPL 1 total tagihan Rp14.400.000, lunas Rp11.250.000 |
| Laporan | Laporan Per Siswa | Riwayat tagihan dan pembayaran siswa | Andi: SPP Juli lunas, Praktikum belum lunas |
| Laporan | Rekap Pemasukan | Ringkasan seluruh pemasukan | SPP Rp115.000.000, Praktikum Rp18.000.000, UTS Rp12.000.000 |
| Pengaturan | Jenis Biaya | Mengatur kategori biaya | Bulanan, Semester, Tahunan, Sekali Bayar |
| Pengaturan | Format Kwitansi | Mengatur template kwitansi | Kwitansi dengan logo sekolah, tanda tangan digital |
| Pengaturan | Payment Settings | Mengatur channel pembayaran | BCA 1234567890, Mandiri VA aktif, QRIS sekolah aktif |

---

## 4. Dummy Data Minimum yang Harus Disiapkan

| Kategori | Dummy Minimum |
|---|---|
| User Keuangan | 1 user |
| Data Siswa | 20–50 siswa |
| Data Kelas | 4–10 kelas |
| Jenis Biaya | 5–10 jenis biaya |
| Tagihan | 20–50 tagihan |
| Pembayaran | 20–50 transaksi |
| Tunggakan | 5–20 data tunggakan |
| Cicilan / Keringanan | 5–10 data |
| Bukti Pembayaran | 10–20 file/data |
| Dokumen Keuangan | 5–10 dokumen |
| Notifikasi Tagihan | 5–10 notifikasi |
| Laporan | 5 laporan utama |
| Payment Channel | 2–3 channel pembayaran |

---

## 5. Contoh Dummy Data Konkret

### 5.1 Data User Keuangan

| Field | Dummy |
|---|---|
| Nama | Rina Wulandari, S.E |
| NIP | 198812122018042001 |
| Email | keuangan@smknusabangsa.sch.id |
| No HP | 081298765432 |
| Jabatan | Staff Keuangan |

### 5.2 Data Jenis Biaya

| Kode | Nama Biaya | Frekuensi | Nominal |
|---|---|---|---|
| SPP | SPP Bulanan | Bulanan | 450000 |
| PRK | Praktikum | Semester | 150000 |
| UTS | Ujian Tengah Semester | Semester | 100000 |
| UAS | Ujian Akhir Semester | Semester | 125000 |
| SRG | Seragam | Sekali | 850000 |

### 5.3 Data Tagihan Siswa

| No | Nama Siswa | Kelas | Jenis Tagihan | Periode | Nominal | Status |
|---|---|---|---|---|---|---|
| 1 | Andi Saputra | X RPL 1 | SPP | Juli 2026 | 450000 | Belum Lunas |
| 2 | Budi Hartono | X RPL 1 | Praktikum | Ganjil 2026 | 150000 | Belum Lunas |
| 3 | Citra Lestari | XI RPL 1 | UTS | Ganjil 2026 | 100000 | Lunas |

### 5.4 Data Pembayaran

| No | Nama Siswa | Tanggal | Jenis Tagihan | Nominal | Metode | Status |
|---|---|---|---|---|---|---|
| 1 | Andi Saputra | 2026-07-08 | SPP Juli 2026 | 450000 | Transfer BCA | Berhasil |
| 2 | Citra Lestari | 2026-09-03 | UTS Ganjil 2026 | 100000 | QRIS | Berhasil |
| 3 | Budi Hartono | 2026-09-10 | Praktikum | 150000 | VA Mandiri | Menunggu Verifikasi |

### 5.5 Data Tunggakan

| Nama Siswa | Kelas | Jenis | Total Tunggakan | Lama |
|---|---|---|---|---|
| Budi Hartono | X RPL 1 | SPP | 900000 | 2 bulan |
| Dimas Prakoso | XI TKJ 1 | SPP + Praktikum | 1050000 | 2 bulan |
| Fitri Aulia | XII MM 1 | UAS | 125000 | 1 semester |

### 5.6 Data Cicilan / Keringanan

| Nama Siswa | Jenis | Skema | Nilai | Status |
|---|---|---|---|---|
| Andi Saputra | Cicilan Uang Pangkal | 3x pembayaran | 3000000 | Aktif |
| Budi Hartono | Keringanan Yatim | Diskon 25% SPP | 112500 | Disetujui |
| Citra Lestari | Beasiswa Prestasi | Potongan 50% SPP | 225000 | Aktif |

### 5.7 Data Bukti Pembayaran

| Nama Siswa | File | Tanggal Upload | Status |
|---|---|---|---|
| Andi Saputra | transfer_bca_andi_juli2026.jpg | 2026-07-08 | Valid |
| Budi Hartono | bukti_va_budi_praktikum.pdf | 2026-09-10 | Menunggu Verifikasi |

### 5.8 Data Rekap Per Kelas

| Kelas | Total Siswa | Lunas | Menunggak | Total Tagihan |
|---|---|---|---|---|
| X RPL 1 | 32 | 25 | 7 | 14400000 |
| XI RPL 1 | 33 | 29 | 4 | 14850000 |
| XI TKJ 1 | 32 | 24 | 8 | 14400000 |

### 5.9 Data Payment Channel

| Nama Channel | Tipe | Status |
|---|---|---|
| Transfer BCA | Manual Transfer | Aktif |
| Mandiri Virtual Account | VA | Aktif |
| QRIS Sekolah | QRIS | Aktif |

### 5.10 Dokumen Keuangan

| Kode | Nama Dokumen | Kategori |
|---|---|---|
| FIN001 | Template Kwitansi Pembayaran | Template |
| FIN002 | Surat Keringanan Pembayaran | Administrasi |
| FIN003 | Invoice Tagihan Semester Ganjil | Tagihan |
| FIN004 | Laporan Keuangan Juli 2026 | Laporan |

---

## 6. Hak Akses Keuangan Secara Umum

| Menu | Hak Akses |
|---|---|
| Beranda | View |
| Akademik | View |
| Siswa | View |
| Administrasi | View, Create, Edit, Delete terbatas, Approve terbatas |
| Keuangan | View, Create, Edit, Delete terbatas, Approve terbatas |
| Komunikasi | View, Create, Edit |
| Laporan | View |
| Pengaturan | View, Create, Edit, Approve terbatas |

---

## 7. Permission Key Contoh untuk Developer

### 7.1 Akademik
- `finance.class_recap.view`

### 7.2 Siswa
- `finance.student_billing_data.view`
- `finance.class_billing_recap.view`

### 7.3 Administrasi
- `finance.master_fee.view`
- `finance.master_fee.create`
- `finance.master_fee.edit`
- `finance.master_fee.delete`
- `finance.finance_document.view`
- `finance.finance_document.create`
- `finance.finance_document.edit`
- `finance.finance_document.delete`
- `finance.payment_proof_validation.view`
- `finance.payment_proof_validation.approve`

### 7.4 Keuangan
- `finance.bill.view`
- `finance.bill.create`
- `finance.bill.edit`
- `finance.bill.delete`
- `finance.payment.view`
- `finance.payment.create`
- `finance.payment.edit`
- `finance.arrears.view`
- `finance.installment.view`
- `finance.installment.create`
- `finance.installment.edit`
- `finance.installment.approve`
- `finance.payment_proof.view`
- `finance.payment_proof.create`
- `finance.payment_proof.edit`
- `finance.payment_gateway.view`
- `finance.payment_gateway.edit`

### 7.5 Komunikasi
- `finance.notification.view`
- `finance.notification.create`
- `finance.notification.edit`
- `finance.message.view`
- `finance.message.create`

### 7.6 Laporan
- `finance.daily_report.view`
- `finance.monthly_report.view`
- `finance.class_report.view`
- `finance.student_report.view`
- `finance.income_recap.view`

### 7.7 Pengaturan
- `finance.fee_type.view`
- `finance.fee_type.create`
- `finance.fee_type.edit`
- `finance.receipt_template.view`
- `finance.receipt_template.create`
- `finance.receipt_template.edit`
- `finance.payment_setting.view`
- `finance.payment_setting.edit`
- `finance.payment_setting.approve`

---

## 8. YAML Ringkas untuk Dibaca AI

```yaml
keuangan:
  sidebar:
    - beranda
    - akademik
    - siswa
    - administrasi
    - keuangan
    - komunikasi
    - laporan
    - pengaturan

  beranda:
    - dashboard_keuangan
    - notifikasi
    - kalender_pembayaran

  akademik:
    - data_kelas_untuk_rekap

  siswa:
    - data_siswa_terkait_tagihan
    - rekap_per_kelas

  administrasi:
    - master_biaya
    - dokumen_keuangan
    - validasi_bukti_pembayaran

  keuangan:
    - tagihan_siswa
    - pembayaran
    - tunggakan
    - cicilan_keringanan
    - bukti_pembayaran
    - integrasi_payment

  komunikasi:
    - notifikasi_tagihan
    - pesan_ke_orang_tua_siswa

  laporan:
    - laporan_harian
    - laporan_bulanan
    - laporan_per_kelas
    - laporan_per_siswa
    - rekap_pemasukan

  pengaturan:
    - jenis_biaya
    - format_kwitansi
    - payment_settings