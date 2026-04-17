import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { StudentController } from './student.controller';
import { StudentService } from './student.service';

@Module({
  controllers: [StudentController],
  providers: [StudentService, PrismaService],
})
export class StudentModule {}

