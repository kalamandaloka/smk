import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { LessonsController } from './lessons.controller';
import { LessonsService } from './lessons.service';

@Module({
  providers: [LessonsService, PrismaService],
  controllers: [LessonsController],
})
export class LessonsModule {}
