import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { AdminService } from './admin.service';

@Controller('admin')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class AdminController {
  constructor(private readonly svc: AdminService) {}

  @Get('summary')
  @Permissions('admin.dashboard.view')
  async summary(@Req() req: any) {
    return this.svc.getSummary(req.user.sub);
  }

  @Get('calendar')
  @Permissions('admin.dashboard.view')
  async calendar(@Req() req: any) {
    return this.svc.getCalendar(req.user.sub);
  }

  @Get('rombel')
  @Permissions('admin.academic.view')
  async rombel(@Req() req: any) {
    return this.svc.getRombel(req.user.sub);
  }

  @Get('schedules/:kind')
  @Permissions('admin.academic.view')
  async schedules(@Req() req: any, @Param('kind') kind: string) {
    if (kind !== 'pelajaran' && kind !== 'ujian') {
      return this.svc.getSchedules(req.user.sub, 'pelajaran');
    }
    return this.svc.getSchedules(req.user.sub, kind as any);
  }

  @Get('lms-management')
  @Permissions('admin.academic.view')
  async lmsManagement(@Req() req: any) {
    return this.svc.getLmsManagement(req.user.sub);
  }

  @Get('grades/recap')
  @Permissions('admin.assessment.view')
  async gradesRecap(@Req() req: any) {
    return this.svc.getGradesRecap(req.user.sub);
  }

  @Get('grades/late-input')
  @Permissions('admin.assessment.view')
  async lateInput(@Req() req: any) {
    return this.svc.getLateGradeInput(req.user.sub);
  }

  @Get('students')
  @Permissions('admin.student.view')
  async students(@Req() req: any) {
    return this.svc.getStudents(req.user.sub);
  }

  @Get('staff')
  @Permissions('admin.staff.view')
  async staff(@Req() req: any) {
    return this.svc.getStaff(req.user.sub);
  }

  @Get('finance')
  @Permissions('admin.finance.view')
  async finance(@Req() req: any) {
    return this.svc.getFinance(req.user.sub);
  }

  @Get('approvals')
  @Permissions('admin.approval.view')
  async approvals(@Req() req: any) {
    return this.svc.getApprovals(req.user.sub);
  }

  @Get('documents')
  @Permissions('admin.document.view')
  async documents(@Req() req: any) {
    return this.svc.getDocuments(req.user.sub);
  }

  @Get('reports/users')
  @Permissions('admin.report.user.view')
  async reportUsers(@Req() req: any) {
    return this.svc.getUserReport(req.user.sub);
  }

  @Get('reports/attendance')
  @Permissions('admin.report.attendance.view')
  async reportAttendance(@Req() req: any) {
    return this.svc.getAttendanceReport(req.user.sub);
  }

  @Get('reports/finance')
  @Permissions('admin.report.finance.view')
  async reportFinance(@Req() req: any) {
    return this.svc.getFinanceReport(req.user.sub);
  }

  @Get('reports/academic')
  @Permissions('admin.report.academic.view')
  async reportAcademic(@Req() req: any) {
    return this.svc.getAcademicReport(req.user.sub);
  }

  @Get('school/settings')
  @Permissions('admin.school.settings.view')
  async schoolSettings(@Req() req: any) {
    return this.svc.getSchoolSettings(req.user.sub);
  }
}

