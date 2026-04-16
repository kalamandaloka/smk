import { Module } from '@nestjs/common';
import { AcademicYearsService } from './academic-years.service';
import { AcademicYearsController } from './academic-years.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [AcademicYearsService, PrismaService],
  controllers: [AcademicYearsController],
})
export class AcademicYearsModule {}
