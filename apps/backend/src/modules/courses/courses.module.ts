import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CoursesController } from './courses.controller';
import { CoursesService } from './courses.service';

@Module({
  providers: [CoursesService, PrismaService],
  controllers: [CoursesController],
})
export class CoursesModule {}
