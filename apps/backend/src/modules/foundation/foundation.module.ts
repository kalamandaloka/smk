import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { FoundationController } from './foundation.controller';
import { FoundationService } from './foundation.service';

@Module({
  controllers: [FoundationController],
  providers: [FoundationService, PrismaService],
})
export class FoundationModule {}

