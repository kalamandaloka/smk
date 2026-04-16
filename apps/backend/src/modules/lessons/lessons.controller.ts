import { Body, Controller, Delete, Get, Param, Patch, Post, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { LessonsService } from './lessons.service';
import { CreateLessonDto } from './dto/create-lesson.dto';
import { UpdateLessonDto } from './dto/update-lesson.dto';

@Controller('lessons')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class LessonsController {
  constructor(private readonly svc: LessonsService) {}

  @Get('by-module/:moduleId')
  @Permissions('course.read')
  async listByModule(@Param('moduleId') moduleId: string) {
    return this.svc.listByModule(moduleId);
  }

  @Post()
  @Permissions('course.manage')
  async create(@Body() dto: CreateLessonDto) {
    return this.svc.create(dto);
  }

  @Get(':id')
  @Permissions('course.read')
  async get(@Param('id') id: string) {
    return this.svc.get(id);
  }

  @Patch(':id')
  @Permissions('course.manage')
  async update(@Param('id') id: string, @Body() dto: UpdateLessonDto) {
    return this.svc.update(id, dto);
  }

  @Delete(':id')
  @Permissions('course.manage')
  async delete(@Param('id') id: string) {
    return this.svc.delete(id);
  }
}
