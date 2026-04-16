import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { CoursesService } from './courses.service';
import { CreateCourseDto } from './dto/create-course.dto';
import { UpdateCourseDto } from './dto/update-course.dto';
import { AssignCourseClassDto } from './dto/assign-course-class.dto';

@Controller('courses')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class CoursesController {
  constructor(private readonly svc: CoursesService) {}

  @Get()
  @Permissions('course.read')
  async list() {
    return this.svc.list();
  }

  @Post()
  @Permissions('course.manage')
  async create(@Body() dto: CreateCourseDto) {
    return this.svc.create(dto);
  }

  @Get(':id')
  @Permissions('course.read')
  async get(@Param('id') id: string) {
    return this.svc.get(id);
  }

  @Patch(':id')
  @Permissions('course.manage')
  async update(@Param('id') id: string, @Body() dto: UpdateCourseDto) {
    return this.svc.update(id, dto);
  }

  @Get(':id/classes')
  @Permissions('course.read')
  async listAssignedClasses(@Param('id') id: string) {
    return this.svc.listAssignedClasses(id);
  }

  @Post(':id/classes')
  @Permissions('course.manage')
  async assignToClass(@Param('id') id: string, @Body() dto: AssignCourseClassDto) {
    return this.svc.assignToClass(id, dto.classId);
  }

  @Delete(':id/classes/:classId')
  @Permissions('course.manage')
  async unassignFromClass(@Param('id') id: string, @Param('classId') classId: string) {
    return this.svc.unassignFromClass(id, classId);
  }
}
