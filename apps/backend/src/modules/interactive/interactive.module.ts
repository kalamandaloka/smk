import { Module } from '@nestjs/common';
import { InteractiveController } from './interactive.controller';
import { InteractiveService } from './interactive.service';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  controllers: [InteractiveController],
  providers: [InteractiveService, PrismaService],
})
export class InteractiveModule {}
