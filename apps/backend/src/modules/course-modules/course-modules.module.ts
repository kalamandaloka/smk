import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CourseModulesController } from './course-modules.controller';
import { CourseModulesService } from './course-modules.service';

@Module({
  providers: [CourseModulesService, PrismaService],
  controllers: [CourseModulesController],
})
export class CourseModulesModule {}
