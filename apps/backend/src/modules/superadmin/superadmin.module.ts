import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { SuperadminController } from './superadmin.controller';
import { SuperadminService } from './superadmin.service';

@Module({
  controllers: [SuperadminController],
  providers: [SuperadminService, PrismaService],
})
export class SuperadminModule {}

