import { Module } from '@nestjs/common';
import { SemestersService } from './semesters.service';
import { SemestersController } from './semesters.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [SemestersService, PrismaService],
  controllers: [SemestersController],
})
export class SemestersModule {}
