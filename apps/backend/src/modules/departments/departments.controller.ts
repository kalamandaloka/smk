import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { DepartmentsService } from './departments.service';
import { CreateDepartmentDto } from './dto/create-department.dto';

@Controller('departments')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class DepartmentsController {
  constructor(private readonly svc: DepartmentsService) {}

  @Get()
  @Permissions('program.read')
  async list() {
    return this.svc.list();
  }

  @Post()
  @Permissions('program.manage')
  async create(@Body() dto: CreateDepartmentDto) {
    return this.svc.create(dto);
  }
}
