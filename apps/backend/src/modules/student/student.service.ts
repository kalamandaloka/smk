import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

function sum(values: number[]) {
  return values.reduce((a, b) => a + b, 0);
}

function round(value: number, digits = 2) {
  const factor = 10 ** digits;
  return Math.round(value * factor) / factor;
}

@Injectable()
export class StudentService {
  constructor(private prisma: PrismaService) {}

  async getMyClasses(userId: string) {
    const rows = await this.prisma.classStudent.findMany({
      where: { studentId: userId },
      include: {
        class: {
          include: {
            school: { select: { id: true, name: true } },
            department: { select: { id: true, name: true } },
            homeroomTeacher: { select: { id: true, name: true, email: true } },
          },
        },
      },
      orderBy: { createdAt: 'desc' },
    });

    return rows.map((r) => ({
      id: r.class.id,
      name: r.class.name,
      school: r.class.school,
      department: r.class.department,
      academicYearId: r.class.academicYearId,
      homeroomTeacher: r.class.homeroomTeacher,
      joinedAt: r.createdAt.toISOString(),
    }));
  }

  async getMyCourses(userId: string) {
    const classes = await this.prisma.classStudent.findMany({
      where: { studentId: userId },
      select: { classId: true },
    });
    const classIds = classes.map((c) => c.classId);
    if (classIds.length === 0) return [];

    const rows = await this.prisma.courseClass.findMany({
      where: { classId: { in: classIds } },
      include: {
        course: {
          include: {
            school: { select: { id: true, name: true } },
            department: { select: { id: true, name: true } },
          },
        },
        class: { select: { id: true, name: true } },
      },
      orderBy: { createdAt: 'desc' },
    });

    return rows.map((r) => ({
      id: r.course.id,
      title: r.course.title,
      slug: r.course.slug,
      status: r.course.status,
      school: r.course.school,
      department: r.course.department,
      assignedClass: r.class,
      assignedAt: r.createdAt.toISOString(),
    }));
  }

  async getMyLessonsProgress(userId: string) {
    const rows = await this.prisma.lessonProgress.findMany({
      where: { studentId: userId },
      include: { lesson: { select: { id: true, title: true, type: true } } },
      orderBy: { completedAt: 'desc' },
      take: 200,
    });

    return rows.map((p) => ({
      id: p.id,
      lesson: p.lesson,
      completedAt: p.completedAt.toISOString(),
    }));
  }

  async getMyQuizzes(userId: string) {
    const courseClasses = await this.prisma.classStudent.findMany({
      where: { studentId: userId },
      select: { classId: true },
    });
    const classIds = courseClasses.map((c) => c.classId);
    if (classIds.length === 0) return [];

    const courseIds = await this.prisma.courseClass.findMany({
      where: { classId: { in: classIds } },
      select: { courseId: true },
    });
    const courseIdList = Array.from(new Set(courseIds.map((x) => x.courseId)));
    if (courseIdList.length === 0) return [];

    const lessons = await this.prisma.lesson.findMany({
      where: {
        type: 'QUIZ',
        module: { courseId: { in: courseIdList } },
      },
      include: {
        quiz: true,
        module: { include: { course: { select: { id: true, title: true, slug: true } } } },
      },
      orderBy: [{ module: { order: 'asc' } }, { order: 'asc' }],
      take: 200,
    });

    const attempts = await this.prisma.quizAttempt.findMany({
      where: { studentId: userId, quizId: { in: lessons.map((l) => l.quiz?.id).filter(Boolean) as string[] } },
      select: { quizId: true, score: true, passed: true, submittedAt: true },
      orderBy: { submittedAt: 'desc' },
    });

    const bestByQuizId = new Map<string, { score: number; passed: boolean; submittedAt: string | null }>();
    for (const a of attempts) {
      const existing = bestByQuizId.get(a.quizId);
      const submittedAt = a.submittedAt ? a.submittedAt.toISOString() : null;
      if (!existing || a.score > existing.score) {
        bestByQuizId.set(a.quizId, { score: a.score, passed: a.passed, submittedAt });
      }
    }

    return lessons
      .filter((l) => l.quiz)
      .map((l) => {
        const q = l.quiz!;
        const best = bestByQuizId.get(q.id) ?? null;
        return {
          quizId: q.id,
          lessonId: l.id,
          lessonTitle: l.title,
          course: l.module.course,
          passingScore: q.passingScore,
          maxAttempts: q.maxAttempts,
          bestAttempt: best,
        };
      });
  }

  async getMyQuizGrades(userId: string) {
    const rows = await this.prisma.quizAttempt.findMany({
      where: { studentId: userId, submittedAt: { not: null } },
      include: { quiz: { include: { lesson: { select: { id: true, title: true } } } } },
      orderBy: { submittedAt: 'desc' },
      take: 200,
    });

    return rows.map((a) => ({
      id: a.id,
      quizId: a.quizId,
      lesson: a.quiz.lesson,
      score: a.score,
      passed: a.passed,
      submittedAt: a.submittedAt ? a.submittedAt.toISOString() : null,
    }));
  }

  async getSummary(userId: string) {
    const classes = await this.getMyClasses(userId);
    const primaryClass = classes[0] ?? null;

    const quizGrades = await this.prisma.quizAttempt.findMany({
      where: { studentId: userId, submittedAt: { not: null } },
      select: { score: true, passed: true },
      take: 500,
    });

    const avgScore = quizGrades.length ? sum(quizGrades.map((q) => q.score)) / quizGrades.length : 0;
    const masteryRate = quizGrades.length ? (quizGrades.filter((q) => q.passed).length / quizGrades.length) * 100 : 0;

    const progress = await this.prisma.lessonProgress.count({ where: { studentId: userId } });

    const quizzes = await this.getMyQuizzes(userId);
    const unfinishedQuizCount = quizzes.filter((q) => !q.bestAttempt).length;

    const tasksTodo = 3;
    const attendancePercent = 91;

    return {
      class: primaryClass,
      metrics: {
        tasksTodo,
        quizzesTodo: unfinishedQuizCount,
        avgScore: round(avgScore, 2),
        masteryRatePercent: round(masteryRate, 2),
        attendancePercent,
        completedLessons: progress,
      },
      updatedAt: new Date().toISOString(),
      notes: {
        tasks: 'Tugas belum punya modul database; angka ini placeholder.',
        attendance: 'Absensi belum punya modul database; angka ini placeholder.',
      },
    };
  }

  async getCalendar(userId: string) {
    const classes = await this.getMyClasses(userId);
    const className = classes[0]?.name ?? 'Kelas';
    return {
      className,
      rows: [
        { id: 'EVT-001', title: 'Jadwal Pelajaran', date: '2026-08-12', note: 'Senin 07:00 Matematika' },
        { id: 'EVT-002', title: 'Quiz Mingguan', date: '2026-08-13', note: 'Quiz Basis Data pukul 09:00' },
        { id: 'EVT-003', title: 'Deadline Tugas', date: '2026-08-12', note: 'Tugas Landing Page' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Kalender belajar belum punya modul database; data ini placeholder.',
    };
  }

  async getAttendance(userId: string) {
    const classes = await this.getMyClasses(userId);
    return {
      className: classes[0]?.name ?? null,
      summary: { hadirPercent: 91, izin: 3, sakit: 2, alpha: 1 },
      rows: [
        { date: '2026-08-01', status: 'HADIR' },
        { date: '2026-08-02', status: 'HADIR' },
        { date: '2026-08-03', status: 'IZIN' },
        { date: '2026-08-04', status: 'HADIR' },
        { date: '2026-08-05', status: 'ALPHA' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Absensi belum punya modul database; data ini placeholder.',
    };
  }

  async getFinance(userId: string) {
    const student = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true } });
    return {
      student,
      bills: [
        { id: 'BILL-001', type: 'SPP', period: 'Juli 2026', amount: 450000, status: 'BELUM_LUNAS' },
        { id: 'BILL-002', type: 'Praktikum', period: 'Ganjil 2026', amount: 150000, status: 'BELUM_LUNAS' },
        { id: 'BILL-003', type: 'UTS', period: 'Ganjil 2026', amount: 100000, status: 'LUNAS' },
      ],
      payments: [
        { id: 'PAY-001', date: '2026-07-08', type: 'SPP Juni 2026', amount: 450000, method: 'Transfer BCA' },
        { id: 'PAY-002', date: '2026-09-03', type: 'UTS Ganjil 2026', amount: 100000, method: 'QRIS' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Keuangan siswa belum punya modul database; data ini placeholder.',
    };
  }

  async getDocuments(userId: string) {
    const student = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true } });
    return {
      student,
      documents: [
        { id: 'DOC-001', title: 'Kartu Pelajar Digital', category: 'Dokumen', status: 'AKTIF' },
        { id: 'DOC-002', title: 'Rapor Semester Ganjil 2026/2027', category: 'Dokumen', status: 'AKTIF' },
        { id: 'DOC-003', title: 'Surat Aktif Sekolah', category: 'Dokumen', status: 'AKTIF' },
      ],
      certificates: [
        { id: 'CRT-001', title: 'Sertifikat Lomba Coding', category: 'Sertifikat', status: 'AKTIF' },
        { id: 'CRT-002', title: 'Sertifikat Seminar Teknologi', category: 'Sertifikat', status: 'AKTIF' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Dokumen/sertifikat siswa belum punya modul database; data ini placeholder.',
    };
  }

  async getCounseling(userId: string) {
    const student = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true } });
    return {
      student,
      rows: [
        { id: 'BK-001', type: 'Konseling Akademik', status: 'MENUNGGU', schedule: '2026-08-20 09:00' },
        { id: 'BK-002', type: 'Konseling Pribadi', status: 'SELESAI', schedule: '2026-07-15 10:00' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'BK/Konseling belum punya modul database; data ini placeholder.',
    };
  }

  async getPortfolio(userId: string) {
    const student = await this.prisma.user.findUnique({ where: { id: userId }, select: { id: true, name: true } });
    return {
      student,
      rows: [
        { id: 'PRT-001', title: 'Website Profil Pribadi', type: 'Web Project' },
        { id: 'PRT-002', title: 'Desain UI Login Page', type: 'Image' },
        { id: 'PRT-003', title: 'Hasil Query SQL Sederhana', type: 'Document' },
      ],
      updatedAt: new Date().toISOString(),
      note: 'Portofolio belum punya modul database; data ini placeholder.',
    };
  }
}

