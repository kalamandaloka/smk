import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';

@Injectable()
export class AcademicYearsService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.academicYear.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(dto: CreateAcademicYearDto) {
    return this.prisma.academicYear.create({
      data: { label: dto.label, isActive: dto.isActive ?? true },
    });
  }
}
