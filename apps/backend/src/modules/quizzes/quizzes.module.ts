import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { QuizzesController } from './quizzes.controller';
import { QuizzesService } from './quizzes.service';

@Module({
  providers: [QuizzesService, PrismaService],
  controllers: [QuizzesController],
})
export class QuizzesModule {}
