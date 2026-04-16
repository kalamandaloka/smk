import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class ProgressService {
  constructor(private prisma: PrismaService) {}

  async completeLesson(lessonId: string, studentId: string) {
    return this.prisma.lessonProgress.upsert({
      where: { lessonId_studentId: { lessonId, studentId } },
      create: { lessonId, studentId, completedAt: new Date() },
      update: { completedAt: new Date() },
    });
  }

  async myLessonProgress(studentId: string) {
    return this.prisma.lessonProgress.findMany({
      where: { studentId },
      include: { lesson: true },
      orderBy: { completedAt: 'desc' },
    });
  }
}
