# Prompt Lengkap — Bangun Aplikasi LMS SMK Modular (Frontend + Backend Terpisah, MySQL)

## Peran Anda

Anda adalah **Senior Software Architect + Senior Full-Stack Engineer + Product Engineer** yang bertugas membangun **aplikasi LMS khusus SMK** yang rapi, modular, scalable, dan siap dikembangkan bertahap menjadi platform pembelajaran interaktif dengan dukungan **3D / AR / VR / MR** di masa berikutnya.

Anda harus **langsung membangun project-nya secara lengkap**, bukan hanya memberi saran konseptual.  
Fokus saat ini adalah **versi online-first**, dengan fondasi kuat untuk role SMK dan pembelajaran digital yang terstruktur.

\---

# 1\) Tujuan Produk

Bangun sebuah **LMS khusus SMK** berbasis web dengan karakteristik:

* Bisa diakses online dari mana saja
* Memiliki role yang sesuai struktur akademik SMK Indonesia
* Fokus utama pada **pembelajaran**, bukan e-commerce, bukan marketplace, bukan kampus
* Mendukung:

  * materi teks
  * video
  * PDF / dokumen
  * quiz / evaluasi
  * progress belajar
  * assignment / tugas
  * dashboard per role
* Sudah memiliki **fondasi arsitektur** untuk tipe lesson di masa depan:

  * `interactive\_3d`
  * `ar\_activity`
  * `vr\_activity`
  * `mr\_activity`
* Backend dan frontend **dipisahkan jelas**
* Database menggunakan **MySQL**
* Struktur code harus **bersih, modular, scalable, maintainable**

\---

# 2\) Prinsip Produk yang Tidak Boleh Dilanggar

1. **Ini LMS untuk SMK, bukan LMS kampus**
2. Struktur role harus mengikuti kebutuhan sekolah menengah kejuruan
3. Fokus produk adalah:

   * belajar
   * praktik terarah
   * evaluasi
   * monitoring akademik
4. Jangan campurkan logika frontend dan backend
5. Jangan bikin project berantakan dalam satu folder tunggal
6. Setiap module backend harus jelas domain-nya
7. Setiap page frontend harus mengikuti role-based navigation
8. Harus siap tumbuh untuk integrasi 3D / AR / VR / MR di fase berikutnya
9. Kode harus production-minded, bukan prototipe asal jadi
10. Tetap prioritaskan MVP yang realistis, lalu sediakan fondasi untuk ekspansi

\---

# 3\) Stack Teknologi Wajib

Gunakan stack berikut:

## Frontend

* **Next.js** (App Router)
* **TypeScript**
* **Tailwind CSS**
* **shadcn/ui** untuk komponen UI dasar

## Backend

* **NestJS**
* **TypeScript**
* **Prisma ORM**
* **MySQL**
* **JWT Authentication**
* **RBAC (Role-Based Access Control)**
* **Swagger / OpenAPI** untuk dokumentasi API

## DevOps / Local Development

* service:

  * app frontend
  * app backend
  * mysql
  * optional adminer / phpmyadmin

## File \& Media

Untuk MVP:

* upload file ke storage lokal terstruktur



\---

# 4\) Arsitektur Repository / Monorepo

Bangun project dalam struktur **monorepo rapi** seperti ini:

```txt
lms-smk-platform/
├─ apps/
│  ├─ frontend/
│  └─ backend/
│
├─ packages/
│  ├─ shared-types/
│  ├─ eslint-config/
│  └─ tsconfig/
│
├─ docs/
│  ├─ product/
│  ├─ api/
│  └─ database/
││
├─ .env.example
├─ package.json
└─ README.md
```

## Ketentuan penting

* `apps/frontend` dan `apps/backend` harus benar-benar terpisah
* `packages/shared-types` dipakai untuk type bersama yang aman dibagi
* `docs/` harus berisi dokumentasi dasar
* monorepo harus mudah dijalankan oleh developer lain

\---

# 5\) Struktur Role Khusus SMK

Aplikasi ini harus menggunakan role yang lebih sesuai untuk SMK, yaitu:

## Role Utama

1. **Platform Admin**  
Admin internal platform / super admin
2. **Kepala Sekolah**  
Viewer level strategis, melihat dashboard dan laporan sekolah
3. **Wakasek Kurikulum / Admin Akademik**  
Mengelola struktur akademik, kelas, penugasan, dan monitoring kurikulum
4. **Kaprogli / Ketua Konsentrasi Keahlian**  
Mengelola pembelajaran per program keahlian / konsentrasi
5. **Guru**  
Mengelola course, lesson, tugas, quiz, nilai
6. **Wali Kelas**  
Memantau progres siswa dalam satu rombel
7. **Guru BK / Guru Wali**  
Memantau siswa yang berisiko, melihat ringkasan progres, catatan pendampingan
8. **Siswa**  
Mengakses pembelajaran, tugas, quiz, progres, nilai

## Catatan Role

* Untuk MVP, role dapat disederhanakan secara implementasi, tetapi tetap buat fondasinya
* Jika ingin meringkas implementasi awal:

  * `Platform Admin`
  * `Admin Akademik`
  * `Guru`
  * `Siswa`
  * lalu `Kepala Sekolah`, `Kaprogli`, `Wali Kelas`, `Guru BK` bisa memakai permission turunan
* Namun struktur database dan permission system harus siap mendukung semua role di atas

\---

# 6\) Domain Bisnis Utama

Aplikasi harus dibangun berdasarkan domain berikut:

1. **Authentication \& Authorization**
2. **User Management**
3. **Sekolah \& Struktur Akademik**
4. **Program Keahlian / Konsentrasi**
5. **Kelas / Rombel**
6. **Mapel / Course**
7. **Module \& Lesson**
8. **Learning Activities**
9. **Quiz \& Assessment**
10. **Progress Tracking**
11. **Reporting**
12. **Media / Asset Management**
13. **Future Interactive Learning Module**

\---

# 7\) Scope MVP yang Harus Dibangun Sekarang

Bangun versi MVP yang **sudah usable** untuk sekolah.

## Fitur wajib MVP

### A. Public Website

* landing page
* tentang platform
* solusi untuk SMK
* daftar jurusan / program contoh
* CTA login
* kontak / request demo

### B. Auth

* login
* logout
* forgot password
* profile
* ubah password
* session basic

### C. Struktur akademik

* data sekolah
* tahun ajaran
* semester
* program keahlian
* konsentrasi / jurusan
* kelas / rombel
* assignment wali kelas

### D. User management

* CRUD user
* assign role
* assign user ke sekolah
* assign guru ke kelas
* assign siswa ke kelas

### E. Course management

* CRUD course
* assign course ke jurusan / kelas
* module
* lesson

### F. Lesson type yang harus berfungsi

* article / rich text
* video
* PDF / file attachment
* quiz

### G. Lesson type yang harus disiapkan fondasinya

* interactive\_3d
* ar\_activity
* vr\_activity
* mr\_activity

Untuk 4 tipe di atas:

* belum wajib immersive engine penuh
* tetapi schema database, UI placeholder, route, dan logging dasar harus sudah ada

### H. Quiz \& assessment

* quiz pilihan ganda
* passing score
* attempt
* score calculation
* hasil siswa
* review hasil

### I. Progress

* per lesson completion
* progress per module
* progress per course
* dashboard progres siswa

### J. Reporting dasar

* siswa melihat progress dan nilai pribadi
* guru melihat progress kelas
* admin akademik melihat ringkasan per kelas
* kepala sekolah melihat dashboard sekolah tingkat ringkas

\---

# 8\) Fitur yang Jangan Dibangun Dulu

Jangan masukkan fitur ini ke MVP kecuali sebagai placeholder arsitektur:

* payment gateway
* marketplace konten
* forum kompleks
* live video conference
* chatbot AI tutor
* PKL / prakerin kompleks
* sinkronisasi Dapodik
* multiplayer VR/MR
* analytics yang terlalu dalam
* microservices yang tidak perlu

Gunakan arsitektur modular, tetapi implementasi tetap realistis.

\---

# 9\) Sitemap Lengkap

## Public Site

```txt
/
├─ /
├─ /tentang
├─ /solusi
├─ /jurusan
├─ /demo
├─ /kontak
├─ /login
└─ /request-demo
```

## App Umum

```txt
/app
├─ /dashboard
├─ /profil
├─ /notifikasi
└─ /pengaturan
```

## Siswa

```txt
/app/student
├─ /dashboard
├─ /courses
├─ /courses/\[courseSlug]
├─ /courses/\[courseSlug]/modules/\[moduleId]
├─ /lessons/\[lessonId]
├─ /assignments
├─ /quizzes
├─ /progress
├─ /grades
└─ /certificates
```

## Guru

```txt
/app/teacher
├─ /dashboard
├─ /classes
├─ /students
├─ /courses
├─ /courses/\[id]/edit
├─ /courses/\[id]/modules
├─ /courses/\[id]/lessons
├─ /quizzes
├─ /assessments
├─ /reports
└─ /calendar
```

## Admin Akademik / Wakasek Kurikulum

```txt
/app/academic-admin
├─ /dashboard
├─ /schools
├─ /academic-years
├─ /semesters
├─ /programs
├─ /departments
├─ /classes
├─ /teachers
├─ /students
├─ /course-assignments
├─ /reports
└─ /settings
```

## Kepala Sekolah

```txt
/app/principal
├─ /dashboard
├─ /reports
├─ /school-performance
└─ /course-usage
```

## Kaprogli

```txt
/app/head-program
├─ /dashboard
├─ /program-overview
├─ /courses
├─ /teachers
├─ /classes
└─ /reports
```

## Wali Kelas

```txt
/app/homeroom
├─ /dashboard
├─ /class-students
├─ /class-progress
├─ /class-grades
└─ /notes
```

## Guru BK / Guru Wali

```txt
/app/counselor
├─ /dashboard
├─ /student-monitoring
├─ /student-alerts
├─ /notes
└─ /follow-up
```

## Platform Admin

```txt
/app/platform-admin
├─ /dashboard
├─ /schools
├─ /users
├─ /roles
├─ /permissions
├─ /content-library
├─ /assets
├─ /system-settings
└─ /audit-logs
```

\---

# 10\) Arsitektur Frontend

Buat frontend modular dengan struktur seperti ini:

```txt
apps/frontend/
├─ src/
│  ├─ app/
│  │  ├─ (public)/
│  │  ├─ (auth)/
│  │  ├─ (dashboard)/
│  │  └─ api/
│  │
│  ├─ components/
│  │  ├─ ui/
│  │  ├─ layout/
│  │  ├─ forms/
│  │  ├─ tables/
│  │  ├─ charts/
│  │  └─ learning/
│  │
│  ├─ modules/
│  │  ├─ auth/
│  │  ├─ users/
│  │  ├─ schools/
│  │  ├─ academic/
│  │  ├─ courses/
│  │  ├─ lessons/
│  │  ├─ quizzes/
│  │  ├─ reports/
│  │  ├─ media/
│  │  └─ interactive/
│  │
│  ├─ lib/
│  │  ├─ api-client/
│  │  ├─ auth/
│  │  ├─ permissions/
│  │  ├─ constants/
│  │  └─ utils/
│  │
│  ├─ hooks/
│  ├─ store/
│  ├─ types/
│  ├─ styles/
│  └─ config/
│
├─ public/
└─ package.json
```

## Frontend Rules

* Gunakan layout terpisah antara public site dan dashboard
* Gunakan route guard berbasis role
* Sidebar berbeda per role
* Gunakan reusable table, form, filter, pagination
* Semua page CRUD gunakan pattern konsisten
* Semua form harus validasi client-side dan server-side

\---

# 11\) Arsitektur Backend

Buat backend modular dengan struktur seperti ini:

```txt
apps/backend/
├─ src/
│  ├─ main.ts
│  ├─ app.module.ts
│  │
│  ├─ common/
│  │  ├─ guards/
│  │  ├─ decorators/
│  │  ├─ interceptors/
│  │  ├─ filters/
│  │  ├─ pipes/
│  │  ├─ dto/
│  │  ├─ enums/
│  │  └─ utils/
│  │
│  ├─ config/
│  ├─ prisma/
│  │  ├─ prisma.service.ts
│  │  └─ schema.prisma
│  │
│  ├─ modules/
│  │  ├─ auth/
│  │  ├─ users/
│  │  ├─ roles/
│  │  ├─ schools/
│  │  ├─ academic-years/
│  │  ├─ semesters/
│  │  ├─ programs/
│  │  ├─ departments/
│  │  ├─ classes/
│  │  ├─ enrollments/
│  │  ├─ courses/
│  │  ├─ course-modules/
│  │  ├─ lessons/
│  │  ├─ quizzes/
│  │  ├─ attempts/
│  │  ├─ progress/
│  │  ├─ reports/
│  │  ├─ media/
│  │  ├─ notifications/
│  │  ├─ audit-logs/
│  │  └─ interactive-sessions/
│  │
│  └─ shared/
│     ├─ mail/
│     ├─ storage/
│     └─ security/
│
├─ prisma/
│  ├─ migrations/
│  ├─ seed.ts
│  └─ schema.prisma
└─ package.json
```

## Backend Rules

* Gunakan pattern:

  * controller
  * service
  * dto
  * repository/prisma-access seperlunya
* Semua endpoint harus tervalidasi
* Semua endpoint penting harus punya auth guard
* Semua endpoint sensitif harus punya role guard / permission check
* Semua list endpoint harus mendukung:

  * pagination
  * search
  * filter
  * sorting dasar

\---

# 12\) Desain Database MySQL

Gunakan **MySQL** dengan Prisma.  
Buat schema yang rapi dan normalize secukupnya.

## Tabel inti yang wajib ada

### Identity \& Access

* `users`
* `roles`
* `permissions`
* `role\_permissions`
* `user\_roles`
* `sessions` (opsional jika dibutuhkan)
* `password\_reset\_tokens`

### Organisasi \& Akademik

* `schools`
* `academic\_years`
* `semesters`
* `programs`
* `departments`
* `classes`
* `class\_homeroom\_teachers`
* `teacher\_profiles`
* `student\_profiles`
* `counselor\_profiles`

### Mapping Akademik

* `class\_students`
* `class\_teachers`
* `courses`
* `course\_assignments`
* `course\_teachers`
* `course\_enrollments`

### Konten Pembelajaran

* `course\_modules`
* `lessons`
* `lesson\_contents`
* `media\_assets`
* `attachments`

### Quiz \& Penilaian

* `quizzes`
* `quiz\_questions`
* `quiz\_options`
* `quiz\_attempts`
* `quiz\_answers`
* `grades`

### Progress

* `lesson\_progress`
* `module\_progress`
* `course\_progress`

### Reporting \& Operasional

* `notifications`
* `audit\_logs`

### Future Interactive Learning

* `interactive\_sessions`
* `interactive\_results`
* `interactive\_events`

## Enum penting

Buat enum untuk:

* role code
* gender
* academic status
* lesson type
* quiz type
* question type
* progress status
* publication status

## Lesson Type enum

Wajib ada:

* `ARTICLE`
* `VIDEO`
* `DOCUMENT`
* `QUIZ`
* `INTERACTIVE\_3D`
* `AR\_ACTIVITY`
* `VR\_ACTIVITY`
* `MR\_ACTIVITY`

## Relasi penting

* satu sekolah punya banyak user, kelas, program, course
* satu program punya banyak department/konsentrasi
* satu kelas punya banyak siswa dan guru
* satu course bisa diassign ke banyak kelas
* satu course punya banyak module
* satu module punya banyak lesson
* satu lesson punya satu type utama
* progress siswa disimpan per lesson, per module, per course

\---

# 13\) Permission Model

Jangan hardcode role di banyak tempat.  
Gunakan dua lapis:

1. **Role**
2. **Permission**

Contoh permission code:

* `user.read`
* `user.create`
* `user.update`
* `school.read`
* `school.manage`
* `academic.manage`
* `program.read`
* `program.manage`
* `class.read`
* `class.manage`
* `course.read`
* `course.manage`
* `lesson.read`
* `lesson.manage`
* `quiz.read`
* `quiz.manage`
* `assessment.manage`
* `report.read`
* `report.school.read`
* `platform.manage`

## Mapping ringkas

* Platform Admin: semua permission
* Kepala Sekolah: `report.read`, `report.school.read`, `course.read`
* Admin Akademik: `academic.manage`, `class.manage`, `course.read`, `report.read`
* Kaprogli: `program.read`, `course.manage` terbatas programnya, `report.read`
* Guru: `course.read`, `lesson.manage` terbatas course-nya, `quiz.manage`, `assessment.manage`
* Wali Kelas: `class.read`, `report.read` terbatas kelasnya
* Guru BK: `student-monitor.read`, `report.read` terbatas
* Siswa: `course.read` miliknya, `lesson.read`, `quiz.attempt`, `progress.read`

\---

# 14\) Modul Backend yang Wajib Dibangun

## 14.1 Auth Module

Fitur:

* login dengan email / username
* JWT access token
* refresh token (lebih baik jika sempat)
* forgot password
* change password
* current user profile

## 14.2 Users Module

Fitur:

* list user
* create user
* update user
* deactivate user
* assign role
* assign school

## 14.3 Schools Module

Fitur:

* CRUD sekolah
* profil sekolah
* status aktif

## 14.4 Academic Structure Modules

* academic years
* semesters
* programs
* departments
* classes

## 14.5 Courses Module

Fitur:

* CRUD course
* assign ke kelas
* assign guru
* status publish / draft
* thumbnail
* deskripsi
* tags / category ringan

## 14.6 Modules \& Lessons

Fitur:

* CRUD module
* reorder module
* CRUD lesson
* reorder lesson
* lesson type support

## 14.7 Quizzes Module

Fitur:

* create quiz
* create question
* create multiple choice options
* set passing score
* limit attempts
* submit answers
* calculate score

## 14.8 Progress Module

Fitur:

* mark lesson completed
* update module progress
* update course progress
* get student progress by course

## 14.9 Reports Module

Fitur:

* student course report
* class progress report
* teacher report summary
* school summary report

## 14.10 Media Module

Fitur:

* upload asset
* list asset
* attach ke course/lesson
* validate file type

## 14.11 Interactive Sessions Module

MVP minimal:

* create launch record
* save event log ringan
* save result placeholder
* future-ready API untuk 3D/AR/VR/MR module

\---

# 15\) API Endpoint yang Harus Tersedia

Gunakan REST API yang konsisten.

## Auth

* `POST /auth/login`
* `POST /auth/refresh`
* `POST /auth/forgot-password`
* `POST /auth/reset-password`
* `POST /auth/change-password`
* `GET /auth/me`

## Users

* `GET /users`
* `POST /users`
* `GET /users/:id`
* `PATCH /users/:id`
* `DELETE /users/:id`

## Schools

* `GET /schools`
* `POST /schools`
* `GET /schools/:id`
* `PATCH /schools/:id`

## Academic

* `GET /academic-years`
* `POST /academic-years`
* `GET /semesters`
* `POST /semesters`
* `GET /programs`
* `POST /programs`
* `GET /departments`
* `POST /departments`
* `GET /classes`
* `POST /classes`

## Courses

* `GET /courses`
* `POST /courses`
* `GET /courses/:id`
* `PATCH /courses/:id`
* `POST /courses/:id/assignments`
* `POST /courses/:id/teachers`

## Course Modules

* `GET /courses/:id/modules`
* `POST /courses/:id/modules`
* `PATCH /modules/:id`
* `POST /modules/reorder`

## Lessons

* `GET /modules/:id/lessons`
* `POST /modules/:id/lessons`
* `GET /lessons/:id`
* `PATCH /lessons/:id`
* `POST /lessons/reorder`

## Quiz

* `POST /lessons/:id/quizzes`
* `GET /quizzes/:id`
* `POST /quizzes/:id/attempts`
* `POST /quiz-attempts/:id/submit`
* `GET /quiz-attempts/:id/result`

## Progress

* `POST /lessons/:id/complete`
* `GET /courses/:id/progress/me`
* `GET /classes/:id/progress`
* `GET /students/:id/progress`

## Reports

* `GET /reports/student/:id`
* `GET /reports/class/:id`
* `GET /reports/school/:id`
* `GET /reports/dashboard`

## Media

* `POST /media/upload`
* `GET /media`
* `DELETE /media/:id`

## Interactive

* `POST /interactive-sessions`
* `POST /interactive-sessions/:id/events`
* `POST /interactive-sessions/:id/result`
* `GET /interactive-sessions/:id`

\---

# 16\) Desain UI/UX

Desain UI harus:

* bersih
* profesional
* modern
* tidak terlalu ramai
* cocok untuk institusi pendidikan
* fokus pada keterbacaan dan dashboard

## Gaya visual

* clean dashboard
* rounded medium
* spacing lega
* warna netral profesional
* gunakan card, table, tabs, badge, progress bar
* dark mode opsional, bukan prioritas MVP

## Layout

* public site dan app harus berbeda
* sidebar dashboard per role
* topbar konsisten
* breadcrumb untuk area manajemen
* dashboard utama per role harus spesifik

\---

# 17\) User Flow Utama

## 17.1 Flow Admin Akademik

1. login
2. setup sekolah
3. buat tahun ajaran
4. buat program \& department
5. buat kelas
6. input guru \& siswa
7. assign wali kelas
8. assign course ke kelas
9. monitor progres

## 17.2 Flow Guru

1. login
2. lihat kelas yang diajar
3. buat / kelola course
4. tambah module
5. tambah lesson
6. upload video/PDF
7. buat quiz
8. publish course
9. lihat hasil siswa

## 17.3 Flow Siswa

1. login
2. lihat dashboard
3. masuk course
4. buka lesson
5. tandai lesson selesai
6. kerjakan quiz
7. lihat hasil
8. lihat progres course

## 17.4 Flow Kepala Sekolah

1. login
2. lihat dashboard sekolah
3. lihat performa kelas / penggunaan platform
4. lihat ringkasan kemajuan belajar

\---

# 18\) Requirement Halaman per Role

## Public

* landing
* tentang
* solusi
* jurusan
* demo
* login

## Dashboard Siswa

* progress summary
* course yang sedang berjalan
* tugas / quiz terbaru
* nilai terbaru

## Dashboard Guru

* kelas aktif
* course aktif
* jumlah siswa
* tugas/quiz yang perlu diperiksa
* progress kelas

## Dashboard Admin Akademik

* jumlah guru
* jumlah siswa
* jumlah kelas
* course aktif
* progress umum
* filter tahun ajaran/semester

## Dashboard Kepala Sekolah

* total pengguna
* total course aktif
* average completion
* average nilai
* adopsi platform per program

\---

# 19\) Data Dummy / Seed Data

Buat seed data realistis untuk demo.

## Sekolah contoh

* 1 sekolah SMK
* 2 program keahlian
* 4 kelas
* 8 guru
* 40 siswa

## Program contoh

1. Teknik Sepeda Motor
2. Teknik Kendaraan Ringan / Kendaraan Ringan Otomotif

## Course contoh

* Dasar Sistem Rem
* Dasar Sistem Pengapian
* Dasar K3 Bengkel
* Struktur Mesin 4 Tak

## Lesson contoh

* article
* video
* PDF
* quiz
* placeholder interactive\_3d
* placeholder mr\_activity

## Akun demo

* platform admin
* admin akademik
* guru
* wali kelas
* kepala sekolah
* siswa

\---

# 20\) Security \& Quality

Wajib implementasikan:

* password hashing aman
* DTO validation
* RBAC guard
* error handling konsisten
* audit log untuk aksi penting
* API response format konsisten
* basic rate limiting jika mudah
* CORS yang tepat
* environment config yang jelas
* sanitize upload file
* pagination default untuk list

\---

# 21\) Testing Minimum

Minimal sediakan:

* unit test auth service
* unit test progress calculation
* e2e auth login
* e2e create course
* e2e enroll student
* e2e submit quiz

Jika waktu terbatas, prioritaskan auth + course + quiz.

\---

# 22\) Deliverables yang Harus Anda Hasilkan

Anda harus menghasilkan project yang berisi:

1. **Frontend app**
2. **Backend app**
3. **Prisma schema**
4. **Migration**
5. **Seed data**
6. **Docker compose**
7. **.env.example**
8. **README root**
9. **README frontend**
10. **README backend**
11. **Swagger docs**
12. **dummy data demo**
13. **route protection**
14. **role-based sidebar**
15. **dashboard per role**
16. **course/module/lesson CRUD**
17. **quiz system**
18. **progress tracking**
19. **reporting dasar**
20. **placeholder structure untuk interactive 3D/AR/VR/MR**

\---

# 23\) Definition of Done

Project dianggap selesai jika:

* bisa dijalankan dengan `docker compose up`
* frontend dan backend berjalan normal
* MySQL tersambung
* migration berhasil
* seed berhasil
* login berhasil
* role-based navigation berjalan
* admin akademik dapat membuat kelas dan assign user
* guru dapat membuat course, module, lesson, quiz
* siswa dapat membuka course, menyelesaikan lesson, mengerjakan quiz
* progress course terhitung
* dashboard dasar tiap role tampil
* struktur code bersih dan modular
* sudah ada fondasi untuk lesson type immersive

\---

# 24\) Instruksi Implementasi Bertahap

Bangun project dalam urutan berikut:

## Tahap 1

* setup monorepo
* setup frontend
* setup backend
* setup mysql + prisma
* setup auth

## Tahap 2

* setup role \& permissions
* setup schools
* setup academic structure
* setup user management

## Tahap 3

* setup courses
* setup modules
* setup lessons
* setup media

## Tahap 4

* setup quiz
* setup grade
* setup progress

## Tahap 5

* setup dashboards per role
* setup reports dasar
* setup audit logs

## Tahap 6

* setup interactive lesson type placeholder
* setup launch/result schema
* rapikan UI
* tulis README lengkap

\---

# 25\) Ketentuan Coding Style

* gunakan TypeScript strict mode
* hindari file terlalu besar
* satu komponen satu tanggung jawab
* satu module backend satu domain
* jangan taruh query database tersebar sembarangan
* gunakan service layer dengan rapi
* gunakan naming konsisten
* gunakan reusable components
* jangan over-engineering
* jangan microservice
* gunakan clean folder structure

\---

# 26\) Catatan Penting Tentang Future AR/VR/MR

Walaupun MVP belum membangun engine immersive penuh, arsitektur harus sudah siap.

## Di database

Lesson type immersive sudah ada.

## Di backend

Sudah ada:

* `interactive-sessions`
* `interactive\_results`
* endpoint create session / log result

## Di frontend

Sudah ada:

* halaman lesson type immersive
* launch page placeholder
* status / result placeholder

## Tujuan

Agar di fase berikutnya bisa menambahkan:

* Three.js viewer
* WebXR launch
* AR mode
* VR/MR result callback
tanpa membongkar ulang arsitektur utama LMS.

\---

# 27\) Output yang Saya Inginkan dari Anda

Bangun seluruh aplikasi ini sebagai **codebase lengkap** dengan kualitas implementasi yang baik.  
Jangan berhenti di wireframe atau daftar fitur.

Prioritaskan:

1. fondasi yang bersih
2. modularitas
3. role SMK yang tepat
4. LMS usable
5. siap dikembangkan ke pembelajaran interaktif

Jika ada keputusan teknis minor yang belum ditentukan, pilih opsi yang paling:

* stabil
* umum
* mudah di-maintain
* cocok untuk tim kecil menengah

\---

# 28\) Ringkasan Singkat Produk

Produk ini adalah:

**LMS khusus SMK berbasis web, modular, online-first, frontend-backend terpisah, memakai MySQL, dengan role sekolah yang sesuai, fokus pada pembelajaran digital, evaluasi, progress tracking, dan siap dikembangkan ke 3D / AR / VR / MR di tahap berikutnya.**

\---

# 29\) Instruksi Akhir

Silakan:

* buat struktur project lengkap
* implementasikan codebase awal yang benar-benar jalan
* mulai dari backend dan frontend secara paralel tetapi modular
* jaga kualitas arsitektur
* pastikan semua module saling terhubung dengan rapi

Jangan membangun aplikasi generik kampus.  
Bangun benar-benar sebagai **LMS SMK**.

