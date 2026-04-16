import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';

@Injectable()
export class CoursesService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.course.findMany({
      include: {
        school: true,
        department: true,
        assignedClasses: { include: { class: true }, orderBy: { createdAt: 'desc' } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateCourseDto) {
    return this.prisma.course.create({
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        schoolId: dto.schoolId,
        departmentId: dto.departmentId,
      },
    });
  }

  async get(id: string) {
    const course = await this.prisma.course.findUnique({
      where: { id },
      include: {
        modules: { orderBy: { order: 'asc' } },
        assignedClasses: { include: { class: true }, orderBy: { createdAt: 'desc' } },
      },
    });
    if (!course) throw new NotFoundException('Course not found');
    return course;
  }

  async update(id: string, dto: UpdateCourseDto) {
    return this.prisma.course.update({
      where: { id },
      data: {
        title: dto.title,
        slug: dto.slug,
        description: dto.description,
        status: dto.status,
        schoolId: dto.schoolId,
        departmentId: dto.departmentId,
      },
    });
  }

  async listAssignedClasses(courseId: string) {
    const course = await this.prisma.course.findUnique({ where: { id: courseId }, select: { id: true } });
    if (!course) throw new NotFoundException('Course not found');
    return this.prisma.courseClass.findMany({
      where: { courseId },
      include: { class: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async assignToClass(courseId: string, classId: string) {
    await this.prisma.courseClass.create({ data: { courseId, classId } });
    return { courseId, classId };
  }

  async unassignFromClass(courseId: string, classId: string) {
    await this.prisma.courseClass.deleteMany({ where: { courseId, classId } });
    return { courseId, classId };
  }
}
