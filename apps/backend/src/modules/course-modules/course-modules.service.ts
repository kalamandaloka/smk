import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';

@Injectable()
export class CourseModulesService {
  constructor(private prisma: PrismaService) {}

  async listByCourse(courseId: string) {
    return this.prisma.courseModule.findMany({
      where: { courseId },
      orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
    });
  }

  async create(dto: CreateCourseModuleDto) {
    return this.prisma.courseModule.create({
      data: { courseId: dto.courseId, title: dto.title, order: dto.order ?? 0 },
    });
  }

  async update(id: string, dto: UpdateCourseModuleDto) {
    return this.prisma.courseModule.update({ where: { id }, data: dto });
  }

  async delete(id: string) {
    return this.prisma.courseModule.delete({ where: { id } });
  }
}
