import { Module } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { PrincipalController } from './principal.controller';
import { PrincipalService } from './principal.service';

@Module({
  controllers: [PrincipalController],
  providers: [PrincipalService, PrismaService],
})
export class PrincipalModule {}

