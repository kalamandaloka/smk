import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ReportsService {
  constructor(private prisma: PrismaService) {}

  async getQuizGrades() {
    return this.prisma.quizAttempt.findMany({
      include: {
        student: { select: { id: true, name: true, email: true } },
        quiz: { include: { lesson: { select: { title: true } } } },
      },
      orderBy: { submittedAt: 'desc' },
    });
  }

  async getLessonProgress() {
    return this.prisma.lessonProgress.findMany({
      include: {
        student: { select: { id: true, name: true, email: true } },
        lesson: { select: { id: true, title: true, type: true } },
      },
      orderBy: { completedAt: 'desc' },
    });
  }
}
