import { Body, Controller, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { SchoolsService } from './schools.service';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { CreateSchoolDto } from './dto/create-school.dto';
import { UpdateSchoolDto } from './dto/update-school.dto';

@Controller('schools')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SchoolsController {
  constructor(private readonly svc: SchoolsService) {}

  @Get()
  @Permissions('school.read')
  async list() {
    return this.svc.list();
  }

  @Post()
  @Permissions('school.manage')
  async create(@Body() dto: CreateSchoolDto) {
    return this.svc.create(dto);
  }

  @Get(':id')
  @Permissions('school.read')
  async get(@Param('id') id: string) {
    return this.svc.get(id);
  }

  @Patch(':id')
  @Permissions('school.manage')
  async update(@Param('id') id: string, @Body() dto: UpdateSchoolDto) {
    return this.svc.update(id, dto);
  }
}
