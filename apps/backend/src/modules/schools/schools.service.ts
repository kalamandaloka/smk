import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Injectable()
export class SchoolsService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.school.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(dto: CreateSchoolDto) {
    return this.prisma.school.create({ data: { name: dto.name, isActive: dto.isActive ?? true } });
  }

  async get(id: string) {
    return this.prisma.school.findUnique({ where: { id } });
  }

  async update(id: string, dto: UpdateSchoolDto) {
    return this.prisma.school.update({ where: { id }, data: dto });
  }
}
