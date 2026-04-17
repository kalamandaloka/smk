import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

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
export class AdminService {
  constructor(private prisma: PrismaService) {}

  private async getSchoolIdForUser(userId: string): Promise<string | null> {
    const u = await this.prisma.user.findUnique({ where: { id: userId }, select: { schoolId: true } });
    if (u?.schoolId) return u.schoolId;
    const firstSchool = await this.prisma.school.findFirst({ select: { id: true } });
    return firstSchool?.id ?? null;
  }

  async getSummary(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) {
      return {
        school: null,
        totals: { students: 0, teachers: 0, classes: 0 },
        finance: { incomeMonth: 0, arrears: 0, paymentsMonth: 0 },
        updatedAt: new Date().toISOString(),
        note: 'Belum ada sekolah di sistem.',
      };
    }

    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });

    const students = await this.prisma.user.count({
      where: { schoolId, userRoles: { some: { role: { code: 'STUDENT' } } } },
    });

    const teachers = await this.prisma.user.count({
      where: { schoolId, userRoles: { some: { role: { code: { in: ['TEACHER', 'HOMEROOM', 'COUNSELOR', 'HEAD_PROGRAM'] } } } } },
    });

    const classes = await this.prisma.class.count({ where: { schoolId } });

    const assumedMonthlyFee = 250_000;
    const incomeMonth = students * assumedMonthlyFee;
    const paymentsMonth = Math.round(incomeMonth * 0.84);
    const arrears = incomeMonth - paymentsMonth;

    return {
      school,
      totals: { students, teachers, classes },
      finance: { incomeMonth, paymentsMonth, arrears },
      updatedAt: new Date().toISOString(),
      note: 'Ringkasan keuangan masih estimasi (belum ada modul pembayaran).',
    };
  }

  async getCalendar(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } }) : null;
    return {
      school,
      rows: [
        { id: 'EVT-001', title: 'MPLS', date: '2026-07-15' },
        { id: 'EVT-002', title: 'UTS', date: '2026-09-10' },
        { id: 'EVT-003', title: 'UAS', date: '2026-12-05' },
        { id: 'EVT-004', title: 'Pembagian Rapor', date: '2026-12-20' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Kalender akademik detail belum punya modul database; data ini placeholder.',
    };
  }

  async getRombel(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, rows: [], updatedAt: new Date().toISOString() };
    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });
    const rows = await this.prisma.class.findMany({
      where: { schoolId },
      include: {
        department: { select: { id: true, name: true } },
        homeroomTeacher: { select: { id: true, name: true, email: true } },
      },
      orderBy: { createdAt: 'desc' },
      take: 100,
    });

    const studentCounts = await this.prisma.classStudent.groupBy({
      by: ['classId'],
      _count: { classId: true },
      where: { classId: { in: rows.map((r) => r.id) } },
    });
    const countByClassId = new Map(studentCounts.map((x) => [x.classId, x._count.classId]));

    return {
      school,
      rows: rows.map((c) => ({
        id: c.id,
        name: c.name,
        department: c.department,
        homeroomTeacher: c.homeroomTeacher,
        studentCount: countByClassId.get(c.id) ?? 0,
      })),
      updatedAt: new Date().toISOString(),
    };
  }

  async getSchedules(userId: string, kind: 'pelajaran' | 'ujian') {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } }) : null;
    return {
      school,
      kind,
      rows:
        kind === 'pelajaran'
          ? [
              { id: 'SCH-001', day: 'Senin', time: '07:00-08:30', subject: 'Matematika', className: 'X RPL 1' },
              { id: 'SCH-002', day: 'Selasa', time: '08:30-10:00', subject: 'Produktif RPL', className: 'XI RPL 1' },
            ]
          : [
              { id: 'EX-001', date: '2026-09-10', subject: 'Matematika', className: 'X RPL 1' },
              { id: 'EX-002', date: '2026-12-05', subject: 'Produktif RPL', className: 'XI RPL 1' },
            ],
      updatedAt: new Date().toISOString(),
      note: 'Jadwal belum memiliki modul database; data ini placeholder.',
    };
  }

  async getLmsManagement(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, metrics: null, updatedAt: new Date().toISOString() };
    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });
    const courses = await this.prisma.course.count({ where: { schoolId } });
    const modules = await this.prisma.courseModule.count({ where: { course: { schoolId } } });
    const lessons = await this.prisma.lesson.count({ where: { module: { course: { schoolId } } } });
    return {
      school,
      metrics: {
        courseCount: courses,
        moduleCount: modules,
        lessonCount: lessons,
      },
      updatedAt: new Date().toISOString(),
    };
  }

  async getGradesRecap(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, metrics: null, updatedAt: new Date().toISOString() };
    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });

    const attempts = await this.prisma.quizAttempt.findMany({
      where: { student: { schoolId }, submittedAt: { not: null } },
      select: { score: true, passed: true, studentId: true },
      take: 2000,
    });

    const avgScore = attempts.length ? sum(attempts.map((a) => a.score)) / attempts.length : 0;
    const maxScore = attempts.length ? Math.max(...attempts.map((a) => a.score)) : 0;
    const passRate = attempts.length ? (attempts.filter((a) => a.passed).length / attempts.length) * 100 : 0;
    const remedialStudents = new Set(attempts.filter((a) => !a.passed).map((a) => a.studentId)).size;

    return {
      school,
      metrics: {
        avgScore: round(avgScore, 2),
        maxScore,
        passRate: round(passRate, 2),
        remedialStudents,
        attempts: attempts.length,
      },
      updatedAt: new Date().toISOString(),
      note: 'Rekap nilai berbasis quiz attempt; jika belum ada quiz/attempt, statistik akan kosong.',
    };
  }

  async getLateGradeInput(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } }) : null;
    return {
      school,
      rows: [
        { id: 'LATE-001', teacher: 'Guru Matematika', className: 'X RPL 2', item: 'Nilai UTS', status: 'TERLAMBAT' },
        { id: 'LATE-002', teacher: 'Guru TKJ', className: 'XI TKJ 1', item: 'Finalisasi Nilai', status: 'MENUNGGU' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Monitoring input nilai belum memiliki modul database; data ini placeholder.',
    };
  }

  async getStudents(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, rows: [], updatedAt: new Date().toISOString() };
    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });
    const users = await this.prisma.user.findMany({
      where: { schoolId, userRoles: { some: { role: { code: 'STUDENT' } } } },
      select: { id: true, name: true, email: true, isActive: true, createdAt: true },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return {
      school,
      rows: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        isActive: u.isActive,
        createdAt: u.createdAt.toISOString(),
      })),
      updatedAt: new Date().toISOString(),
    };
  }

  async getStaff(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, rows: [], updatedAt: new Date().toISOString() };
    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });
    const users = await this.prisma.user.findMany({
      where: { schoolId, userRoles: { some: { role: { code: { in: ['TEACHER', 'HOMEROOM', 'COUNSELOR', 'FINANCE', 'STUDENT_AFFAIRS', 'HEAD_PROGRAM'] } } } } },
      select: { id: true, name: true, email: true, createdAt: true, userRoles: { select: { role: { select: { code: true, name: true } } } } },
      orderBy: { createdAt: 'desc' },
      take: 200,
    });
    return {
      school,
      rows: users.map((u) => ({
        id: u.id,
        name: u.name,
        email: u.email,
        roles: u.userRoles.map((r) => r.role.code),
      })),
      updatedAt: new Date().toISOString(),
    };
  }

  async getFinance(userId: string) {
    const base = await this.getSummary(userId);
    if (!base.school) return { school: null, metrics: null, rows: [], updatedAt: new Date().toISOString() };

    const billsTotal = base.finance.incomeMonth;
    const paymentsTotal = base.finance.paymentsMonth;
    const arrearsTotal = base.finance.arrears;
    const arrearsStudents = Math.max(0, Math.round(base.totals.students * 0.09));

    return {
      school: base.school,
      metrics: {
        billsTotal,
        paymentsTotal,
        arrearsTotal,
        arrearsStudents,
      },
      rows: [
        { id: 'FIN-001', label: 'Pembayaran bulan ini', amount: paymentsTotal },
        { id: 'FIN-002', label: 'Tunggakan bulan ini', amount: arrearsTotal },
      ],
      updatedAt: base.updatedAt,
      note: base.note,
    };
  }

  async getApprovals(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } }) : null;
    return {
      school,
      rows: [
        { id: 'APR-001', type: 'Approval Data Siswa Baru', status: 'MENUNGGU' },
        { id: 'APR-002', type: 'Finalisasi Jadwal Ujian', status: 'MENUNGGU' },
        { id: 'APR-003', type: 'Perubahan Struktur Biaya', status: 'DISETUJUI' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Approval data belum memiliki modul database; data ini placeholder.',
    };
  }

  async getDocuments(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } }) : null;
    return {
      school,
      rows: [
        { id: 'DOC-001', title: 'Dokumen Akreditasi', category: 'Mutu', status: 'AKTIF' },
        { id: 'DOC-002', title: 'SOP Akademik', category: 'Akademik', status: 'AKTIF' },
        { id: 'DOC-003', title: 'Surat Edaran Sekolah', category: 'Administrasi', status: 'DRAFT' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Arsip dokumen belum memiliki modul database; data ini placeholder.',
    };
  }

  async getUserReport(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, metrics: null, updatedAt: new Date().toISOString() };
    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });

    const usersTotal = await this.prisma.user.count({ where: { schoolId } });
    const activeUsers = await this.prisma.user.count({ where: { schoolId, isActive: true } });
    const inactiveUsers = usersTotal - activeUsers;

    return {
      school,
      metrics: { usersTotal, activeUsers, inactiveUsers },
      updatedAt: new Date().toISOString(),
    };
  }

  async getSchoolSettings(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, updatedAt: new Date().toISOString() };
    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true, isActive: true, createdAt: true, updatedAt: true } });
    return { school, updatedAt: new Date().toISOString() };
  }

  async getAttendanceReport(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } }) : null;
    return {
      school,
      metrics: {
        studentAttendancePercent: 91,
        teacherAttendancePercent: 96,
      },
      updatedAt: new Date().toISOString(),
      note: 'Laporan absensi belum memiliki modul database; data ini placeholder.',
    };
  }

  async getFinanceReport(userId: string) {
    const finance = await this.getFinance(userId);
    return {
      school: finance.school,
      metrics: finance.metrics,
      updatedAt: finance.updatedAt,
      note: finance.note,
    };
  }

  async getAcademicReport(userId: string) {
    const grades = await this.getGradesRecap(userId);
    const curriculumCompletion = clamp(85 + Math.min(10, Math.round((grades.metrics?.attempts ?? 0) / 200)), 85, 95);
    return {
      school: grades.school,
      metrics: {
        avgScore: grades.metrics?.avgScore ?? 0,
        passRate: grades.metrics?.passRate ?? 0,
        curriculumCompletionPercent: curriculumCompletion,
      },
      updatedAt: grades.updatedAt,
      note: 'Laporan akademik sebagian berbasis quiz attempt; indikator lainnya placeholder.',
    };
  }
}

