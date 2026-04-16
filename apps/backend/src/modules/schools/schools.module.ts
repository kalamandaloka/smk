import { Module } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { SchoolsController } from './schools.controller';
import { PrismaService } from '../../prisma/prisma.service';

@Module({
  providers: [SchoolsService, PrismaService],
  controllers: [SchoolsController],
})
export class SchoolsModule {}
