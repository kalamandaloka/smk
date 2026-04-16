import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { ProgramsService } from './programs.service';
import { CreateProgramDto } from './dto/create-program.dto';

@Controller('programs')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ProgramsController {
  constructor(private readonly svc: ProgramsService) {}

  @Get()
  @Permissions('program.read')
  async list() {
    return this.svc.list();
  }

  @Post()
  @Permissions('program.manage')
  async create(@Body() dto: CreateProgramDto) {
    return this.svc.create(dto);
  }
}
