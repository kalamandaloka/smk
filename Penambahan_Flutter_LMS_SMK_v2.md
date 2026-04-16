# Prompt Penambahan Flutter ke LMS SMK yang Sudah Ada

## Tujuan
Tambahkan aplikasi **mobile Flutter** ke sistem **LMS SMK** yang sudah ada. Mobile ini **bukan membangun ulang sistem**, tetapi menjadi **companion app** yang terhubung ke backend existing.

Sistem existing saat ini memiliki:
- frontend web
- backend terpisah
- database MySQL
- auth terpusat
- course / module / lesson / quiz / progress / result sudah ada atau sedang dibangun

Aplikasi mobile harus:
- berada di folder mobile
- memakai backend existing
- memakai database existing melalui API backend
- tetap modular, rapi, scalable
- fokus untuk role mobile yang memang relevan
- siap dikembangkan ke fitur **AR activity** pada lesson tertentu

---

## Peran Anda
Bertindak sebagai:
- senior software architect
- senior Flutter engineer
- senior mobile product designer
- integrator fullstack

Anda harus merancang dan mengimplementasikan **penambahan Flutter mobile** ke sistem yang sudah ada dengan pendekatan **production-minded**, modular, dan mudah dikembangkan.

---

## Fokus Mobile
Role mobile yang menjadi fokus utama:
1. **Siswa**
2. **Guru**
3. **Wali Kelas**

Role lain seperti:
- Super Admin
- Admin Akademik / Wakasek Kurikulum
- Kaprogli / Ketua Konsentrasi
- Guru BK / Guru Wali

**tidak menjadi fokus utama mobile** pada tahap ini dan tetap lebih cocok di web.

---

## Tujuan Produk Mobile
Mobile Flutter harus menjadi bagian dari platform LMS SMK yang sama, dengan prinsip:
- 1 akun
- 1 backend
- 1 sumber data
- 1 progress belajar
- 1 identitas platform

Mobile dipakai untuk:
- konsumsi materi belajar
- monitoring progres
- quiz ringan
- melihat hasil belajar
- membuka activity AR tertentu
- notifikasi akademik ringan

---

## Hasil yang Harus Dibuat
Buat implementasi lengkap penambahan mobile Flutter, meliputi:

1. Analisis integrasi mobile ke sistem existing
2. Arsitektur mobile Flutter
3. Struktur folder yang rapi dan modular
4. Integrasi auth ke backend existing
5. Integrasi role-based access untuk Siswa, Guru, dan Wali Kelas
6. Daftar screen/halaman yang harus dibuat
7. Desain navigasi mobile
8. State management yang tepat
9. API layer yang bersih
10. Local storage / token storage / cache ringan
11. Desain lesson type yang fleksibel
12. Dukungan `ar_activity` sebagai lesson type
13. Fallback jika AR belum didukung device
14. Struktur entity / model / repository / usecase / presentation
15. UI reusable component plan
16. Error/loading/empty states
17. Roadmap implementasi bertahap
18. Contoh kode inti Flutter

---

## Batasan Teknis
Ikuti batasan berikut:
- Flutter sebagai mobile framework
- Backend tetap existing
- Database tetap MySQL
- Konsumsi API via REST
- Auth terpusat di backend existing
- Jangan membuat backend baru untuk mobile
- Jangan mengubah arsitektur utama yang sudah ada
- Jangan mencampur fitur admin web penuh ke mobile
- Mobile fokus ke konsumsi, monitoring, progres, quiz, hasil, dan AR access
- Siapkan struktur untuk pengembangan jangka panjang

---

## Fitur Mobile yang Wajib Dibuat

### A. Role Siswa
- Login
- Dashboard siswa
- Kursus saya
- Detail kursus
- Daftar modul
- Detail lesson
- Tipe lesson:
  - article
  - video
  - file
  - quiz
  - model_3d (placeholder bila perlu)
  - ar_activity
  - external_link
- Kerjakan quiz
- Lihat progres belajar
- Lihat hasil / nilai
- Notifikasi
- Profil

### B. Role Guru
- Login
- Dashboard guru
- Kelas yang diampu
- Kursus aktif
- Daftar siswa
- Lihat progres siswa
- Lihat hasil quiz
- Lihat hasil activity / AR jika ada
- Beri feedback singkat
- Ringkasan penilaian
- Profil

### C. Role Wali Kelas
- Login
- Dashboard wali kelas
- Daftar rombel
- Ringkasan progres siswa per kelas
- Siswa yang tertinggal / belum aktif
- Ringkasan nilai dasar
- Notifikasi akademik sederhana
- Profil

---

## Fitur yang Tidak Perlu Dibuat di Mobile Sekarang
Jangan fokus dulu pada:
- full content authoring
- edit struktur kurikulum kompleks
- CMS admin penuh
- kelola tenant / multi-school admin
- scene editor AR/MR
- forum kompleks
- live meeting
- marketplace
- payment
- pengelolaan user sekolah secara penuh di mobile

Semua itu tetap fokus di web.

---

## Arsitektur Mobile yang Diinginkan
Gunakan Flutter dengan pendekatan:
- modular
- feature-first
- clean architecture ringan
- scalable
- maintainable

Struktur dasar yang diharapkan:

```text
lib/
  app/
  core/
  shared/
  features/
    auth/
    dashboard/
    courses/
    lessons/
    quizzes/
    progress/
    notifications/
    profile/
    teacher/
    homeroom/
    ar/
  main_development.dart
  main_staging.dart
  main_production.dart
```

Silakan sempurnakan struktur ini agar lebih rapi.

---

## Lapisan yang Harus Ada
Gunakan lapisan yang jelas:
- **presentation**
- **application / usecases**
- **domain**
- **data**

Pisahkan dengan baik:
- entity
- DTO/model
- repository contract
- repository implementation
- data source remote/local
- controller/provider/bloc
- screen/widget

---

## State Management
Pilih state management yang paling tepat untuk project ini dan gunakan secara konsisten.
Kriteria:
- rapi
- scalable
- enak untuk tim
- tidak terlalu ribet
- cocok untuk banyak feature

Gunakan salah satu yang menurut Anda paling tepat untuk production-grade project seperti ini, lalu implementasikan secara konsisten.

---

## Auth dan Role Access
Buat auth flow yang rapi:
- splash / bootstrap
- cek token
- login
- refresh token
- fetch current user
- tentukan role user
- arahkan ke home sesuai role
- logout

Role mobile aktif:
- `student`
- `teacher`
- `homeroom_teacher`

Jangan hardcode semua role logic di widget.
Gunakan:
- role enum / constants
- permission resolver
- guarded routes
- role-based home builder

---

## Local Storage dan Cache
Buat strategi yang rapi untuk:
- penyimpanan token yang aman
- simpan user profile seperlunya
- cache ringan untuk dashboard/courses/progress
- refresh data dari server
- penanganan jika koneksi buruk
- jangan buat offline-first penuh, cukup cache ringan seperlunya

---

## Integrasi API ke Backend Existing
Asumsikan backend existing sudah punya atau akan punya endpoint seperti:
- `POST /auth/login`
- `POST /auth/refresh`
- `GET /me`
- `GET /mobile/dashboard`
- `GET /courses/my`
- `GET /courses/:id`
- `GET /modules/:id/lessons`
- `GET /lessons/:id`
- `POST /quiz/:id/submit`
- `GET /progress/me`
- `GET /teacher/classes`
- `GET /teacher/classes/:id/students`
- `GET /homeroom/classes`
- `GET /notifications`

Tugas Anda:
- sesuaikan mobile dengan backend existing
- jika ada endpoint yang belum ideal, usulkan endpoint tambahan
- definisikan response yang diperlukan mobile
- buat API contract yang rapi
- utamakan kompatibilitas dengan backend saat ini

---

## Konsep Lesson Type
Sistem mobile harus siap mendukung lesson type berikut:
- `article`
- `video`
- `file`
- `quiz`
- `model_3d`
- `ar_activity`
- `external_link`

### Aturan untuk `ar_activity`
Saat lesson bertipe `ar_activity`:
- tampilkan tombol **Mulai AR**
- siapkan abstraction launcher untuk AR
- cek capability device jika memungkinkan
- jika AR belum support:
  - tampilkan fallback screen
  - tampilkan deskripsi lesson
  - tampilkan media alternatif
  - tampilkan status bahwa AR belum tersedia di device
- jangan sampai app crash

AR native belum harus full selesai, tetapi arsitektur dan launcher abstraction-nya harus sudah disiapkan dari awal.

---

## Arah UI/UX
UI harus:
- bersih
- modern
- profesional
- cocok untuk siswa SMK dan guru
- fokus ke konten
- mudah dipakai
- konsisten antar role

Siapkan reusable components seperti:
- course card
- module item
- lesson item
- status badge
- progress card
- score card
- student monitoring card
- teacher summary card
- empty state
- loading skeleton
- retry section

Navigasi harus rapi:
- bottom navigation untuk role yang cocok
- nested routes untuk detail page
- tab jika diperlukan
- back flow yang jelas

---

## Struktur Screen yang Harus Dibuat

### Screen umum
- Splash
- Login
- Session expired screen (jika perlu)
- Not found / no access

### Siswa
- Student dashboard
- My courses
- Course detail
- Module list
- Lesson detail
- Quiz screen
- Quiz result
- Progress screen
- Notifications
- Profile

### Guru
- Teacher dashboard
- Classes list
- Class detail
- Students list
- Student progress detail
- Course summary
- Results summary
- Notifications
- Profile

### Wali Kelas
- Homeroom dashboard
- Homeroom class list
- Class monitoring detail
- Student monitoring detail
- Academic alert list
- Notifications
- Profile

### AR
- AR launch screen
- AR unsupported fallback screen
- AR result placeholder screen

---

## Deliverable yang Harus Dihasilkan
Saya ingin Anda benar-benar menyiapkan implementasi, bukan hanya memberi saran.

Hasil yang harus Anda berikan:
1. Ringkasan keputusan teknis
2. Arsitektur mobile
3. Struktur folder Flutter lengkap
4. Penjelasan tiap folder
5. Daftar dependency Flutter dan alasannya
6. Konfigurasi environment
7. Routing structure
8. State management structure
9. Data flow API ke UI
10. Data models utama
11. Repository dan usecase structure
12. Auth flow implementation
13. Role-based access flow
14. List lengkap screen
15. UI component plan
16. API integration plan
17. AR integration plan
18. Error/loading/empty state plan
19. Roadmap implementasi bertahap
20. Contoh kode dasar untuk:
   - bootstrap app
   - API client
   - token storage
   - auth guard
   - login flow
   - role-based home routing
   - course list screen
   - lesson detail screen
   - AR launcher placeholder
21. TODO yang jelas untuk penyesuaian ke endpoint backend actual

---

## Format Output yang Saya Inginkan dari Anda
Susun output dengan urutan berikut:

1. Ringkasan keputusan teknis
2. Arsitektur mobile Flutter
3. Struktur folder project
4. Dependency yang digunakan
5. Role dan permission mobile
6. Sitemap / navigasi mobile
7. Daftar screen lengkap
8. Data model utama
9. API contract kebutuhan mobile
10. Strategi AR integration
11. Roadmap implementasi
12. Kode contoh inti
13. Catatan integrasi ke backend existing

---

## Aturan Penting
- Jangan membangun ulang backend
- Jangan mengubah database MySQL
- Jangan mencampur admin web penuh ke mobile
- Fokus pada mobile sebagai companion app LMS SMK
- Role utama mobile hanya: siswa, guru, wali kelas
- Web tetap menjadi pusat authoring dan administrasi
- Mobile fokus pada content consumption, monitoring, quiz, progress, hasil, dan AR access
- Kode harus rapi, modular, dan production-minded
- Hasil harus bisa dijadikan dasar project nyata

---

## Instruksi Final
Sekarang kerjakan penambahan aplikasi mobile Flutter ke LMS SMK existing ini secara lengkap, modular, detail, dan siap dijadikan dasar implementasi nyata.
