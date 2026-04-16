import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { CourseModulesService } from './course-modules.service';
import { CreateCourseModuleDto } from './dto/create-course-module.dto';
import { UpdateCourseModuleDto } from './dto/update-course-module.dto';

@Controller('course-modules')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CourseModulesController {
  constructor(private readonly svc: CourseModulesService) {}

  @Get('by-course/:courseId')
  @Permissions('course.read')
  async listByCourse(@Param('courseId') courseId: string) {
    return this.svc.listByCourse(courseId);
  }

  @Post()
  @Permissions('course.manage')
  async create(@Body() dto: CreateCourseModuleDto) {
    return this.svc.create(dto);
  }

  @Patch(':id')
  @Permissions('course.manage')
  async update(@Param('id') id: string, @Body() dto: UpdateCourseModuleDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @Permissions('course.manage')
  async delete(@Param('id') id: string) {
    return this.svc.delete(id);
  }
}
