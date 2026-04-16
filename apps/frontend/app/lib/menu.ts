export type MenuItem = {
  href: string;
  label: string;
  roles?: string[];
  icon?: string;
  badge?: number;
  subItems?: MenuItem[];
};

function mergeMenuGroups(groups: MenuItem[][]): MenuItem[] {
  const mergedByLabel = new Map<string, MenuItem>();

  for (const groupList of groups) {
    for (const group of groupList) {
      const existing = mergedByLabel.get(group.label);
      if (!existing) {
        mergedByLabel.set(group.label, { ...group, subItems: group.subItems ? [...group.subItems] : undefined });
        continue;
      }

      const nextSubItems = [...(existing.subItems ?? [])];
      const existingHref = new Set(nextSubItems.map((s) => s.href));
      for (const sub of group.subItems ?? []) {
        if (!existingHref.has(sub.href)) {
          nextSubItems.push(sub);
          existingHref.add(sub.href);
        }
      }
      mergedByLabel.set(group.label, { ...existing, subItems: nextSubItems });
    }
  }

  return Array.from(mergedByLabel.values()).filter((g) => (g.subItems?.length ?? 0) > 0);
}

function roleHref(roleSegment: string, ...segments: string[]) {
  const cleaned = segments.filter(Boolean).join("/");
  return cleaned ? `/dashboards/${roleSegment}/${cleaned}` : `/dashboards/${roleSegment}`;
}

function normalizeDashboardHref(href: string) {
  return href.replace(/^\/dashboard(?=\/|$)/, "/dashboards");
}

function normalizeMenuItems(items: MenuItem[]): MenuItem[] {
  return items.map((item) => ({
    ...item,
    href: normalizeDashboardHref(item.href),
    subItems: item.subItems ? normalizeMenuItems(item.subItems) : undefined,
  }));
}

const MENU_ADMIN: MenuItem[] = [
  {
    href: "/dashboard/admin/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/admin", label: "Dashboard Admin", roles: ["ACADEMIC_ADMIN"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["ACADEMIC_ADMIN"] },
      { href: "/dashboard/calendar", label: "Kalender Akademik", roles: ["ACADEMIC_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/admin/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: "/dashboard/academic-years", label: "Tahun Ajaran", roles: ["ACADEMIC_ADMIN"] },
      { href: "/dashboard/semesters", label: "Semester", roles: ["ACADEMIC_ADMIN"] },
      { href: "/dashboard/departments", label: "Jurusan", roles: ["ACADEMIC_ADMIN"] },
      { href: "/dashboard/classes", label: "Kelas", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "akademik", "rombel"), label: "Rombel", roles: ["ACADEMIC_ADMIN"] },
      { href: "/dashboard/courses", label: "Mata Pelajaran", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "akademik", "jadwal-pelajaran"), label: "Jadwal Pelajaran", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "akademik", "jadwal-ujian"), label: "Jadwal Ujian", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "akademik", "lms-management"), label: "LMS Management", roles: ["ACADEMIC_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/admin/penilaian",
    label: "Penilaian",
    icon: "ClipboardCheck",
    subItems: [
      { href: roleHref("admin", "penilaian", "ujian-dan-penilaian"), label: "Ujian & Penilaian", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "penilaian", "bank-soal"), label: "Bank Soal", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "penilaian", "rekap-nilai"), label: "Rekap Nilai", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "penilaian", "monitoring-input-nilai"), label: "Monitoring Input Nilai", roles: ["ACADEMIC_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/admin/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: roleHref("admin", "siswa", "data-siswa"), label: "Data Siswa", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "siswa", "mutasi"), label: "Mutasi", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "siswa", "kenaikan-kelas"), label: "Kenaikan Kelas", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "siswa", "data-kelas"), label: "Data Kelas", roles: ["ACADEMIC_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/admin/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [
      { href: "/dashboard/users", label: "Manajemen User", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "administrasi", "data-guru-staff"), label: "Data Guru & Staff", roles: ["ACADEMIC_ADMIN"] },
      { href: "/dashboard/documents", label: "Arsip Dokumen", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "administrasi", "approval-data"), label: "Approval Data", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "administrasi", "pengaturan-sekolah"), label: "Pengaturan Sekolah", roles: ["ACADEMIC_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/admin/keuangan",
    label: "Keuangan",
    icon: "Wallet",
    subItems: [
      { href: roleHref("admin", "keuangan", "monitoring-tagihan"), label: "Monitoring Tagihan", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "keuangan", "pembayaran"), label: "Pembayaran", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "keuangan", "tunggakan"), label: "Tunggakan", roles: ["ACADEMIC_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/admin/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: "/dashboard/announcements", label: "Pengumuman", roles: ["ACADEMIC_ADMIN"] },
      { href: "/dashboard/messages", label: "Pesan Internal", roles: ["ACADEMIC_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/admin/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: "/dashboard/reports", label: "Laporan Akademik", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "laporan", "absensi"), label: "Laporan Absensi", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "laporan", "keuangan"), label: "Laporan Keuangan", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "laporan", "pengguna"), label: "Laporan Pengguna", roles: ["ACADEMIC_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/admin/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: roleHref("admin", "pengaturan", "identitas-sekolah"), label: "Identitas Sekolah", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "pengaturan", "template-dokumen"), label: "Template Dokumen", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "pengaturan", "logo"), label: "Logo", roles: ["ACADEMIC_ADMIN"] },
      { href: roleHref("admin", "pengaturan", "kop-rapor"), label: "Kop Rapor", roles: ["ACADEMIC_ADMIN"] },
    ],
  },
];

const MENU_KETUA_YAYASAN: MenuItem[] = [
  {
    href: "/dashboard/ketuayayasan/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/ketuayayasan", label: "Dashboard Eksekutif", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "beranda", "kalender-kegiatan"), label: "Kalender Kegiatan", roles: ["CHAIRMAN_FOUNDATION"] },
    ],
  },
  {
    href: "/dashboard/ketuayayasan/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: roleHref("ketuayayasan", "akademik", "monitoring-akademik"), label: "Monitoring Akademik", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "akademik", "monitoring-kurikulum"), label: "Monitoring Keterlaksanaan Kurikulum", roles: ["CHAIRMAN_FOUNDATION"] },
    ],
  },
  {
    href: "/dashboard/ketuayayasan/penilaian",
    label: "Penilaian",
    icon: "ClipboardCheck",
    subItems: [
      { href: roleHref("ketuayayasan", "penilaian", "monitoring-hasil-belajar"), label: "Monitoring Hasil Belajar", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "penilaian", "monitoring-kelulusan"), label: "Monitoring Kelulusan", roles: ["CHAIRMAN_FOUNDATION"] },
    ],
  },
  {
    href: "/dashboard/ketuayayasan/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: roleHref("ketuayayasan", "siswa", "monitoring-jumlah"), label: "Monitoring Jumlah Siswa", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "siswa", "prestasi"), label: "Prestasi", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "siswa", "pelanggaran"), label: "Pelanggaran", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "siswa", "risiko-dropout"), label: "Risiko Dropout", roles: ["CHAIRMAN_FOUNDATION"] },
    ],
  },
  {
    href: "/dashboard/ketuayayasan/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [
      { href: roleHref("ketuayayasan", "administrasi", "monitoring-sdm"), label: "Monitoring SDM", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "administrasi", "approval-strategis"), label: "Approval Strategis", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "administrasi", "dokumen-yayasan"), label: "Dokumen Yayasan", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "administrasi", "audit-ringkas"), label: "Audit Ringkas", roles: ["CHAIRMAN_FOUNDATION"] },
    ],
  },
  {
    href: "/dashboard/ketuayayasan/keuangan",
    label: "Keuangan",
    icon: "Wallet",
    subItems: [
      { href: roleHref("ketuayayasan", "keuangan", "monitoring-pemasukan"), label: "Monitoring Pemasukan", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "keuangan", "monitoring-pengeluaran"), label: "Monitoring Pengeluaran", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "keuangan", "tunggakan"), label: "Tunggakan", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "keuangan", "cashflow-ringkas"), label: "Cashflow Ringkas", roles: ["CHAIRMAN_FOUNDATION"] },
    ],
  },
  {
    href: "/dashboard/ketuayayasan/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: roleHref("ketuayayasan", "komunikasi", "pengumuman-yayasan"), label: "Pengumuman Yayasan", roles: ["CHAIRMAN_FOUNDATION"] },
    ],
  },
  {
    href: "/dashboard/ketuayayasan/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: roleHref("ketuayayasan", "laporan", "bulanan"), label: "Laporan Strategis Bulanan", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "laporan", "semesteran"), label: "Laporan Strategis Semesteran", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "laporan", "tahunan"), label: "Laporan Strategis Tahunan", roles: ["CHAIRMAN_FOUNDATION"] },
    ],
  },
  {
    href: "/dashboard/ketuayayasan/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: roleHref("ketuayayasan", "pengaturan", "kebijakan-yayasan"), label: "Kebijakan Yayasan", roles: ["CHAIRMAN_FOUNDATION"] },
      { href: roleHref("ketuayayasan", "pengaturan", "preferensi-dashboard"), label: "Preferensi Tampilan Dashboard", roles: ["CHAIRMAN_FOUNDATION"] },
    ],
  },
];

const MENU_KEPALA_SEKOLAH: MenuItem[] = [
  {
    href: "/dashboard/kepalasekolah/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/kepalasekolah", label: "Dashboard Kepala Sekolah", roles: ["PRINCIPAL"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "beranda", "kalender-sekolah"), label: "Kalender Sekolah", roles: ["PRINCIPAL"] },
    ],
  },
  {
    href: "/dashboard/kepalasekolah/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: roleHref("kepalasekolah", "akademik", "monitoring-pembelajaran"), label: "Monitoring Pembelajaran", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "akademik", "monitoring-guru"), label: "Monitoring Guru", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "akademik", "kurikulum-jadwal"), label: "Kurikulum & Jadwal", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "akademik", "absensi-sekolah"), label: "Absensi Sekolah", roles: ["PRINCIPAL"] },
    ],
  },
  {
    href: "/dashboard/kepalasekolah/penilaian",
    label: "Penilaian",
    icon: "ClipboardCheck",
    subItems: [
      { href: roleHref("kepalasekolah", "penilaian", "monitoring-nilai"), label: "Monitoring Nilai", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "penilaian", "validasi-nilai-akhir"), label: "Validasi Nilai Akhir", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "penilaian", "rapor"), label: "Rapor", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "penilaian", "kelulusan"), label: "Kelulusan", roles: ["PRINCIPAL"] },
    ],
  },
  {
    href: "/dashboard/kepalasekolah/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: roleHref("kepalasekolah", "siswa", "monitoring-siswa"), label: "Monitoring Siswa", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "siswa", "bk-kesiswaan"), label: "BK & Kesiswaan", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "siswa", "prestasi"), label: "Prestasi", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "siswa", "pelanggaran"), label: "Pelanggaran", roles: ["PRINCIPAL"] },
    ],
  },
  {
    href: "/dashboard/kepalasekolah/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [
      { href: roleHref("kepalasekolah", "administrasi", "approval-program"), label: "Approval Program", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "administrasi", "dokumen-sekolah"), label: "Dokumen Sekolah", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "administrasi", "monitoring-sdm"), label: "Monitoring SDM", roles: ["PRINCIPAL"] },
    ],
  },
  {
    href: "/dashboard/kepalasekolah/keuangan",
    label: "Keuangan",
    icon: "Wallet",
    subItems: [
      { href: roleHref("kepalasekolah", "keuangan", "ringkas"), label: "Keuangan Ringkas", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "keuangan", "monitoring-pembayaran-siswa"), label: "Monitoring Pembayaran Siswa", roles: ["PRINCIPAL"] },
    ],
  },
  {
    href: "/dashboard/kepalasekolah/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: roleHref("kepalasekolah", "komunikasi", "pengumuman-sekolah"), label: "Pengumuman Sekolah", roles: ["PRINCIPAL"] },
      { href: "/dashboard/messages", label: "Pesan Internal", roles: ["PRINCIPAL"] },
    ],
  },
  {
    href: "/dashboard/kepalasekolah/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: roleHref("kepalasekolah", "laporan", "akademik"), label: "Laporan Akademik", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "laporan", "guru"), label: "Laporan Guru", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "laporan", "siswa"), label: "Laporan Siswa", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "laporan", "disiplin"), label: "Laporan Disiplin", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "laporan", "keuangan-ringkas"), label: "Laporan Keuangan Ringkas", roles: ["PRINCIPAL"] },
    ],
  },
  {
    href: "/dashboard/kepalasekolah/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: roleHref("kepalasekolah", "pengaturan", "profil-sekolah"), label: "Profil Sekolah", roles: ["PRINCIPAL"] },
      { href: roleHref("kepalasekolah", "pengaturan", "preferensi"), label: "Preferensi Kepala Sekolah", roles: ["PRINCIPAL"] },
    ],
  },
];

const MENU_GURU_UMUM: MenuItem[] = [
  {
    href: "/dashboard/guru/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/guru", label: "Dashboard Guru", roles: ["TEACHER"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "beranda", "kalender-mengajar"), label: "Kalender Mengajar", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: roleHref("guru", "umum", "akademik", "kelas-saya"), label: "Kelas Saya", roles: ["TEACHER"] },
      { href: "/dashboard/courses", label: "Mata Pelajaran Saya", roles: ["TEACHER"] },
      { href: "/dashboard/lessons", label: "Materi Pembelajaran", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "akademik", "tugas"), label: "Tugas", roles: ["TEACHER"] },
      { href: "/dashboard/quizzes", label: "Quiz/Ujian", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "akademik", "jurnal-mengajar"), label: "Jurnal Mengajar", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "akademik", "absensi-kelas"), label: "Absensi Kelas", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/penilaian",
    label: "Penilaian",
    icon: "ClipboardCheck",
    subItems: [
      { href: roleHref("guru", "umum", "penilaian", "penilaian-tugas"), label: "Penilaian Tugas", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "penilaian", "nilai-ujian"), label: "Nilai Ujian", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "penilaian", "nilai-praktik"), label: "Nilai Praktik", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "penilaian", "remedial"), label: "Remedial", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: roleHref("guru", "umum", "siswa", "daftar-siswa-kelas-ajar"), label: "Daftar Siswa Kelas Ajar", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "siswa", "portofolio-siswa"), label: "Portofolio Siswa", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "siswa", "catatan-siswa"), label: "Catatan Siswa", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [{ href: "/dashboard/documents", label: "Dokumen Ajar", roles: ["TEACHER"] }],
  },
  {
    href: "/dashboard/guru/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: roleHref("guru", "umum", "komunikasi", "forum-diskusi"), label: "Forum Diskusi", roles: ["TEACHER"] },
      { href: "/dashboard/messages", label: "Pesan", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "komunikasi", "pengumuman-kelas"), label: "Pengumuman Kelas", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: roleHref("guru", "umum", "laporan", "laporan-kelas"), label: "Laporan Kelas", roles: ["TEACHER"] },
      { href: "/dashboard/reports", label: "Rekap Nilai", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "laporan", "rekap-kehadiran"), label: "Rekap Kehadiran", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: "/dashboard/profile", label: "Profil Akun", roles: ["TEACHER"] },
      { href: roleHref("guru", "umum", "pengaturan", "preferensi-mengajar"), label: "Preferensi Mengajar", roles: ["TEACHER"] },
    ],
  },
];

const MENU_GURU_MAPEL: MenuItem[] = [
  {
    href: "/dashboard/guru/matapelajaran/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/guru/matapelajaran", label: "Dashboard Mapel", roles: ["TEACHER"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/matapelajaran/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: roleHref("guru", "matapelajaran", "akademik", "kelas-ajar"), label: "Kelas Ajar", roles: ["TEACHER"] },
      { href: "/dashboard/lessons", label: "Materi", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "akademik", "tugas-proyek"), label: "Tugas & Proyek", roles: ["TEACHER"] },
      { href: "/dashboard/quizzes", label: "Quiz/Ujian", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "akademik", "absensi"), label: "Absensi", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "akademik", "jurnal-mengajar"), label: "Jurnal Mengajar", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "akademik", "capaian-pembelajaran"), label: "Capaian Pembelajaran", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/matapelajaran/penilaian",
    label: "Penilaian",
    icon: "ClipboardCheck",
    subItems: [
      { href: roleHref("guru", "matapelajaran", "penilaian", "pengetahuan"), label: "Penilaian Pengetahuan", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "penilaian", "keterampilan"), label: "Keterampilan", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "penilaian", "sikap"), label: "Sikap", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "penilaian", "remedial-pengayaan"), label: "Remedial & Pengayaan", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/matapelajaran/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: roleHref("guru", "matapelajaran", "siswa", "daftar-siswa"), label: "Daftar Siswa", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "siswa", "portofolio-siswa"), label: "Portofolio Siswa", roles: ["TEACHER"] },
      { href: "/dashboard/progress", label: "Progress Belajar", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/matapelajaran/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [{ href: "/dashboard/documents", label: "Dokumen Perangkat Ajar", roles: ["TEACHER"] }],
  },
  {
    href: "/dashboard/guru/matapelajaran/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: roleHref("guru", "matapelajaran", "komunikasi", "forum-materi"), label: "Forum Materi", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "komunikasi", "pesan-ke-siswa"), label: "Pesan ke Siswa", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/matapelajaran/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: roleHref("guru", "matapelajaran", "laporan", "rekap-nilai-mapel"), label: "Rekap Nilai Mapel", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "laporan", "rekap-ketuntasan"), label: "Rekap Ketuntasan", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "laporan", "rekap-kehadiran"), label: "Rekap Kehadiran", roles: ["TEACHER"] },
    ],
  },
  {
    href: "/dashboard/guru/matapelajaran/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: "/dashboard/profile", label: "Profil", roles: ["TEACHER"] },
      { href: roleHref("guru", "matapelajaran", "pengaturan", "preferensi-kelas"), label: "Preferensi Kelas", roles: ["TEACHER"] },
    ],
  },
];

const MENU_GURU_WALI_KELAS: MenuItem[] = [
  {
    href: "/dashboard/guru/walikelas/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/guru/walikelas", label: "Dashboard Wali Kelas", roles: ["HOMEROOM"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "beranda", "kalender-kelas"), label: "Kalender Kelas", roles: ["HOMEROOM"] },
    ],
  },
  {
    href: "/dashboard/guru/walikelas/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: "/dashboard/classes", label: "Data Kelas", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "akademik", "jadwal-kelas"), label: "Jadwal Kelas", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "akademik", "monitoring-pembelajaran-siswa"), label: "Monitoring Pembelajaran Siswa", roles: ["HOMEROOM"] },
    ],
  },
  {
    href: "/dashboard/guru/walikelas/penilaian",
    label: "Penilaian",
    icon: "ClipboardCheck",
    subItems: [
      { href: roleHref("guru", "walikelas", "penilaian", "ringkasan-nilai-semua-mapel"), label: "Ringkasan Nilai Semua Mapel", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "penilaian", "review-rapor"), label: "Review Rapor", roles: ["HOMEROOM"] },
    ],
  },
  {
    href: "/dashboard/guru/walikelas/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: roleHref("guru", "walikelas", "siswa", "data-siswa-kelas"), label: "Data Siswa Kelas", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "siswa", "absensi-harian"), label: "Absensi Harian", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "siswa", "perilaku-catatan"), label: "Perilaku & Catatan", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "siswa", "kasus-siswa"), label: "Kasus Siswa", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "siswa", "komunikasi-orang-tua"), label: "Komunikasi Orang Tua", roles: ["HOMEROOM"] },
    ],
  },
  {
    href: "/dashboard/guru/walikelas/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [
      { href: roleHref("guru", "walikelas", "administrasi", "persetujuan-administratif"), label: "Persetujuan Administratif", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "administrasi", "arsip-kelas"), label: "Arsip Kelas", roles: ["HOMEROOM"] },
    ],
  },
  {
    href: "/dashboard/guru/walikelas/keuangan",
    label: "Keuangan",
    icon: "Wallet",
    subItems: [{ href: roleHref("guru", "walikelas", "keuangan", "ringkasan-tagihan-kelas"), label: "Ringkasan Tagihan Siswa Kelas", roles: ["HOMEROOM"] }],
  },
  {
    href: "/dashboard/guru/walikelas/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: roleHref("guru", "walikelas", "komunikasi", "pengumuman-kelas"), label: "Pengumuman Kelas", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "komunikasi", "pesan-ke-orang-tua"), label: "Pesan ke Orang Tua", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "komunikasi", "pesan-ke-siswa"), label: "Pesan ke Siswa", roles: ["HOMEROOM"] },
    ],
  },
  {
    href: "/dashboard/guru/walikelas/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: roleHref("guru", "walikelas", "laporan", "rekap-kelas"), label: "Rekap Kelas", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "laporan", "rekap-absensi"), label: "Rekap Absensi", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "laporan", "rekap-perilaku"), label: "Rekap Perilaku", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "laporan", "rekap-nilai-kelas"), label: "Rekap Nilai Kelas", roles: ["HOMEROOM"] },
    ],
  },
  {
    href: "/dashboard/guru/walikelas/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: "/dashboard/profile", label: "Profil", roles: ["HOMEROOM"] },
      { href: roleHref("guru", "walikelas", "pengaturan", "preferensi-walikelas"), label: "Preferensi Wali Kelas", roles: ["HOMEROOM"] },
    ],
  },
];

const MENU_GURU_KURIKULUM: MenuItem[] = [
  {
    href: "/dashboard/guru/kurikulum/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/guru/kurikulum", label: "Dashboard Kurikulum", roles: ["HEAD_PROGRAM"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["HEAD_PROGRAM"] },
      { href: "/dashboard/calendar", label: "Kalender Akademik", roles: ["HEAD_PROGRAM"] },
    ],
  },
  {
    href: "/dashboard/guru/kurikulum/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: roleHref("guru", "kurikulum", "akademik", "struktur-kurikulum"), label: "Struktur Kurikulum", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "akademik", "jadwal-pelajaran"), label: "Jadwal Pelajaran", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "akademik", "beban-mengajar"), label: "Beban Mengajar", roles: ["HEAD_PROGRAM"] },
      { href: "/dashboard/calendar", label: "Kalender Akademik", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "akademik", "monitoring-jurnal"), label: "Monitoring Jurnal Mengajar", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "akademik", "monitoring-materi"), label: "Monitoring Materi", roles: ["HEAD_PROGRAM"] },
    ],
  },
  {
    href: "/dashboard/guru/kurikulum/penilaian",
    label: "Penilaian",
    icon: "ClipboardCheck",
    subItems: [
      { href: roleHref("guru", "kurikulum", "penilaian", "monitoring-penilaian"), label: "Monitoring Penilaian", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "penilaian", "ujian-akademik"), label: "Ujian Akademik", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "penilaian", "rapor-kelulusan"), label: "Rapor & Kelulusan", roles: ["HEAD_PROGRAM"] },
    ],
  },
  {
    href: "/dashboard/guru/kurikulum/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [{ href: roleHref("guru", "kurikulum", "siswa", "monitoring-distribusi-kelas"), label: "Monitoring Distribusi Kelas dan Peserta Didik", roles: ["HEAD_PROGRAM"] }],
  },
  {
    href: "/dashboard/guru/kurikulum/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [
      { href: roleHref("guru", "kurikulum", "administrasi", "dokumen-kurikulum"), label: "Dokumen Kurikulum", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "administrasi", "approval-akademik"), label: "Approval Akademik", roles: ["HEAD_PROGRAM"] },
    ],
  },
  {
    href: "/dashboard/guru/kurikulum/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: roleHref("guru", "kurikulum", "komunikasi", "pengumuman-akademik"), label: "Pengumuman Akademik", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "komunikasi", "pesan-ke-guru"), label: "Pesan ke Guru", roles: ["HEAD_PROGRAM"] },
    ],
  },
  {
    href: "/dashboard/guru/kurikulum/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: roleHref("guru", "kurikulum", "laporan", "laporan-kurikulum"), label: "Laporan Kurikulum", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "laporan", "keterlaksanaan"), label: "Laporan Keterlaksanaan Pembelajaran", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "laporan", "evaluasi-akademik"), label: "Evaluasi Akademik", roles: ["HEAD_PROGRAM"] },
    ],
  },
  {
    href: "/dashboard/guru/kurikulum/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: roleHref("guru", "kurikulum", "pengaturan", "format-akademik"), label: "Pengaturan Format Akademik", roles: ["HEAD_PROGRAM"] },
      { href: roleHref("guru", "kurikulum", "pengaturan", "aturan-penilaian"), label: "Aturan Penilaian", roles: ["HEAD_PROGRAM"] },
    ],
  },
];

const MENU_GURU_KESISWAAN: MenuItem[] = [
  {
    href: "/dashboard/guru/kesiswaan/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/guru/kesiswaan", label: "Dashboard Kesiswaan", roles: ["STUDENT_AFFAIRS"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "beranda", "kalender-kegiatan-siswa"), label: "Kalender Kegiatan Siswa", roles: ["STUDENT_AFFAIRS"] },
    ],
  },
  {
    href: "/dashboard/guru/kesiswaan/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: roleHref("guru", "kesiswaan", "akademik", "data-ekstrakurikuler"), label: "Data Ekstrakurikuler", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "akademik", "agenda-kegiatan"), label: "Agenda Kegiatan", roles: ["STUDENT_AFFAIRS"] },
    ],
  },
  {
    href: "/dashboard/guru/kesiswaan/penilaian",
    label: "Penilaian",
    icon: "ClipboardCheck",
    subItems: [{ href: roleHref("guru", "kesiswaan", "penilaian", "sikap-pembinaan"), label: "Penilaian Sikap / Pembinaan", roles: ["STUDENT_AFFAIRS"] }],
  },
  {
    href: "/dashboard/guru/kesiswaan/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: roleHref("guru", "kesiswaan", "siswa", "data-kesiswaan"), label: "Data Kesiswaan", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "siswa", "tata-tertib"), label: "Tata Tertib", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "siswa", "pelanggaran"), label: "Pelanggaran Siswa", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "siswa", "prestasi"), label: "Prestasi Siswa", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "siswa", "kegiatan"), label: "Kegiatan Siswa", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "siswa", "perizinan"), label: "Perizinan", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "siswa", "pembinaan"), label: "Pembinaan", roles: ["STUDENT_AFFAIRS"] },
    ],
  },
  {
    href: "/dashboard/guru/kesiswaan/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [
      { href: roleHref("guru", "kesiswaan", "administrasi", "dokumen"), label: "Dokumen Kesiswaan", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "administrasi", "approval-kegiatan"), label: "Approval Kegiatan", roles: ["STUDENT_AFFAIRS"] },
    ],
  },
  {
    href: "/dashboard/guru/kesiswaan/keuangan",
    label: "Keuangan",
    icon: "Wallet",
    subItems: [{ href: roleHref("guru", "kesiswaan", "keuangan", "anggaran-ringkas"), label: "Anggaran Kegiatan Ringkas", roles: ["STUDENT_AFFAIRS"] }],
  },
  {
    href: "/dashboard/guru/kesiswaan/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: roleHref("guru", "kesiswaan", "komunikasi", "pengumuman"), label: "Pengumuman Kesiswaan", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "komunikasi", "komunikasi-orang-tua"), label: "Komunikasi Orang Tua", roles: ["STUDENT_AFFAIRS"] },
    ],
  },
  {
    href: "/dashboard/guru/kesiswaan/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: roleHref("guru", "kesiswaan", "laporan", "pelanggaran"), label: "Laporan Pelanggaran", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "laporan", "prestasi"), label: "Prestasi", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "laporan", "aktivitas"), label: "Aktivitas Kesiswaan", roles: ["STUDENT_AFFAIRS"] },
    ],
  },
  {
    href: "/dashboard/guru/kesiswaan/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: roleHref("guru", "kesiswaan", "pengaturan", "tata-tertib"), label: "Pengaturan Tata Tertib", roles: ["STUDENT_AFFAIRS"] },
      { href: roleHref("guru", "kesiswaan", "pengaturan", "kategori-pelanggaran"), label: "Kategori Pelanggaran", roles: ["STUDENT_AFFAIRS"] },
    ],
  },
];

const MENU_SISWA: MenuItem[] = [
  {
    href: "/dashboard/siswa/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/siswa", label: "Dashboard Siswa", roles: ["STUDENT"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["STUDENT"] },
      { href: roleHref("siswa", "beranda", "kalender-belajar"), label: "Kalender Belajar", roles: ["STUDENT"] },
    ],
  },
  {
    href: "/dashboard/siswa/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: roleHref("siswa", "akademik", "kelas-saya"), label: "Kelas Saya", roles: ["STUDENT"] },
      { href: "/dashboard/courses", label: "Mata Pelajaran", roles: ["STUDENT"] },
      { href: "/dashboard/lessons", label: "Materi Belajar", roles: ["STUDENT"] },
      { href: roleHref("siswa", "akademik", "tugas-saya"), label: "Tugas Saya", roles: ["STUDENT"] },
      { href: "/dashboard/quizzes", label: "Quiz/Ujian", roles: ["STUDENT"] },
      { href: roleHref("siswa", "akademik", "jadwal-pelajaran"), label: "Jadwal Pelajaran", roles: ["STUDENT"] },
    ],
  },
  {
    href: "/dashboard/siswa/penilaian",
    label: "Penilaian",
    icon: "ClipboardCheck",
    subItems: [
      { href: roleHref("siswa", "penilaian", "nilai-tugas"), label: "Nilai Tugas", roles: ["STUDENT"] },
      { href: roleHref("siswa", "penilaian", "nilai-ujian"), label: "Nilai Ujian", roles: ["STUDENT"] },
      { href: roleHref("siswa", "penilaian", "nilai-praktik"), label: "Nilai Praktik", roles: ["STUDENT"] },
      { href: roleHref("siswa", "penilaian", "rapor"), label: "Rapor", roles: ["STUDENT"] },
    ],
  },
  {
    href: "/dashboard/siswa/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: roleHref("siswa", "siswa", "absensi"), label: "Absensi", roles: ["STUDENT"] },
      { href: roleHref("siswa", "siswa", "portofolio"), label: "Portofolio", roles: ["STUDENT"] },
      { href: roleHref("siswa", "siswa", "bk-konseling"), label: "BK/Konseling", roles: ["STUDENT"] },
    ],
  },
  {
    href: "/dashboard/siswa/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [
      { href: roleHref("siswa", "administrasi", "dokumen-siswa"), label: "Dokumen Siswa", roles: ["STUDENT"] },
      { href: roleHref("siswa", "administrasi", "sertifikat"), label: "Sertifikat", roles: ["STUDENT"] },
    ],
  },
  {
    href: "/dashboard/siswa/keuangan",
    label: "Keuangan",
    icon: "Wallet",
    subItems: [
      { href: roleHref("siswa", "keuangan", "tagihan"), label: "Tagihan", roles: ["STUDENT"] },
      { href: roleHref("siswa", "keuangan", "status-pembayaran"), label: "Status Pembayaran", roles: ["STUDENT"] },
      { href: roleHref("siswa", "keuangan", "riwayat-pembayaran"), label: "Riwayat Pembayaran", roles: ["STUDENT"] },
    ],
  },
  {
    href: "/dashboard/siswa/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: roleHref("siswa", "komunikasi", "forum-diskusi"), label: "Forum Diskusi", roles: ["STUDENT"] },
      { href: "/dashboard/messages", label: "Pesan", roles: ["STUDENT"] },
      { href: "/dashboard/announcements", label: "Pengumuman", roles: ["STUDENT"] },
    ],
  },
  {
    href: "/dashboard/siswa/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: "/dashboard/progress", label: "Progress Belajar", roles: ["STUDENT"] },
      { href: roleHref("siswa", "laporan", "rekap-kehadiran"), label: "Rekap Kehadiran", roles: ["STUDENT"] },
      { href: roleHref("siswa", "laporan", "ringkasan-nilai"), label: "Ringkasan Nilai", roles: ["STUDENT"] },
    ],
  },
  {
    href: "/dashboard/siswa/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: "/dashboard/profile", label: "Profil Akun", roles: ["STUDENT"] },
      { href: roleHref("siswa", "pengaturan", "ganti-password"), label: "Ganti Password", roles: ["STUDENT"] },
      { href: roleHref("siswa", "pengaturan", "preferensi"), label: "Preferensi", roles: ["STUDENT"] },
    ],
  },
];

const MENU_BK: MenuItem[] = [
  {
    href: "/dashboard/bk/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/bk", label: "Dashboard BK", roles: ["COUNSELOR"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "beranda", "kalender-konseling"), label: "Kalender Konseling", roles: ["COUNSELOR"] },
    ],
  },
  {
    href: "/dashboard/bk/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: roleHref("bk", "akademik", "monitoring-nilai"), label: "Monitoring Nilai", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "akademik", "monitoring-kehadiran"), label: "Monitoring Kehadiran", roles: ["COUNSELOR"] },
    ],
  },
  {
    href: "/dashboard/bk/penilaian",
    label: "Penilaian",
    icon: "ClipboardCheck",
    subItems: [{ href: roleHref("bk", "penilaian", "monitoring-risiko"), label: "Monitoring Risiko Akademik dan Perilaku", roles: ["COUNSELOR"] }],
  },
  {
    href: "/dashboard/bk/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: roleHref("bk", "siswa", "data-siswa"), label: "Data Siswa", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "siswa", "kasus-pelanggaran"), label: "Kasus & Pelanggaran", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "siswa", "konseling-individu"), label: "Konseling Individu", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "siswa", "konseling-kelompok"), label: "Konseling Kelompok", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "siswa", "rujukan"), label: "Rujukan Wali Kelas/Kesiswaan", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "siswa", "catatan-perkembangan"), label: "Catatan Perkembangan", roles: ["COUNSELOR"] },
    ],
  },
  {
    href: "/dashboard/bk/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [
      { href: roleHref("bk", "administrasi", "program-bk"), label: "Program BK", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "administrasi", "dokumen-bk"), label: "Dokumen BK", roles: ["COUNSELOR"] },
    ],
  },
  {
    href: "/dashboard/bk/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: roleHref("bk", "komunikasi", "komunikasi-orang-tua"), label: "Komunikasi Orang Tua", roles: ["COUNSELOR"] },
      { href: "/dashboard/messages", label: "Pesan Internal", roles: ["COUNSELOR"] },
    ],
  },
  {
    href: "/dashboard/bk/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: roleHref("bk", "laporan", "laporan-bk"), label: "Laporan BK", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "laporan", "rekap-kasus"), label: "Rekap Kasus", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "laporan", "rekap-intervensi"), label: "Rekap Intervensi", roles: ["COUNSELOR"] },
    ],
  },
  {
    href: "/dashboard/bk/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: roleHref("bk", "pengaturan", "profil-bk"), label: "Profil BK", roles: ["COUNSELOR"] },
      { href: roleHref("bk", "pengaturan", "kategori-layanan"), label: "Pengaturan Kategori Layanan", roles: ["COUNSELOR"] },
    ],
  },
];

const MENU_KEUANGAN: MenuItem[] = [
  {
    href: "/dashboard/keuangan/beranda",
    label: "Beranda",
    icon: "Home",
    subItems: [
      { href: "/dashboard/keuangan", label: "Dashboard Keuangan", roles: ["FINANCE"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "beranda", "kalender-pembayaran"), label: "Kalender Pembayaran", roles: ["FINANCE"] },
    ],
  },
  {
    href: "/dashboard/keuangan/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [{ href: roleHref("keuangan", "akademik", "data-kelas-rekap"), label: "Data Kelas untuk Rekap Pembayaran", roles: ["FINANCE"] }],
  },
  {
    href: "/dashboard/keuangan/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: roleHref("keuangan", "siswa", "data-siswa-tagihan"), label: "Data Siswa Terkait Tagihan", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "siswa", "rekap-per-kelas"), label: "Rekap per Kelas", roles: ["FINANCE"] },
    ],
  },
  {
    href: "/dashboard/keuangan/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [
      { href: roleHref("keuangan", "administrasi", "master-biaya"), label: "Master Biaya", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "administrasi", "dokumen-keuangan"), label: "Dokumen Keuangan", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "administrasi", "validasi-bukti"), label: "Validasi Bukti Pembayaran", roles: ["FINANCE"] },
    ],
  },
  {
    href: "/dashboard/keuangan/keuangan",
    label: "Keuangan",
    icon: "Wallet",
    subItems: [
      { href: roleHref("keuangan", "keuangan", "tagihan-siswa"), label: "Tagihan Siswa", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "keuangan", "pembayaran"), label: "Pembayaran", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "keuangan", "tunggakan"), label: "Tunggakan", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "keuangan", "cicilan-keringanan"), label: "Cicilan/Keringanan", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "keuangan", "bukti-pembayaran"), label: "Bukti Pembayaran", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "keuangan", "integrasi-payment"), label: "Integrasi Payment", roles: ["FINANCE"] },
    ],
  },
  {
    href: "/dashboard/keuangan/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: roleHref("keuangan", "komunikasi", "notifikasi-tagihan"), label: "Notifikasi Tagihan", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "komunikasi", "pesan-orang-tua-siswa"), label: "Pesan ke Orang Tua / Siswa", roles: ["FINANCE"] },
    ],
  },
  {
    href: "/dashboard/keuangan/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: roleHref("keuangan", "laporan", "harian"), label: "Laporan Harian", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "laporan", "bulanan"), label: "Laporan Bulanan", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "laporan", "per-kelas"), label: "Per Kelas", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "laporan", "per-siswa"), label: "Per Siswa", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "laporan", "rekap-pemasukan"), label: "Rekap Pemasukan", roles: ["FINANCE"] },
    ],
  },
  {
    href: "/dashboard/keuangan/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: roleHref("keuangan", "pengaturan", "jenis-biaya"), label: "Pengaturan Jenis Biaya", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "pengaturan", "format-kwitansi"), label: "Format Kwitansi", roles: ["FINANCE"] },
      { href: roleHref("keuangan", "pengaturan", "payment-settings"), label: "Payment Settings", roles: ["FINANCE"] },
    ],
  },
];

const SUPERADMIN_MENU: MenuItem[] = [
  {
    href: "/dashboard/superadmin/beranda",
    label: "Beranda",
    icon: "LayoutGrid",
    subItems: [
      { href: "/dashboard/superadmin", label: "Dashboard Superadmin", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/notifications", label: "Notifikasi", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/calendar", label: "Kalender Akademik Global", roles: ["PLATFORM_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/superadmin/akademik",
    label: "Akademik",
    icon: "GraduationCap",
    subItems: [
      { href: "/dashboard/academic-years", label: "Master Tahun Ajaran", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/semesters", label: "Semester", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/akademik/kurikulum", label: "Kurikulum", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/departments", label: "Jurusan", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/classes", label: "Kelas", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/akademik/rombel", label: "Rombel", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/courses", label: "Mata Pelajaran", roles: ["PLATFORM_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/superadmin/penilaian",
    label: "Penilaian",
    icon: "ClipboardList",
    subItems: [
      { href: "/dashboard/superadmin/penilaian/pengaturan", label: "Pengaturan Sistem Penilaian", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/penilaian/template-rapor", label: "Template Rapor", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/penilaian/aturan-kelulusan", label: "Aturan Kelulusan", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/penilaian/bank-soal-global", label: "Bank Soal Global", roles: ["PLATFORM_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/superadmin/siswa",
    label: "Siswa",
    icon: "Users",
    subItems: [
      { href: "/dashboard/superadmin/siswa/master", label: "Master Data Siswa Global", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/siswa/status", label: "Status Siswa", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/siswa/alumni", label: "Alumni", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/siswa/mutasi", label: "Mutasi", roles: ["PLATFORM_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/superadmin/administrasi",
    label: "Administrasi",
    icon: "Shield",
    subItems: [
      { href: "/dashboard/superadmin/administrasi/yayasan-unit", label: "Manajemen Yayasan & Unit", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/schools", label: "Manajemen Sekolah", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/users", label: "Manajemen User", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/administrasi/role-permission", label: "Role & Permission", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/administrasi/master-sdm", label: "Master SDM", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/documents", label: "Arsip Global", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/administrasi/approval-center", label: "Approval Center", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/administrasi/audit-log", label: "Audit Log", roles: ["PLATFORM_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/superadmin/keuangan",
    label: "Keuangan",
    icon: "Wallet",
    subItems: [
      { href: "/dashboard/superadmin/keuangan/struktur-biaya", label: "Struktur Biaya Global", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/keuangan/template-tagihan", label: "Template Tagihan", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/keuangan/monitoring", label: "Monitoring Keuangan Seluruh Unit", roles: ["PLATFORM_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/superadmin/komunikasi",
    label: "Komunikasi",
    icon: "MessageSquare",
    subItems: [
      { href: "/dashboard/announcements", label: "Pengumuman Global", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/messages", label: "Pesan Internal", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/komunikasi/helpdesk", label: "Helpdesk / Support", roles: ["PLATFORM_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/superadmin/laporan",
    label: "Laporan",
    icon: "BarChart3",
    subItems: [
      { href: "/dashboard/reports", label: "Laporan Akademik Global", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/laporan/user", label: "Laporan User", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/laporan/aktivitas", label: "Laporan Aktivitas", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/laporan/analytics", label: "Analytics Multi-Sekolah", roles: ["PLATFORM_ADMIN"] },
    ],
  },
  {
    href: "/dashboard/superadmin/pengaturan",
    label: "Pengaturan",
    icon: "Settings",
    subItems: [
      { href: "/dashboard/superadmin/pengaturan/branding", label: "Branding", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/pengaturan/domain", label: "Domain/Subdomain", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/pengaturan/integrasi", label: "Integrasi Sistem", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/pengaturan/backup", label: "Backup", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/pengaturan/keamanan", label: "Keamanan Sistem", roles: ["PLATFORM_ADMIN"] },
      { href: "/dashboard/superadmin/pengaturan/system-settings", label: "System Settings", roles: ["PLATFORM_ADMIN"] },
    ],
  },
];

export function filterMenuByRoles(roles: string[]): MenuItem[] {
  const set = new Set(roles);
  const menu = set.has("PLATFORM_ADMIN")
    ? SUPERADMIN_MENU
    : mergeMenuGroups([
        set.has("ACADEMIC_ADMIN") ? MENU_ADMIN : [],
        set.has("CHAIRMAN_FOUNDATION") ? MENU_KETUA_YAYASAN : [],
        set.has("PRINCIPAL") ? MENU_KEPALA_SEKOLAH : [],
        set.has("TEACHER") ? MENU_GURU_UMUM : [],
        set.has("TEACHER") ? MENU_GURU_MAPEL : [],
        set.has("HOMEROOM") ? MENU_GURU_WALI_KELAS : [],
        set.has("HEAD_PROGRAM") ? MENU_GURU_KURIKULUM : [],
        set.has("STUDENT_AFFAIRS") ? MENU_GURU_KESISWAAN : [],
        set.has("STUDENT") ? MENU_SISWA : [],
        set.has("COUNSELOR") ? MENU_BK : [],
        set.has("FINANCE") ? MENU_KEUANGAN : [],
      ]);
  
  const filtered = menu
    .map((menuGroup) => {
    // If the group has subItems, filter them
      if (menuGroup.subItems) {
        const filteredSubItems = menuGroup.subItems.filter((sub) => !sub.roles || sub.roles.some((r) => set.has(r)));
        if (filteredSubItems.length === 0) return null;
        return { ...menuGroup, subItems: filteredSubItems };
      }
    
    // If the group has its own roles, check them
      if (menuGroup.roles && !menuGroup.roles.some((r) => set.has(r))) {
        return null;
      }
    
      return menuGroup;
    })
    .filter(Boolean) as MenuItem[];

  return normalizeMenuItems(filtered);
}
