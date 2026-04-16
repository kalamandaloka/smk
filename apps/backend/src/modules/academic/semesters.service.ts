import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateSemesterDto } from './dto/create-semester.dto';

@Injectable()
export class SemestersService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.semester.findMany({ orderBy: { createdAt: 'desc' } });
  }

  async create(dto: CreateSemesterDto) {
    return this.prisma.semester.create({ data: dto });
  }
}
