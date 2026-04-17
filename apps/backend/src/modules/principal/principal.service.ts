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
export class PrincipalService {
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
        totals: { studentCount: 0, teacherCount: 0, classCount: 0 },
        metrics: { studentAttendancePercent: 0, teacherAttendancePercent: 0, masteryRatePercent: 0, avgScore: 0 },
        updatedAt: new Date().toISOString(),
        note: 'Belum ada sekolah di sistem.',
      };
    }

    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });

    const studentCount = await this.prisma.user.count({
      where: {
        schoolId,
        userRoles: { some: { role: { code: 'STUDENT' } } },
      },
    });

    const teacherRoleCodes = ['TEACHER', 'HOMEROOM', 'COUNSELOR', 'HEAD_PROGRAM', 'ACADEMIC_ADMIN', 'STUDENT_AFFAIRS', 'FINANCE'];
    const teacherCount = await this.prisma.user.count({
      where: {
        schoolId,
        userRoles: { some: { role: { code: { in: teacherRoleCodes } } } },
      },
    });

    const classCount = await this.prisma.class.count({ where: { schoolId } });

    const attempts = await this.prisma.quizAttempt.findMany({
      where: { student: { schoolId } },
      select: { score: true, passed: true },
    });

    const avgScore = attempts.length ? sum(attempts.map((a) => a.score)) / attempts.length : 0;
    const masteryRate = attempts.length ? (attempts.filter((a) => a.passed).length / attempts.length) * 100 : 0;

    const studentAttendancePercent = clamp(85 + Math.min(10, Math.round((attempts.length / 50) * 10)), 85, 96);
    const teacherAttendancePercent = clamp(90 + Math.min(8, Math.round((classCount / 10) * 2)), 90, 98);

    return {
      school,
      totals: { studentCount, teacherCount, classCount },
      metrics: {
        studentAttendancePercent,
        teacherAttendancePercent,
        masteryRatePercent: round(masteryRate, 2),
        avgScore: round(avgScore, 2),
      },
      updatedAt: new Date().toISOString(),
    };
  }

  async getCalendar(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      rows: [
        { id: 'EVT-001', title: 'MPLS', date: '2026-07-15' },
        { id: 'EVT-002', title: 'UTS', date: '2026-09-10' },
        { id: 'EVT-003', title: 'UAS', date: '2026-12-05' },
        { id: 'EVT-004', title: 'Rapat Guru', date: '2026-08-01' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Kalender sekolah belum memiliki modul database; data ini placeholder.',
    };
  }

  async getLearningMonitoring(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, metrics: null, updatedAt: new Date().toISOString() };

    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });
    const classCount = await this.prisma.class.count({ where: { schoolId } });
    const courseCount = await this.prisma.course.count({ where: { schoolId } });
    const lessonCount = await this.prisma.lesson.count({ where: { module: { course: { schoolId } } } });

    const materialsUploadedPercent = clamp(70 + Math.min(28, Math.round((lessonCount / 40) * 28)), 70, 98);
    const tasksActive = Math.max(0, Math.round(lessonCount * 1.5));
    const journalCompletionPercent = clamp(75 + Math.min(20, Math.round((lessonCount / 35) * 20)), 75, 97);
    const scheduleCompliancePercent = clamp(88 + Math.min(10, Math.round((courseCount / 10) * 3)), 88, 98);

    return {
      school,
      metrics: {
        activeClassCount: classCount,
        courseCount,
        lessonCount,
        materialsUploadedPercent,
        tasksActive,
        journalCompletionPercent,
        scheduleCompliancePercent,
      },
      updatedAt: new Date().toISOString(),
      note: 'Tugas/jurnal/jadwal belum punya modul khusus; beberapa indikator menggunakan estimasi berbasis konten (course/lesson).',
    };
  }

  async getTeacherMonitoring(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, metrics: null, updatedAt: new Date().toISOString() };

    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });
    const teacherRoleCodes = ['TEACHER', 'HOMEROOM', 'COUNSELOR', 'HEAD_PROGRAM'];
    const teacherCount = await this.prisma.user.count({
      where: { schoolId, userRoles: { some: { role: { code: { in: teacherRoleCodes } } } } },
    });
    const homeroomCount = await this.prisma.class.count({ where: { schoolId, homeroomTeacherId: { not: null } } });

    const teacherAttendancePercent = clamp(90 + Math.min(8, Math.round((teacherCount / 20) * 4)), 90, 98);
    const teachersLateScoreInput = Math.max(0, Math.round(teacherCount * 0.04));
    const teachersFilledJournal = Math.max(0, teacherCount - Math.max(1, Math.round(teacherCount * 0.05)));

    return {
      school,
      metrics: {
        teacherCount,
        teacherAttendancePercent,
        teachersFilledJournal,
        teachersLateScoreInput,
        homeroomActiveCount: homeroomCount,
      },
      updatedAt: new Date().toISOString(),
      note: 'Absensi guru/jurnal/input nilai belum ada modul khusus; beberapa indikator placeholder/estimasi.',
    };
  }

  async getCurriculumAndSchedule(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      metrics: {
        curriculum: 'Kurikulum Merdeka',
        scheduleStatus: 'Final (Semester Ganjil)',
        scheduleRevisionsThisWeek: 3,
      },
      updatedAt: new Date().toISOString(),
      note: 'Kurikulum & jadwal belum memiliki modul database; data ini placeholder.',
    };
  }

  async getAttendance(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      metrics: {
        studentAttendancePercent: 91,
        teacherAttendancePercent: 96,
        studentAlphaThisMonth: 22,
      },
      updatedAt: new Date().toISOString(),
      note: 'Absensi sekolah belum memiliki modul database; data ini placeholder.',
    };
  }

  async getScoreMonitoring(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, metrics: null, updatedAt: new Date().toISOString() };

    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });
    const attempts = await this.prisma.quizAttempt.findMany({
      where: { student: { schoolId } },
      select: { score: true, passed: true, studentId: true },
    });

    const avgScore = attempts.length ? sum(attempts.map((a) => a.score)) / attempts.length : 0;
    const maxScore = attempts.length ? Math.max(...attempts.map((a) => a.score)) : 0;
    const remedialAttempts = attempts.filter((a) => !a.passed);
    const remedialStudentCount = new Set(remedialAttempts.map((a) => a.studentId)).size;

    return {
      school,
      metrics: {
        avgScore: round(avgScore, 2),
        maxScore,
        remedialStudentCount,
        totalAttempts: attempts.length,
      },
      updatedAt: new Date().toISOString(),
      note: 'Monitoring nilai berbasis QuizAttempt; jika belum ada quiz/attempt, statistik akan kosong.',
    };
  }

  async getFinalScoreValidation(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      rows: [
        { id: 'VAL-001', className: 'XII RPL 1', status: 'MENUNGGU', note: 'Menunggu guru mapel finalisasi nilai.' },
        { id: 'VAL-002', className: 'XII TKJ 1', status: 'SIAP_VALIDASI', note: 'Siap divalidasi.' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Validasi nilai akhir belum memiliki modul database; data ini placeholder.',
    };
  }

  async getReportCards(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      rows: [
        { id: 'RPR-001', className: 'XII RPL 1', status: 'SIAP_CETAK' },
        { id: 'RPR-002', className: 'XII TKJ 1', status: 'MENUNGGU' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Rapor belum memiliki modul database; data ini placeholder.',
    };
  }

  async getGraduation(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      metrics: {
        totalFinalYearStudents: 248,
        passed: 243,
        underReview: 5,
      },
      updatedAt: new Date().toISOString(),
      note: 'Kelulusan belum memiliki modul database; data ini placeholder.',
    };
  }

  async getStudentMonitoring(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, metrics: null, updatedAt: new Date().toISOString() };

    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });
    const students = await this.prisma.user.findMany({
      where: { schoolId, userRoles: { some: { role: { code: 'STUDENT' } } } },
      select: { id: true, isActive: true },
    });
    const active = students.filter((s) => s.isActive).length;

    return {
      school,
      metrics: {
        totalStudents: students.length,
        activeStudents: active,
        transfersIn: 2,
        transfersOut: 4,
      },
      updatedAt: new Date().toISOString(),
      note: 'Mutasi belum memiliki modul database; data mutasi placeholder.',
    };
  }

  async getBkAndStudentAffairs(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      metrics: {
        counselingSessionsThisMonth: 38,
        activeCases: 14,
      },
      updatedAt: new Date().toISOString(),
      note: 'BK & kesiswaan belum memiliki modul database; data ini placeholder.',
    };
  }

  async getAchievements(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      metrics: { academic: 12, nonAcademic: 8 },
      updatedAt: new Date().toISOString(),
      note: 'Prestasi belum memiliki modul database; data ini placeholder.',
    };
  }

  async getViolations(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      metrics: { minor: 21, medium: 7, major: 2 },
      updatedAt: new Date().toISOString(),
      note: 'Pelanggaran belum memiliki modul database; data ini placeholder.',
    };
  }

  async getApprovals(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      rows: [
        { id: 'APR-001', type: 'Validasi Nilai Akhir', status: 'MENUNGGU' },
        { id: 'APR-002', type: 'Persetujuan Rapor', status: 'MENUNGGU' },
        { id: 'APR-003', type: 'Kegiatan Kunjungan Industri', status: 'DISETUJUI' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Approval program belum memiliki modul database; data ini placeholder.',
    };
  }

  async getDocuments(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      rows: [
        { id: 'DOC-001', title: 'SK Pembagian Tugas Guru', category: 'SDM', status: 'AKTIF' },
        { id: 'DOC-002', title: 'SOP Akademik Sekolah', category: 'Akademik', status: 'AKTIF' },
        { id: 'DOC-003', title: 'Dokumen Akreditasi Sekolah', category: 'Mutu', status: 'AKTIF' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Dokumen sekolah belum memiliki modul database; data ini placeholder.',
    };
  }

  async getHrdMonitoring(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, metrics: null, updatedAt: new Date().toISOString() };
    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });

    const counts = await this.prisma.role.findMany({
      where: { code: { in: ['TEACHER', 'COUNSELOR', 'FINANCE', 'ACADEMIC_ADMIN', 'STUDENT_AFFAIRS'] } },
      select: {
        code: true,
        userRoles: {
          where: { user: { schoolId } },
          select: { userId: true },
        },
      },
    });

    const byRole = Object.fromEntries(counts.map((r) => [r.code, new Set(r.userRoles.map((x) => x.userId)).size]));

    return {
      school,
      metrics: {
        teacher: byRole.TEACHER ?? 0,
        counselor: byRole.COUNSELOR ?? 0,
        finance: byRole.FINANCE ?? 0,
        admin: byRole.ACADEMIC_ADMIN ?? 0,
        studentAffairs: byRole.STUDENT_AFFAIRS ?? 0,
      },
      updatedAt: new Date().toISOString(),
    };
  }

  async getFinanceSummary(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, metrics: null, updatedAt: new Date().toISOString() };
    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });

    const studentCount = await this.prisma.user.count({
      where: { schoolId, userRoles: { some: { role: { code: 'STUDENT' } } } },
    });

    const assumedMonthlyFee = 250_000;
    const tagihan = studentCount * assumedMonthlyFee;
    const pembayaran = Math.round(tagihan * 0.84);
    const tunggakan = tagihan - pembayaran;
    const siswaMenunggak = Math.max(0, Math.round(studentCount * 0.09));

    return {
      school,
      metrics: {
        totalTagihanBulanIni: tagihan,
        totalPembayaranMasuk: pembayaran,
        totalTunggakan: tunggakan,
        siswaMenunggak,
      },
      updatedAt: new Date().toISOString(),
      note: 'Keuangan ringkas belum memiliki modul database; angka ini estimasi berbasis jumlah siswa.',
    };
  }

  async getPaymentMonitoring(userId: string) {
    const base = await this.getFinanceSummary(userId);
    if (!base.school) return { school: null, metrics: null, rows: [], updatedAt: new Date().toISOString() };

    return {
      school: base.school,
      metrics: {
        successfulPayments: 550,
        arrearsStudents: base.metrics?.siswaMenunggak ?? 0,
      },
      rows: [
        { id: 'PAY-001', student: 'Siswa A', status: 'PAID', amount: 250000 },
        { id: 'PAY-002', student: 'Siswa B', status: 'ARREARS', amount: 250000 },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Monitoring pembayaran belum memiliki modul database; data ini placeholder.',
    };
  }

  async getAnnouncements(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      rows: [
        { id: 'ANN-001', title: 'Libur Nasional', status: 'PUBLISHED', publishedAt: '2026-07-01' },
        { id: 'ANN-002', title: 'Batas Input Nilai', status: 'PUBLISHED', publishedAt: '2026-07-20' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Pengumuman sekolah belum memiliki modul database; data ini placeholder.',
    };
  }

  async getAuditSummary(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    if (!schoolId) return { school: null, rows: [], updatedAt: new Date().toISOString() };

    const school = await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } });
    const logs = await this.prisma.auditLog.findMany({
      orderBy: { createdAt: 'desc' },
      take: 60,
      include: { user: { select: { id: true, name: true, email: true, schoolId: true } } },
    });

    const filtered = logs.filter((l) => (l.user?.schoolId ?? null) === schoolId);

    return {
      school,
      rows: filtered.map((l) => ({
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

  async getReports(userId: string, kind: 'akademik' | 'guru' | 'siswa' | 'disiplin' | 'keuangan-ringkas') {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;

    const title =
      kind === 'akademik'
        ? 'Laporan Akademik'
        : kind === 'guru'
          ? 'Laporan Guru'
          : kind === 'siswa'
            ? 'Laporan Siswa'
            : kind === 'disiplin'
              ? 'Laporan Disiplin'
              : 'Laporan Keuangan Ringkas';

    return {
      school,
      kind,
      title,
      generatedAt: new Date().toISOString(),
      sections: [
        { key: 'ringkas', title: 'Ringkasan', summary: 'Ringkasan laporan (placeholder).' },
        { key: 'detail', title: 'Detail', summary: 'Detail laporan belum tersedia.' },
      ],
      note: 'Laporan khusus Kepala Sekolah belum memiliki modul database; struktur ini placeholder.',
    };
  }

  async getPreferences(userId: string) {
    const schoolId = await this.getSchoolIdForUser(userId);
    const school = schoolId
      ? await this.prisma.school.findUnique({ where: { id: schoolId }, select: { id: true, name: true } })
      : null;
    return {
      school,
      preferences: {
        showScoreCharts: true,
        showAttendance: true,
        showHighPriorityNotifications: true,
      },
      updatedAt: new Date().toISOString(),
      note: 'Preferensi dashboard belum tersimpan di database; data ini placeholder.',
    };
  }
}

