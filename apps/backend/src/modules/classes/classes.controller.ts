import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { ClassesService } from './classes.service';
import { CreateClassDto } from './dto/create-class.dto';
import { AssignUserDto } from './dto/assign-user.dto';
import { SetHomeroomTeacherDto } from './dto/set-homeroom-teacher.dto';

@Controller('classes')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ClassesController {
  constructor(private readonly svc: ClassesService) {}

  @Get()
  @Permissions('class.read')
  async list() {
    return this.svc.list();
  }

  @Post()
  @Permissions('class.manage')
  async create(@Body() dto: CreateClassDto) {
    return this.svc.create(dto);
  }

  @Get(':id/teachers')
  @Permissions('class.read')
  async listTeachers(@Param('id') id: string) {
    return this.svc.listTeachers(id);
  }

  @Post(':id/teachers')
  @Permissions('class.manage')
  async addTeacher(@Param('id') id: string, @Body() dto: AssignUserDto) {
    return this.svc.addTeacher(id, dto.userId);
  }

  @Delete(':id/teachers/:userId')
  @Permissions('class.manage')
  async removeTeacher(@Param('id') id: string, @Param('userId') userId: string) {
    return this.svc.removeTeacher(id, userId);
  }

  @Get(':id/students')
  @Permissions('class.read')
  async listStudents(@Param('id') id: string) {
    return this.svc.listStudents(id);
  }

  @Post(':id/students')
  @Permissions('class.manage')
  async addStudent(@Param('id') id: string, @Body() dto: AssignUserDto) {
    return this.svc.addStudent(id, dto.userId);
  }

  @Delete(':id/students/:userId')
  @Permissions('class.manage')
  async removeStudent(@Param('id') id: string, @Param('userId') userId: string) {
    return this.svc.removeStudent(id, userId);
  }

  @Put(':id/homeroom-teacher')
  @Permissions('class.manage')
  async setHomeroom(@Param('id') id: string, @Body() dto: SetHomeroomTeacherDto) {
    return this.svc.setHomeroomTeacher(id, dto.userId ?? null);
  }
}
