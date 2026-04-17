import { Controller, Get, Param, Req, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { PrincipalService } from './principal.service';

@Controller('principal')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class PrincipalController {
  constructor(private readonly svc: PrincipalService) {}

  @Get('summary')
  @Permissions('principal.dashboard.view')
  async summary(@Req() req: any) {
    return this.svc.getSummary(req.user.sub);
  }

  @Get('calendar')
  @Permissions('principal.dashboard.view')
  async calendar(@Req() req: any) {
    return this.svc.getCalendar(req.user.sub);
  }

  @Get('learning')
  @Permissions('principal.learning_monitor.view')
  async learning(@Req() req: any) {
    return this.svc.getLearningMonitoring(req.user.sub);
  }

  @Get('teachers')
  @Permissions('principal.teacher_monitor.view')
  async teachers(@Req() req: any) {
    return this.svc.getTeacherMonitoring(req.user.sub);
  }

  @Get('curriculum-schedule')
  @Permissions('principal.curriculum_schedule_monitor.view')
  async curriculum(@Req() req: any) {
    return this.svc.getCurriculumAndSchedule(req.user.sub);
  }

  @Get('attendance')
  @Permissions('principal.school_attendance.view')
  async attendance(@Req() req: any) {
    return this.svc.getAttendance(req.user.sub);
  }

  @Get('scores')
  @Permissions('principal.score_monitor.view')
  async scores(@Req() req: any) {
    return this.svc.getScoreMonitoring(req.user.sub);
  }

  @Get('final-score-validation')
  @Permissions('principal.final_score_validation.view')
  async finalScoreValidation(@Req() req: any) {
    return this.svc.getFinalScoreValidation(req.user.sub);
  }

  @Get('report-cards')
  @Permissions('principal.report.view')
  async reportCards(@Req() req: any) {
    return this.svc.getReportCards(req.user.sub);
  }

  @Get('graduation')
  @Permissions('principal.graduation.view')
  async graduation(@Req() req: any) {
    return this.svc.getGraduation(req.user.sub);
  }

  @Get('students')
  @Permissions('principal.student_monitor.view')
  async students(@Req() req: any) {
    return this.svc.getStudentMonitoring(req.user.sub);
  }

  @Get('bk')
  @Permissions('principal.bk_monitor.view')
  async bk(@Req() req: any) {
    return this.svc.getBkAndStudentAffairs(req.user.sub);
  }

  @Get('achievements')
  @Permissions('principal.student_achievement.view')
  async achievements(@Req() req: any) {
    return this.svc.getAchievements(req.user.sub);
  }

  @Get('violations')
  @Permissions('principal.student_violation.view')
  async violations(@Req() req: any) {
    return this.svc.getViolations(req.user.sub);
  }

  @Get('approvals')
  @Permissions('principal.program_approval.view')
  async approvals(@Req() req: any) {
    return this.svc.getApprovals(req.user.sub);
  }

  @Get('documents')
  @Permissions('principal.school_document.view')
  async documents(@Req() req: any) {
    return this.svc.getDocuments(req.user.sub);
  }

  @Get('hrd')
  @Permissions('principal.hrd_monitor.view')
  async hrd(@Req() req: any) {
    return this.svc.getHrdMonitoring(req.user.sub);
  }

  @Get('finance/summary')
  @Permissions('principal.finance_summary.view')
  async financeSummary(@Req() req: any) {
    return this.svc.getFinanceSummary(req.user.sub);
  }

  @Get('payments')
  @Permissions('principal.payment_monitor.view')
  async payments(@Req() req: any) {
    return this.svc.getPaymentMonitoring(req.user.sub);
  }

  @Get('announcements')
  @Permissions('principal.announcement.view')
  async announcements(@Req() req: any) {
    return this.svc.getAnnouncements(req.user.sub);
  }

  @Get('audit')
  @Permissions('principal.hrd_monitor.view')
  async audit(@Req() req: any) {
    return this.svc.getAuditSummary(req.user.sub);
  }

  @Get('reports/:kind')
  @Permissions('principal.academic_report.view')
  async reports(@Req() req: any, @Param('kind') kind: string) {
    if (kind !== 'akademik' && kind !== 'guru' && kind !== 'siswa' && kind !== 'disiplin' && kind !== 'keuangan-ringkas') {
      return this.svc.getReports(req.user.sub, 'akademik');
    }
    return this.svc.getReports(req.user.sub, kind as any);
  }

  @Get('preferences')
  @Permissions('principal.academic_report.view')
  async preferences(@Req() req: any) {
    return this.svc.getPreferences(req.user.sub);
  }
}

