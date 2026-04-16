import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateProgramDto } from './dto/create-program.dto';

@Injectable()
export class ProgramsService {
  constructor(private prisma: PrismaService) {}

  async list() {
    return this.prisma.program.findMany({ include: { school: true }, orderBy: { createdAt: 'desc' } });
  }

  async create(dto: CreateProgramDto) {
    return this.prisma.program.create({ data: dto });
  }
}
