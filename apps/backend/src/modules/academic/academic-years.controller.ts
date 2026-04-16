import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { AcademicYearsService } from './academic-years.service';
import { CreateAcademicYearDto } from './dto/create-academic-year.dto';

@Controller('academic-years')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AcademicYearsController {
  constructor(private readonly svc: AcademicYearsService) {}

  @Get()
  @Permissions('academic.manage')
  async list() {
    return this.svc.list();
  }

  @Post()
  @Permissions('academic.manage')
  async create(@Body() dto: CreateAcademicYearDto) {
    return this.svc.create(dto);
  }
}
