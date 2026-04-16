import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class InteractiveService {
  constructor(private prisma: PrismaService) {}

  async launchSession(lessonId: string, userId: string) {
    const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId } });
    if (!lesson) throw new NotFoundException('Lesson not found');

    return this.prisma.interactiveSession.create({
      data: {
        lessonId,
        userId,
        status: 'STARTED',
      },
    });
  }

  async submitResult(sessionId: string, data: any) {
    const session = await this.prisma.interactiveSession.findUnique({ where: { id: sessionId } });
    if (!session) throw new NotFoundException('Session not found');

    await this.prisma.interactiveResult.create({
      data: {
        sessionId,
        data: data || {},
      },
    });

    return this.prisma.interactiveSession.update({
      where: { id: sessionId },
      data: { status: 'COMPLETED' },
    });
  }

  async getSession(sessionId: string) {
    return this.prisma.interactiveSession.findUnique({
      where: { id: sessionId },
      include: { results: true },
    });
  }
}
