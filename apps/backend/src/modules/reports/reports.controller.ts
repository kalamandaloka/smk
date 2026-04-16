import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { ReportsService } from './reports.service';

@Controller('reports')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class ReportsController {
  constructor(private readonly svc: ReportsService) {}

  @Get('quiz-grades')
  @Permissions('report.read')
  async getQuizGrades() {
    return this.svc.getQuizGrades();
  }

  @Get('lesson-progress')
  @Permissions('report.read')
  async getLessonProgress() {
    return this.svc.getLessonProgress();
  }
}
