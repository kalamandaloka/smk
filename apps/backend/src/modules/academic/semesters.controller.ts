import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { SemestersService } from './semesters.service';
import { CreateSemesterDto } from './dto/create-semester.dto';

@Controller('semesters')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SemestersController {
  constructor(private readonly svc: SemestersService) {}

  @Get()
  @Permissions('academic.manage')
  async list() {
    return this.svc.list();
  }

  @Post()
  @Permissions('academic.manage')
  async create(@Body() dto: CreateSemesterDto) {
    return this.svc.create(dto);
  }
}
