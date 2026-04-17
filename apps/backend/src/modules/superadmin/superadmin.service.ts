import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

type SchoolLite = { id: string; name: string };

function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

@Injectable()
export class SuperadminService {
  constructor(private prisma: PrismaService) {}

  async getSummary() {
    const schools = await this.prisma.school.findMany({ select: { id: true, name: true } });
    const schoolCount = schools.length;
    const userCount = await this.prisma.user.count();
    const activeUserCount = await this.prisma.user.count({ where: { isActive: true } });
    const classCount = await this.prisma.class.count();

    const studentUserIds = await this.prisma.userRole.findMany({
      where: { role: { code: 'STUDENT' } },
      select: { userId: true },
    });
    const studentIdSet = new Set(studentUserIds.map((x) => x.userId));

    const teacherRoleCodes = ['TEACHER', 'HOMEROOM', 'COUNSELOR', 'HEAD_PROGRAM', 'ACADEMIC_ADMIN', 'PRINCIPAL', 'FINANCE', 'STUDENT_AFFAIRS'];
    const teacherUserIds = await this.prisma.userRole.findMany({
      where: { role: { code: { in: teacherRoleCodes } } },
      select: { userId: true },
    });
    const teacherIdSet = new Set(teacherUserIds.map((x) => x.userId));

    const attempts = await this.prisma.quizAttempt.findMany({
      select: { score: true, passed: true, student: { select: { schoolId: true } } },
      take: 5000,
    });

    const avgScore = attempts.length ? sum(attempts.map((a) => a.score)) / attempts.length : 0;
    const masteryRate = attempts.length ? (attempts.filter((a) => a.passed).length / attempts.length) * 100 : 0;

    const students = await this.prisma.user.findMany({
      where: { id: { in: Array.from(studentIdSet) } },
      select: { id: true, schoolId: true },
    });
    const studentCountBySchoolId = new Map<string, number>();
    for (const s of students) {
      if (!s.schoolId) continue;
      studentCountBySchoolId.set(s.schoolId, (studentCountBySchoolId.get(s.schoolId) ?? 0) + 1);
    }

    const assumedMonthlyFee = 250_000;
    const incomeTotal = studentIdSet.size * assumedMonthlyFee;
    const paymentsTotal = Math.round(incomeTotal * 0.85);
    const arrearsTotal = incomeTotal - paymentsTotal;

    const unitFinance = schools.map((school) => {
      const studentsInUnit = studentCountBySchoolId.get(school.id) ?? 0;
      const proportion = studentIdSet.size > 0 ? studentsInUnit / studentIdSet.size : schoolCount > 0 ? 1 / schoolCount : 0;
      const income = Math.round(incomeTotal * proportion);
      const payments = Math.round(paymentsTotal * proportion);
      const arrears = income - payments;
      return { school, students: studentsInUnit, income, payments, arrears };
    });

    return {
      totals: {
        schoolCount,
        userCount,
        activeUserCount,
        studentCount: studentIdSet.size,
        teacherCount: teacherIdSet.size,
        classCount,
      },
      learning: {
        avgScore: round(avgScore, 2),
        masteryRatePercent: round(masteryRate, 2),
        attempts: attempts.length,
      },
      finance: {
        paymentsTotal,
        arrearsTotal,
        incomeTotal,
        unitFinance,
      },
      updatedAt: new Date().toISOString(),
    };
  }

  async getNotifications() {
    return {
      rows: [
        { id: 'NTF-001', severity: 'HIGH', title: 'Jadwal belum difinalisasi', detail: 'Ada unit yang belum finalisasi jadwal semester ini.' },
        { id: 'NTF-002', severity: 'MEDIUM', title: 'Tunggakan > 60 hari', detail: 'Ada siswa menunggak lebih dari 60 hari.' },
        { id: 'NTF-003', severity: 'LOW', title: 'Backup berhasil', detail: 'Backup harian selesai tanpa error.' },
        { id: 'NTF-004', severity: 'HIGH', title: 'Login gagal berulang', detail: 'Terdeteksi percobaan login gagal berulang.' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Notifikasi sistem belum punya modul database; data ini placeholder.',
    };
  }

  async getCalendarGlobal() {
    return {
      rows: [
        { id: 'CAL-001', title: 'MPLS', date: '2026-07-15' },
        { id: 'CAL-002', title: 'UTS', date: '2026-09-10' },
        { id: 'CAL-003', title: 'UAS', date: '2026-12-05' },
        { id: 'CAL-004', title: 'Pembagian Rapor', date: '2026-12-20' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Kalender akademik global belum punya modul database; data ini placeholder.',
    };
  }

  async getKurikulum() {
    return {
      rows: [
        { id: 'KUR-001', name: 'Kurikulum Merdeka SMK', status: 'AKTIF' },
        { id: 'KUR-002', name: 'Kurikulum Internal Yayasan', status: 'AKTIF' },
        { id: 'KUR-003', name: 'Kurikulum Industri Mitra', status: 'DRAFT' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Master kurikulum belum punya modul database; data ini placeholder.',
    };
  }

  async getRombelTemplate() {
    return {
      rows: [
        { id: 'RBL-001', name: 'X RPL 1', level: 'X', department: 'RPL' },
        { id: 'RBL-002', name: 'X RPL 2', level: 'X', department: 'RPL' },
        { id: 'RBL-003', name: 'XI TKJ 1', level: 'XI', department: 'TKJ' },
        { id: 'RBL-004', name: 'XII MM 1', level: 'XII', department: 'MM' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Template rombel belum punya modul database; data ini placeholder.',
    };
  }

  async getKalenderTemplate() {
    return {
      rows: [
        { id: 'KLT-001', name: 'Kalender SMK Reguler', status: 'AKTIF' },
        { id: 'KLT-002', name: 'Kalender Boarding', status: 'DRAFT' },
        { id: 'KLT-003', name: 'Kalender Industri Intensif', status: 'DRAFT' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Template kalender belum punya modul database; data ini placeholder.',
    };
  }

  async getJenjang() {
    return {
      rows: [
        { id: 'LVL-001', name: 'SMK' },
        { id: 'LVL-002', name: 'SMA' },
        { id: 'LVL-003', name: 'SMP' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Master jenjang belum punya modul database; data ini placeholder.',
    };
  }

  async getFaseTingkat() {
    return {
      rows: [
        { id: 'PH-001', name: 'Kelas X', level: 'X' },
        { id: 'PH-002', name: 'Kelas XI', level: 'XI' },
        { id: 'PH-003', name: 'Kelas XII', level: 'XII' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Master fase/tingkat belum punya modul database; data ini placeholder.',
    };
  }

  async getAssessmentSystem() {
    return {
      components: [
        { key: 'pengetahuan', weightPercent: 30 },
        { key: 'keterampilan', weightPercent: 50 },
        { key: 'sikap', weightPercent: 20 },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Sistem penilaian global belum punya modul database; data ini placeholder.',
    };
  }

  async getReportTemplates() {
    return {
      rows: [
        { id: 'RPT-001', name: 'Template Rapor SMK A4 Portrait', status: 'AKTIF' },
        { id: 'RPT-002', name: 'Template eRapor Yayasan', status: 'AKTIF' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Template rapor global belum punya modul database; data ini placeholder.',
    };
  }

  async getGradePredicates() {
    return {
      rows: [
        { id: 'GRD-A', grade: 'A', min: 90, max: 100 },
        { id: 'GRD-B', grade: 'B', min: 80, max: 89 },
        { id: 'GRD-C', grade: 'C', min: 70, max: 79 },
        { id: 'GRD-D', grade: 'D', min: 0, max: 69 },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Master predikat nilai belum punya modul database; data ini placeholder.',
    };
  }

  async getAssessmentTypes() {
    return {
      rows: [
        { id: 'AT-001', name: 'Tugas Harian' },
        { id: 'AT-002', name: 'Quiz' },
        { id: 'AT-003', name: 'UTS' },
        { id: 'AT-004', name: 'UAS' },
        { id: 'AT-005', name: 'Praktik' },
        { id: 'AT-006', name: 'Proyek' },
        { id: 'AT-007', name: 'Portofolio' },
        { id: 'AT-008', name: 'Observasi Sikap' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Master jenis penilaian belum punya modul database; data ini placeholder.',
    };
  }

  async getKkmRules() {
    return {
      rows: [
        { id: 'KKM-001', name: 'KKM Umum', value: 75 },
        { id: 'KKM-002', name: 'KKM Produktif', value: 78 },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Aturan KKM/Ketuntasan belum punya modul database; data ini placeholder.',
    };
  }

  async getGraduationRules() {
    return {
      rules: [
        { key: 'kehadiran_min', value: '80%' },
        { key: 'nilai_rata_min', value: '75' },
        { key: 'tunggakan', value: 'Tidak ada tunggakan administrasi tertentu' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Aturan kelulusan global belum punya modul database; data ini placeholder.',
    };
  }

  async getGlobalQuestionBank() {
    return {
      rows: [
        { id: 'QB-001', subject: 'Matematika', questionCount: 500 },
        { id: 'QB-002', subject: 'Bahasa Inggris', questionCount: 300 },
        { id: 'QB-003', subject: 'TKJ Dasar', questionCount: 250 },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Bank soal global belum punya modul database; data ini placeholder.',
    };
  }

  async getStudentStatuses() {
    return {
      rows: [
        { id: 'STS-001', name: 'Aktif' },
        { id: 'STS-002', name: 'Cuti' },
        { id: 'STS-003', name: 'Mutasi Masuk' },
        { id: 'STS-004', name: 'Mutasi Keluar' },
        { id: 'STS-005', name: 'Alumni' },
        { id: 'STS-006', name: 'Dropout' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Status siswa global belum punya modul database; data ini placeholder.',
    };
  }

  async getGlobalStudents() {
    const users = await this.prisma.user.findMany({
      where: { userRoles: { some: { role: { code: 'STUDENT' } } } },
      select: { id: true, name: true, email: true, schoolId: true, school: { select: { id: true, name: true } }, isActive: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return {
      rows: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        school: u.school,
        isActive: u.isActive,
        createdAt: u.createdAt.toISOString(),
      })),
      updatedAt: new Date().toISOString(),
    };
  }

  async getAlumni() {
    return {
      rows: [
        { id: 'ALM-2025', year: 2025, studentCount: 320 },
        { id: 'ALM-2024', year: 2024, studentCount: 295 },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Alumni belum punya modul database; data ini placeholder.',
    };
  }

  async getMutations() {
    return {
      rows: [
        { id: 'MTS-001', type: 'KELUAR', count: 12, period: '2026' },
        { id: 'MTS-002', type: 'MASUK', count: 8, period: '2026' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Mutasi belum punya modul database; data ini placeholder.',
    };
  }

  async getStudentAchievements() {
    return {
      rows: [
        { id: 'ACH-001', category: 'Akademik', name: 'Olimpiade Matematika' },
        { id: 'ACH-002', category: 'Non Akademik', name: 'Lomba Basket' },
        { id: 'ACH-003', category: 'Sertifikasi', name: 'Sertifikasi Junior Programmer' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Prestasi siswa global belum punya modul database; data ini placeholder.',
    };
  }

  async getStudentViolations() {
    return {
      rows: [
        { id: 'VIO-001', category: 'Ringan', name: 'Terlambat' },
        { id: 'VIO-002', category: 'Sedang', name: 'Tidak mengerjakan tugas berulang' },
        { id: 'VIO-003', category: 'Berat', name: 'Merokok' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Kategori pelanggaran global belum punya modul database; data ini placeholder.',
    };
  }

  async getStudentRules() {
    return {
      rows: [
        { id: 'RUL-001', rule: 'Terlambat', points: 5 },
        { id: 'RUL-002', rule: 'Alpha', points: 10 },
        { id: 'RUL-003', rule: 'Merokok', points: 25 },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Tata tertib global belum punya modul database; data ini placeholder.',
    };
  }

  async getFoundationAndUnits() {
    const schools = await this.prisma.school.findMany({ select: { id: true, name: true, isActive: true } });
    return {
      foundation: { id: 'FDN-001', name: 'Yayasan Pendidikan Nusantara', code: 'YPN001' },
      units: schools.map((s) => ({ id: s.id, name: s.name, isActive: s.isActive })),
      updatedAt: new Date().toISOString(),
      note: 'Yayasan belum ada model DB khusus; data yayasan placeholder, unit diambil dari tabel School.',
    };
  }

  async getMasterSdm() {
    const roleCodes = ['TEACHER', 'COUNSELOR', 'FINANCE', 'ACADEMIC_ADMIN', 'PRINCIPAL', 'STUDENT_AFFAIRS'];
    const roles = await this.prisma.role.findMany({
      where: { code: { in: roleCodes } },
      select: { code: true, userRoles: { select: { userId: true } } },
    });
    const counts = Object.fromEntries(roles.map((r) => [r.code, new Set(r.userRoles.map((x) => x.userId)).size]));
    return {
      metrics: {
        teacher: counts.TEACHER ?? 0,
        counselor: counts.COUNSELOR ?? 0,
        finance: counts.FINANCE ?? 0,
        admin: counts.ACADEMIC_ADMIN ?? 0,
        principal: counts.PRINCIPAL ?? 0,
        studentAffairs: counts.STUDENT_AFFAIRS ?? 0,
      },
      updatedAt: new Date().toISOString(),
    };
  }

  async getApprovalCenter() {
    return {
      rows: [
        { id: 'APR-001', type: 'Approval Jadwal', status: 'MENUNGGU', unit: 'SMK' },
        { id: 'APR-002', type: 'Approval Rapor', status: 'MENUNGGU', unit: 'SMA' },
        { id: 'APR-003', type: 'Approval Struktur Biaya', status: 'DISETUJUI', unit: 'SMK' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Approval center belum punya modul database; data ini placeholder.',
    };
  }

  async getSubroles() {
    return {
      rows: [
        { id: 'SUB-001', role: 'TEACHER', code: 'matapelajaran', name: 'Guru Mata Pelajaran' },
        { id: 'SUB-002', role: 'TEACHER', code: 'walikelas', name: 'Wali Kelas' },
        { id: 'SUB-003', role: 'TEACHER', code: 'kurikulum', name: 'Kurikulum' },
        { id: 'SUB-004', role: 'TEACHER', code: 'kesiswaan', name: 'Kesiswaan' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Subrole belum punya modul database; data ini placeholder.',
    };
  }

  async getPositions() {
    return {
      rows: [
        { id: 'POS-001', name: 'Ketua Yayasan' },
        { id: 'POS-002', name: 'Kepala Sekolah' },
        { id: 'POS-003', name: 'Wakasek Kurikulum' },
        { id: 'POS-004', name: 'Guru' },
        { id: 'POS-005', name: 'BK' },
        { id: 'POS-006', name: 'Staff Keuangan' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Master jabatan belum punya modul database; data ini placeholder.',
    };
  }

  async getDocumentTemplates() {
    return {
      rows: [
        { id: 'DT-001', title: 'Kop Surat Yayasan', status: 'AKTIF' },
        { id: 'DT-002', title: 'Template Surat Aktif Sekolah', status: 'AKTIF' },
        { id: 'DT-003', title: 'Template Surat Mutasi', status: 'DRAFT' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Master dokumen/template belum punya modul database; data ini placeholder.',
    };
  }

  async getAuditLog() {
    const logs = await this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 80,
      include: { user: { select: { id: true, name: true, email: true } } },
    });
    return {
      rows: logs.map((l) => ({
        id: l.id,
        at: l.createdAt.toISOString(),
        actor: l.user ? { id: l.user.id, name: l.user.name, email: l.user.email } : null,
        action: l.action,
        method: l.method,
        path: l.path,
        statusCode: l.statusCode,
        entityType: l.entityType,
        entityId: l.entityId,
      })),
      updatedAt: new Date().toISOString(),
    };
  }

  async getFinanceMonitoring() {
    const base = await this.getSummary();
    return {
      totals: base.finance,
      updatedAt: base.updatedAt,
      note: 'Monitoring keuangan global masih estimasi berbasis jumlah siswa (belum ada modul pembayaran).',
    };
  }

  async getFeeTypes() {
    return {
      rows: [
        { id: 'FEE-001', code: 'SPP', name: 'SPP Bulanan', frequency: 'BULANAN' },
        { id: 'FEE-002', code: 'DAF', name: 'Daftar Ulang', frequency: 'TAHUNAN' },
        { id: 'FEE-003', code: 'PRK', name: 'Praktikum', frequency: 'SEMESTER' },
        { id: 'FEE-004', code: 'UJN', name: 'Ujian Semester', frequency: 'SEMESTER' },
        { id: 'FEE-005', code: 'SRG', name: 'Seragam', frequency: 'SEKALI' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Jenis biaya belum punya modul database; data ini placeholder.',
    };
  }

  async getFeeStructure() {
    return {
      rows: [
        { id: 'FS-001', unit: 'SMK', feeType: 'SPP', amount: 450000, period: 'Bulanan' },
        { id: 'FS-002', unit: 'SMK', feeType: 'PRK', amount: 150000, period: 'Semester' },
        { id: 'FS-003', unit: 'SMA', feeType: 'SPP', amount: 400000, period: 'Bulanan' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Struktur biaya global belum punya modul database; data ini placeholder.',
    };
  }

  async getBillingTemplates() {
    return {
      rows: [
        { id: 'BIL-001', name: 'Tagihan Bulanan SPP', frequency: 'BULANAN', status: 'AKTIF' },
        { id: 'BIL-002', name: 'Tagihan Semester Praktikum', frequency: 'SEMESTER', status: 'AKTIF' },
        { id: 'BIL-003', name: 'Tagihan Tahunan Daftar Ulang', frequency: 'TAHUNAN', status: 'DRAFT' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Template tagihan belum punya modul database; data ini placeholder.',
    };
  }

  async getPaymentSettings() {
    return {
      rows: [
        { id: 'PAY-001', channel: 'Transfer BCA', status: 'AKTIF' },
        { id: 'PAY-002', channel: 'Mandiri VA', status: 'DRAFT' },
        { id: 'PAY-003', channel: 'QRIS Yayasan', status: 'AKTIF' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Payment settings belum punya modul database; data ini placeholder.',
    };
  }

  async getIncomeRecap() {
    const base = await this.getSummary();
    return {
      rows: base.finance.unitFinance.map((x: { school: SchoolLite; payments: number }) => ({
        id: x.school.id,
        school: x.school,
        payments: x.payments,
      })),
      totals: { paymentsTotal: base.finance.paymentsTotal },
      updatedAt: base.updatedAt,
      note: 'Rekap pemasukan menggunakan estimasi pembayaran dari summary.',
    };
  }

  async getArrearsMonitoring() {
    const base = await this.getSummary();
    const rows = base.finance.unitFinance
      .map((x: { school: SchoolLite; students: number; arrears: number }) => ({
        id: x.school.id,
        school: x.school,
        students: x.students,
        arrears: x.arrears,
        arrearsStudents: Math.max(0, Math.round(x.students * 0.09)),
      }))
      .sort((a: any, b: any) => b.arrears - a.arrears);
    return {
      rows,
      totals: { arrearsTotal: base.finance.arrearsTotal },
      updatedAt: base.updatedAt,
      note: 'Monitoring tunggakan masih estimasi berbasis jumlah siswa.',
    };
  }

  async getDiscountScholarships() {
    return {
      rows: [
        { id: 'DSC-001', name: 'Beasiswa Prestasi', value: '50%', status: 'AKTIF' },
        { id: 'DSC-002', name: 'Keringanan Yatim', value: '25%', status: 'AKTIF' },
        { id: 'DSC-003', name: 'Diskon Saudara Kandung', value: '10%', status: 'DRAFT' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Diskon/beasiswa belum punya modul database; data ini placeholder.',
    };
  }

  async getHelpdesk() {
    return {
      rows: [
        { id: 'TCK-1001', title: 'Tidak bisa upload nilai', status: 'OPEN', unit: 'SMK' },
        { id: 'TCK-1002', title: 'Tagihan ganda', status: 'IN_PROGRESS', unit: 'SMA' },
        { id: 'TCK-1003', title: 'Reset password massal', status: 'DONE', unit: 'SMP' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Helpdesk/ticketing belum punya modul database; data ini placeholder.',
    };
  }

  async getNotificationTemplates() {
    return {
      rows: [
        { id: 'TPL-001', name: 'Notifikasi Tagihan Jatuh Tempo', channel: 'WA', status: 'AKTIF' },
        { id: 'TPL-002', name: 'Notifikasi Tugas Baru', channel: 'IN_APP', status: 'AKTIF' },
        { id: 'TPL-003', name: 'Notifikasi Approval', channel: 'EMAIL', status: 'DRAFT' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Template notifikasi belum punya modul database; data ini placeholder.',
    };
  }

  async getMessagingGateway() {
    return {
      rows: [
        { id: 'GW-001', name: 'Email SMTP', status: 'DISABLED' },
        { id: 'GW-002', name: 'WhatsApp Gateway', status: 'DISABLED' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Gateway komunikasi belum punya modul database; data ini placeholder.',
    };
  }

  private async getStudentCountBySchool(): Promise<Map<string, number>> {
    const studentUsers = await this.prisma.user.findMany({
      where: { userRoles: { some: { role: { code: 'STUDENT' } } } },
      select: { schoolId: true },
    });
    const map = new Map<string, number>();
    for (const u of studentUsers) {
      if (!u.schoolId) continue;
      map.set(u.schoolId, (map.get(u.schoolId) ?? 0) + 1);
    }
    return map;
  }

  async getUserReport() {
    const schools = await this.prisma.school.findMany({ select: { id: true, name: true } });
    const studentsBySchool = await this.getStudentCountBySchool();
    const rows = await Promise.all(
      schools.map(async (s) => {
        const usersTotal = await this.prisma.user.count({ where: { schoolId: s.id } });
        const activeUsers = await this.prisma.user.count({ where: { schoolId: s.id, isActive: true } });
        return {
          school: s,
          usersTotal,
          activeUsers,
          inactiveUsers: usersTotal - activeUsers,
          students: studentsBySchool.get(s.id) ?? 0,
        };
      }),
    );
    rows.sort((a, b) => b.usersTotal - a.usersTotal);
    return { rows, updatedAt: new Date().toISOString() };
  }

  async getActivityReport() {
    const logs = await this.prisma.auditLog.findMany({
      where: { createdAt: { gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000) } },
      select: { action: true },
      take: 2000,
    });
    const byAction = new Map<string, number>();
    for (const l of logs) byAction.set(l.action, (byAction.get(l.action) ?? 0) + 1);
    const rows = Array.from(byAction.entries())
      .map(([action, count]) => ({ action, count }))
      .sort((a, b) => b.count - a.count);
    return { rows, updatedAt: new Date().toISOString(), note: 'Laporan aktivitas diambil dari audit log 7 hari terakhir.' };
  }

  async getAnalytics() {
    const schools = await this.prisma.school.findMany({ select: { id: true, name: true } });
    const studentsBySchool = await this.getStudentCountBySchool();

    const attempts = await this.prisma.quizAttempt.findMany({
      select: { score: true, passed: true, student: { select: { schoolId: true } } },
      take: 5000,
    });
    const bySchool = new Map<string, { scores: number[]; passed: number; total: number }>();
    for (const a of attempts) {
      const schoolId = a.student.schoolId;
      if (!schoolId) continue;
      const entry = bySchool.get(schoolId) ?? { scores: [], passed: 0, total: 0 };
      entry.scores.push(a.score);
      entry.passed += a.passed ? 1 : 0;
      entry.total += 1;
      bySchool.set(schoolId, entry);
    }

    const rows = schools.map((s) => {
      const entry = bySchool.get(s.id);
      const avgScore = entry?.scores.length ? sum(entry.scores) / entry.scores.length : 0;
      const passRate = entry?.total ? (entry.passed / entry.total) * 100 : 0;
      return {
        school: s,
        students: studentsBySchool.get(s.id) ?? 0,
        avgScore: round(avgScore, 2),
        passRate: round(passRate, 2),
      };
    });
    rows.sort((a, b) => b.students - a.students);
    return { rows, updatedAt: new Date().toISOString(), note: 'Analytics menggunakan data siswa dan quiz attempt (jika ada).' };
  }

  async getExecutiveAnalytics() {
    const base = await this.getSummary();
    return {
      kpis: {
        schools: base.totals.schoolCount,
        students: base.totals.studentCount,
        teachers: base.totals.teacherCount,
        paymentsTotal: base.finance.paymentsTotal,
        arrearsTotal: base.finance.arrearsTotal,
      },
      updatedAt: base.updatedAt,
      note: 'Executive analytics masih ringkasan dari summary.',
    };
  }

  async getAcademicGlobalReport() {
    const analytics = await this.getAnalytics();
    return {
      title: 'Laporan Akademik Global',
      generatedAt: new Date().toISOString(),
      rows: analytics.rows,
      updatedAt: analytics.updatedAt,
      note: 'Laporan akademik global menggunakan data analytics (siswa & quiz attempt).',
    };
  }

  async getAssessmentGlobalReport() {
    return {
      title: 'Laporan Penilaian Global',
      generatedAt: new Date().toISOString(),
      sections: [
        { key: 'ketuntasan', title: 'Ketuntasan', summary: 'Ringkasan ketuntasan (placeholder).' },
        { key: 'mapel', title: 'Mapel', summary: 'Mapel remedial tertinggi (placeholder).' },
      ],
      note: 'Laporan penilaian global belum punya modul database; data ini placeholder.',
    };
  }

  async getStudentGlobalReport() {
    return {
      title: 'Laporan Siswa Global',
      generatedAt: new Date().toISOString(),
      sections: [
        { key: 'aktif', title: 'Siswa Aktif', summary: 'Statistik siswa aktif per unit (placeholder).' },
        { key: 'mutasi', title: 'Mutasi', summary: 'Ringkasan mutasi (placeholder).' },
        { key: 'alumni', title: 'Alumni', summary: 'Ringkasan alumni (placeholder).' },
      ],
      note: 'Laporan siswa global belum punya modul database; data ini placeholder.',
    };
  }

  async getTeacherStaffGlobalReport() {
    const sdm = await this.getMasterSdm();
    return {
      title: 'Laporan Guru & Staff',
      generatedAt: new Date().toISOString(),
      metrics: sdm.metrics,
      updatedAt: sdm.updatedAt,
      note: 'Laporan guru & staff menggunakan ringkasan role user.',
    };
  }

  async getFinanceGlobalReport() {
    const finance = await this.getFinanceMonitoring();
    return {
      title: 'Laporan Keuangan Global',
      generatedAt: new Date().toISOString(),
      totals: finance.totals,
      updatedAt: finance.updatedAt,
      note: finance.note,
    };
  }

  async getBranding() {
    return {
      branding: {
        platformName: 'NalarEdu',
        primaryColor: '#2563eb',
        logo: null,
        favicon: null,
      },
      updatedAt: new Date().toISOString(),
      note: 'Branding belum tersimpan di database; data ini placeholder.',
    };
  }

  async getDomainSettings() {
    return {
      rows: [
        { id: 'DOM-001', subdomain: 'smk.nalaredu.id', unit: 'SMK' },
        { id: 'DOM-002', subdomain: 'sma.nalaredu.id', unit: 'SMA' },
        { id: 'DOM-003', subdomain: 'yayasan.nalaredu.id', unit: 'Yayasan' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Pengaturan domain belum punya modul database; data ini placeholder.',
    };
  }

  async getIntegrations() {
    return {
      rows: [
        { id: 'INT-001', name: 'SMTP', status: 'DISABLED' },
        { id: 'INT-002', name: 'WhatsApp Gateway', status: 'DISABLED' },
        { id: 'INT-003', name: 'Payment Gateway', status: 'DISABLED' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Integrasi belum punya modul database; data ini placeholder.',
    };
  }

  async getBackupSettings() {
    return {
      backup: { schedule: '02:00', retentionDays: 7, lastBackupAt: null },
      updatedAt: new Date().toISOString(),
      note: 'Backup & restore belum punya modul database; data ini placeholder.',
    };
  }

  async getSecuritySettings() {
    return {
      security: { passwordMinLength: 8, twoFactorEnabled: false, sessionTimeoutMinutes: 30 },
      updatedAt: new Date().toISOString(),
      note: 'Keamanan sistem belum punya modul database; data ini placeholder.',
    };
  }

  async getSystemSettings() {
    return {
      settings: { timezone: 'Asia/Jakarta', locale: 'id-ID', dateFormat: 'dd-MM-yyyy' },
      updatedAt: new Date().toISOString(),
      note: 'System settings belum punya modul database; data ini placeholder.',
    };
  }

  async getGeneralSettings() {
    return {
      settings: { locale: 'id-ID', timezone: 'Asia/Jakarta' },
      updatedAt: new Date().toISOString(),
      note: 'Pengaturan umum belum tersimpan di database; data ini placeholder.',
    };
  }

  async getMenuConfig() {
    return {
      config: {
        teacherHideFinance: true,
        studentLimitedToStudentMenu: true,
      },
      updatedAt: new Date().toISOString(),
      note: 'Konfigurasi menu per role belum tersimpan di database; data ini placeholder.',
    };
  }

  async getFeatureToggle() {
    return {
      rows: [
        { id: 'FT-001', key: 'PKL', enabled: true },
        { id: 'FT-002', key: 'ALUMNI', enabled: true },
        { id: 'FT-003', key: 'AR_VR', enabled: false },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Feature toggle belum tersimpan di database; data ini placeholder.',
    };
  }

  async getApiWebhookSettings() {
    return {
      rows: [
        { id: 'API-001', name: 'API Key (Sandbox)', status: 'DISABLED' },
        { id: 'WB-001', name: 'Webhook Pembayaran', status: 'DISABLED' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'API & webhook belum tersimpan di database; data ini placeholder.',
    };
  }

  async getErrorMonitoring() {
    return {
      rows: [
        { id: 'ERR-001', title: 'Login error spikes', severity: 'MEDIUM', status: 'OPEN' },
        { id: 'ERR-002', title: 'Upload timeout', severity: 'LOW', status: 'OPEN' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Error monitoring belum tersimpan di database; data ini placeholder.',
    };
  }
}
