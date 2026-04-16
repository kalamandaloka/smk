import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateClassDto } from './dto/create-class.dto';

@Injectable()
export class ClassesService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.class.findMany({
      include: {
        school: true,
        department: true,
        academicYear: true,
        homeroomTeacher: { select: { id: true, name: true, email: true } },
        _count: { select: { teachers: true, students: true } },
      },
      orderBy: { createdAt: 'desc' },
    });
  }

  async create(dto: CreateClassDto) {
    return this.prisma.class.create({ data: dto });
  }

  async listTeachers(classId: string) {
    const exists = await this.prisma.class.findUnique({ where: { id: classId }, select: { id: true } });
    if (!exists) throw new NotFoundException('Class not found');
    return this.prisma.classTeacher.findMany({
      where: { classId },
      select: { id: true, teacher: { select: { id: true, email: true, name: true } }, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addTeacher(classId: string, teacherId: string) {
    await this.prisma.classTeacher.create({ data: { classId, teacherId } });
    return { classId, teacherId };
  }

  async removeTeacher(classId: string, teacherId: string) {
    await this.prisma.classTeacher.deleteMany({ where: { classId, teacherId } });
    return { classId, teacherId };
  }

  async listStudents(classId: string) {
    const exists = await this.prisma.class.findUnique({ where: { id: classId }, select: { id: true } });
    if (!exists) throw new NotFoundException('Class not found');
    return this.prisma.classStudent.findMany({
      where: { classId },
      select: { id: true, student: { select: { id: true, email: true, name: true } }, createdAt: true },
      orderBy: { createdAt: 'desc' },
    });
  }

  async addStudent(classId: string, studentId: string) {
    await this.prisma.classStudent.create({ data: { classId, studentId } });
    return { classId, studentId };
  }

  async removeStudent(classId: string, studentId: string) {
    await this.prisma.classStudent.deleteMany({ where: { classId, studentId } });
    return { classId, studentId };
  }

  async setHomeroomTeacher(classId: string, teacherId: string | null) {
    await this.prisma.class.update({ where: { id: classId }, data: { homeroomTeacherId: teacherId } });
    return { classId, teacherId };
  }
}
