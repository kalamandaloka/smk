import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Injectable()
export class LessonsService {
  constructor(private prisma: PrismaService) {}

  async listByModule(moduleId: string) {
    return this.prisma.lesson.findMany({
      where: { moduleId },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
      include: { quiz: true },
    });
  }

  async create(dto: CreateLessonDto) {
    return this.prisma.lesson.create({
      data: {
        moduleId: dto.moduleId,
        title: dto.title,
        type: dto.type,
        order: dto.order ?? 0,
        article: dto.article,
        videoUrl: dto.videoUrl,
        documentUrl: dto.documentUrl,
      },
    });
  }

  async get(id: string) {
    return this.prisma.lesson.findUnique({ where: { id }, include: { quiz: { include: { questions: { include: { options: true }, orderBy: { order: 'asc' } } } } } });
  }

  async update(id: string, dto: UpdateLessonDto) {
    return this.prisma.lesson.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.lesson.delete({ where: { id } });
  }
}
