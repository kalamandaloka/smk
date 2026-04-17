import { Controller, Get, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { StudentService } from './student.service';

@Controller('student')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class StudentController {
  constructor(private readonly svc: StudentService) {}

  @Get('summary')
  @Permissions('student.dashboard.view')
  async summary(@Req() req: any) {
    return this.svc.getSummary(req.user.sub);
  }

  @Get('calendar')
  @Permissions('student.calendar.view')
  async calendar(@Req() req: any) {
    return this.svc.getCalendar(req.user.sub);
  }

  @Get('classes')
  @Permissions('student.class.view')
  async classes(@Req() req: any) {
    return this.svc.getMyClasses(req.user.sub);
  }

  @Get('courses')
  @Permissions('student.subject.view')
  async courses(@Req() req: any) {
    return this.svc.getMyCourses(req.user.sub);
  }

  @Get('quizzes')
  @Permissions('student.exam.view')
  async quizzes(@Req() req: any) {
    return this.svc.getMyQuizzes(req.user.sub);
  }

  @Get('grades/quizzes')
  @Permissions('student.exam_score.view')
  async quizGrades(@Req() req: any) {
    return this.svc.getMyQuizGrades(req.user.sub);
  }

  @Get('progress')
  @Permissions('student.progress.view')
  async progress(@Req() req: any) {
    return this.svc.getMyLessonsProgress(req.user.sub);
  }

  @Get('attendance')
  @Permissions('student.attendance.view')
  async attendance(@Req() req: any) {
    return this.svc.getAttendance(req.user.sub);
  }

  @Get('portfolio')
  @Permissions('student.portfolio.view')
  async portfolio(@Req() req: any) {
    return this.svc.getPortfolio(req.user.sub);
  }

  @Get('counseling')
  @Permissions('student.counseling.view')
  async counseling(@Req() req: any) {
    return this.svc.getCounseling(req.user.sub);
  }

  @Get('documents')
  @Permissions('student.document.view')
  async documents(@Req() req: any) {
    return this.svc.getDocuments(req.user.sub);
  }

  @Get('finance')
  @Permissions('student.finance.view')
  async finance(@Req() req: any) {
    return this.svc.getFinance(req.user.sub);
  }
}

