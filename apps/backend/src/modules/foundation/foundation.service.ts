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

function clamp(value: number, min: number, max: number) {
  return Math.max(min, Math.min(max, value));
}

@Injectable()
export class FoundationService {
  constructor(private prisma: PrismaService) {}

  async getExecutiveSummary() {
    const schools = await this.prisma.school.findMany({ select: { id: true, name: true } });
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

    const students = await this.prisma.user.findMany({
      where: { id: { in: Array.from(studentIdSet) } },
      select: { id: true, schoolId: true },
    });

    const studentCountBySchoolId = new Map<string, number>();
    for (const s of students) {
      if (!s.schoolId) continue;
      studentCountBySchoolId.set(s.schoolId, (studentCountBySchoolId.get(s.schoolId) ?? 0) + 1);
    }

    const totalStudents = studentIdSet.size;
    const totalTeachers = teacherIdSet.size;
    const unitCount = schools.length;

    const assumedMonthlyFee = 250_000;
    const incomeTotal = totalStudents * assumedMonthlyFee;
    const arrearsTotal = Math.round(incomeTotal * 0.17);
    const expenseTotal = Math.round(incomeTotal * 0.73);
    const netTotal = incomeTotal - expenseTotal;

    const unitFinance = schools.map((school) => {
      const studentsInUnit = studentCountBySchoolId.get(school.id) ?? 0;
      const proportion = totalStudents > 0 ? studentsInUnit / totalStudents : unitCount > 0 ? 1 / unitCount : 0;
      const income = Math.round(incomeTotal * proportion);
      const expense = Math.round(expenseTotal * proportion);
      const arrears = Math.round(arrearsTotal * proportion);
      return { school, students: studentsInUnit, income, expense, arrears };
    });

    return {
      totals: {
        unitCount,
        studentCount: totalStudents,
        teacherCount: totalTeachers,
        classCount,
      },
      finance: {
        incomeTotal,
        expenseTotal,
        arrearsTotal,
        netTotal,
        unitFinance,
      },
      schools,
      updatedAt: new Date().toISOString(),
    };
  }

  async getAcademicMonitoring() {
    const attempts = await this.prisma.quizAttempt.findMany({
      select: {
        score: true,
        passed: true,
        student: { select: { schoolId: true, school: { select: { id: true, name: true } } } },
      },
    });

    const bySchool = new Map<string, { school: SchoolLite; scores: number[]; passedCount: number; total: number }>();

    for (const a of attempts) {
      const schoolId = a.student.schoolId;
      if (!schoolId) continue;
      const school = a.student.school ?? { id: schoolId, name: schoolId };
      const entry = bySchool.get(schoolId) ?? { school, scores: [], passedCount: 0, total: 0 };
      entry.scores.push(a.score);
      entry.passedCount += a.passed ? 1 : 0;
      entry.total += 1;
      bySchool.set(schoolId, entry);
    }

    const rows = Array.from(bySchool.values()).map((x) => {
      const avgScore = x.scores.length ? sum(x.scores) / x.scores.length : 0;
      const passRate = x.total ? (x.passedCount / x.total) * 100 : 0;
      return {
        school: x.school,
        avgScore: round(avgScore, 2),
        passRate: round(passRate, 2),
        attempts: x.total,
      };
    });

    rows.sort((a, b) => b.avgScore - a.avgScore);

    return { rows, updatedAt: new Date().toISOString() };
  }

  async getCurriculumMonitoring() {
    const schools = await this.prisma.school.count();
    const recentLessonCount = await this.prisma.lesson.count({
      where: { createdAt: { gte: new Date(Date.now() - 30 * 24 * 60 * 60 * 1000) } },
    });

    const journalCompletionPercent = clamp(70 + Math.min(25, Math.round((recentLessonCount / 25) * 25)), 70, 98);

    return {
      unitsWithCurriculumActive: schools,
      journalCompletionPercent,
      note: 'Keterisian jurnal guru belum memiliki modul khusus; angka ini estimasi berbasis aktivitas konten (lesson) 30 hari terakhir.',
      updatedAt: new Date().toISOString(),
    };
  }

  async getAssessmentMonitoring() {
    const attempts = await this.prisma.quizAttempt.findMany({
      select: {
        passed: true,
        student: { select: { schoolId: true, school: { select: { id: true, name: true } } } },
      },
    });

    const bySchool = new Map<string, { school: SchoolLite; passed: number; total: number }>();

    for (const a of attempts) {
      const schoolId = a.student.schoolId;
      if (!schoolId) continue;
      const school = a.student.school ?? { id: schoolId, name: schoolId };
      const entry = bySchool.get(schoolId) ?? { school, passed: 0, total: 0 };
      entry.passed += a.passed ? 1 : 0;
      entry.total += 1;
      bySchool.set(schoolId, entry);
    }

    const rows = Array.from(bySchool.values()).map((x) => {
      const masteryRate = x.total ? (x.passed / x.total) * 100 : 0;
      return { school: x.school, masteryRate: round(masteryRate, 2), attempts: x.total };
    });

    rows.sort((a, b) => b.masteryRate - a.masteryRate);

    return { rows, updatedAt: new Date().toISOString() };
  }

  async getGraduationMonitoring() {
    const schools = await this.prisma.school.findMany({ select: { id: true, name: true } });
    const base = 98;
    return {
      rows: schools.map((s, idx) => ({
        school: s,
        graduationRate: clamp(base + (idx % 3) - 1, 95, 100),
      })),
      note: 'Kelulusan belum memiliki modul data khusus; saat ini menggunakan angka placeholder.',
      updatedAt: new Date().toISOString(),
    };
  }

  async getStudentMonitoring() {
    const students = await this.prisma.user.findMany({
      where: { userRoles: { some: { role: { code: 'STUDENT' } } } },
      select: { id: true, isActive: true, schoolId: true, school: { select: { id: true, name: true } } },
    });

    const bySchool = new Map<string, { school: SchoolLite; active: number; total: number }>();
    for (const u of students) {
      const schoolId = u.schoolId;
      if (!schoolId) continue;
      const school = u.school ?? { id: schoolId, name: schoolId };
      const entry = bySchool.get(schoolId) ?? { school, active: 0, total: 0 };
      entry.total += 1;
      entry.active += u.isActive ? 1 : 0;
      bySchool.set(schoolId, entry);
    }

    const rows = Array.from(bySchool.values()).map((x) => ({
      school: x.school,
      totalStudents: x.total,
      activeStudents: x.active,
      inactiveStudents: x.total - x.active,
    }));

    rows.sort((a, b) => b.totalStudents - a.totalStudents);
    return { rows, updatedAt: new Date().toISOString() };
  }

  async getHrdMonitoring() {
    const teacherRoleCodes = ['TEACHER', 'HOMEROOM', 'COUNSELOR', 'HEAD_PROGRAM', 'ACADEMIC_ADMIN', 'PRINCIPAL'];
    const teachers = await this.prisma.user.findMany({
      where: { userRoles: { some: { role: { code: { in: teacherRoleCodes } } } } },
      select: { id: true, schoolId: true, school: { select: { id: true, name: true } } },
    });

    const bySchool = new Map<string, { school: SchoolLite; total: number }>();
    for (const u of teachers) {
      const schoolId = u.schoolId;
      if (!schoolId) continue;
      const school = u.school ?? { id: schoolId, name: schoolId };
      const entry = bySchool.get(schoolId) ?? { school, total: 0 };
      entry.total += 1;
      bySchool.set(schoolId, entry);
    }

    const rows = Array.from(bySchool.values()).map((x) => ({
      school: x.school,
      teacherAndStaffCount: x.total,
    }));
    rows.sort((a, b) => b.teacherAndStaffCount - a.teacherAndStaffCount);
    return { rows, updatedAt: new Date().toISOString() };
  }

  async getAuditSummary() {
    const logs = await this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 50,
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

  async getFinanceSummary() {
    const base = await this.getExecutiveSummary();
    return {
      totals: base.finance,
      updatedAt: base.updatedAt,
      note: 'Modul keuangan detail belum tersedia; ringkasan ini estimasi berbasis jumlah siswa.',
    };
  }

  async getFinanceIncome() {
    const base = await this.getExecutiveSummary();
    return {
      rows: base.finance.unitFinance.map((x) => ({ school: x.school, income: x.income, students: x.students })),
      totals: { incomeTotal: base.finance.incomeTotal },
      updatedAt: base.updatedAt,
    };
  }

  async getFinanceExpense() {
    const base = await this.getExecutiveSummary();
    return {
      rows: base.finance.unitFinance.map((x) => ({ school: x.school, expense: x.expense, students: x.students })),
      totals: { expenseTotal: base.finance.expenseTotal },
      updatedAt: base.updatedAt,
    };
  }

  async getFinanceArrears() {
    const base = await this.getExecutiveSummary();
    return {
      rows: base.finance.unitFinance.map((x) => ({ school: x.school, arrears: x.arrears, students: x.students })),
      totals: { arrearsTotal: base.finance.arrearsTotal },
      updatedAt: base.updatedAt,
    };
  }

  async getFinanceCashflow() {
    const base = await this.getExecutiveSummary();
    return {
      totals: {
        incomeTotal: base.finance.incomeTotal,
        expenseTotal: base.finance.expenseTotal,
        arrearsTotal: base.finance.arrearsTotal,
        netTotal: base.finance.netTotal,
      },
      rows: base.finance.unitFinance.map((x) => ({
        school: x.school,
        income: x.income,
        expense: x.expense,
        arrears: x.arrears,
        net: x.income - x.expense,
      })),
      updatedAt: base.updatedAt,
    };
  }

  async getApprovals() {
    return {
      rows: [
        { id: 'APR-001', type: 'Perubahan Struktur Biaya', unit: 'SMK', status: 'MENUNGGU' },
        { id: 'APR-002', type: 'Program Kegiatan Sekolah', unit: 'SMA', status: 'DISETUJUI' },
        { id: 'APR-003', type: 'Revisi Kebijakan Disiplin', unit: 'SMP', status: 'MENUNGGU' },
        { id: 'APR-004', type: 'Penyesuaian Kalender Akademik', unit: 'SMK', status: 'DISETUJUI' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Approval Strategis belum tersimpan di database; data ini placeholder.',
    };
  }

  async getFoundationDocuments() {
    return {
      rows: [
        { id: 'DOC-001', title: 'SK Pengangkatan Kepala Sekolah', category: 'SDM', status: 'AKTIF' },
        { id: 'DOC-002', title: 'SOP Akademik Yayasan', category: 'Akademik', status: 'AKTIF' },
        { id: 'DOC-003', title: 'Kebijakan Pembayaran Yayasan', category: 'Keuangan', status: 'DRAFT' },
        { id: 'DOC-004', title: 'Pedoman Penjaminan Mutu', category: 'Mutu', status: 'AKTIF' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Dokumen Yayasan belum memiliki modul database; data ini placeholder.',
    };
  }

  async getFoundationAnnouncements() {
    return {
      rows: [
        { id: 'ANN-001', title: 'Libur Nasional', status: 'PUBLISHED', publishedAt: '2026-07-01' },
        { id: 'ANN-002', title: 'Penutupan Input Nilai Yayasan', status: 'PUBLISHED', publishedAt: '2026-07-20' },
        { id: 'ANN-003', title: 'Jadwal Audit Internal', status: 'DRAFT', publishedAt: null },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Pengumuman Yayasan belum memiliki modul database; data ini placeholder.',
    };
  }

  async getStrategicReport(period: 'bulanan' | 'semesteran' | 'tahunan') {
    const title =
      period === 'bulanan' ? 'Laporan Strategis Bulanan' : period === 'semesteran' ? 'Laporan Strategis Semesteran' : 'Laporan Strategis Tahunan';

    return {
      period,
      title,
      generatedAt: new Date().toISOString(),
      sections: [
        { key: 'akademik', title: 'Akademik', summary: 'Ringkasan performa akademik lintas unit.' },
        { key: 'keuangan', title: 'Keuangan', summary: 'Ringkasan pemasukan, pengeluaran, dan tunggakan.' },
        { key: 'sdm', title: 'SDM', summary: 'Ringkasan tenaga pendidik dan pimpinan unit.' },
        { key: 'disiplin', title: 'Disiplin', summary: 'Ringkasan prestasi dan pelanggaran.' },
      ],
      note: 'Laporan strategis detail belum memiliki modul database; struktur ini placeholder.',
    };
  }

  async getCalendarEvents() {
    return {
      rows: [
        { id: 'EVT-001', title: 'Rapat Yayasan', date: '2026-07-05' },
        { id: 'EVT-002', title: 'Pembukaan Tahun Ajaran', date: '2026-07-15' },
        { id: 'EVT-003', title: 'Evaluasi Semester', date: '2026-12-18' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Kalender kegiatan belum memiliki modul database; data ini placeholder.',
    };
  }

  async getPolicies() {
    return {
      rows: [
        { id: 'POL-001', title: 'Kebijakan Akademik', status: 'AKTIF' },
        { id: 'POL-002', title: 'Kebijakan Pembayaran', status: 'AKTIF' },
        { id: 'POL-003', title: 'Kebijakan Disiplin', status: 'DRAFT' },
        { id: 'POL-004', title: 'Kebijakan Mutu', status: 'AKTIF' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Kebijakan Yayasan belum memiliki modul database; data ini placeholder.',
    };
  }

  async getDashboardPreferences() {
    return {
      preferences: {
        showFinanceCharts: true,
        showUnitRanking: true,
        showHighPriorityNotifications: true,
      },
      updatedAt: new Date().toISOString(),
      note: 'Preferensi dashboard belum tersimpan di database; data ini placeholder.',
    };
  }
}
