import { Controller, Get, Param, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { FoundationService } from './foundation.service';

@Controller('foundation')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class FoundationController {
  constructor(private readonly svc: FoundationService) {}

  @Get('summary')
  @Permissions('foundation.dashboard.view')
  async summary() {
    return this.svc.getExecutiveSummary();
  }

  @Get('academic')
  @Permissions('foundation.academic_monitor.view')
  async academic() {
    return this.svc.getAcademicMonitoring();
  }

  @Get('curriculum')
  @Permissions('foundation.curriculum_monitor.view')
  async curriculum() {
    return this.svc.getCurriculumMonitoring();
  }

  @Get('assessment')
  @Permissions('foundation.assessment_monitor.view')
  async assessment() {
    return this.svc.getAssessmentMonitoring();
  }

  @Get('graduation')
  @Permissions('foundation.graduation_monitor.view')
  async graduation() {
    return this.svc.getGraduationMonitoring();
  }

  @Get('students')
  @Permissions('foundation.student_monitor.view')
  async students() {
    return this.svc.getStudentMonitoring();
  }

  @Get('hrd')
  @Permissions('foundation.hrd_monitor.view')
  async hrd() {
    return this.svc.getHrdMonitoring();
  }

  @Get('audit')
  @Permissions('foundation.audit_summary.view')
  async audit() {
    return this.svc.getAuditSummary();
  }

  @Get('finance/summary')
  @Permissions('foundation.finance_cashflow.view')
  async financeSummary() {
    return this.svc.getFinanceSummary();
  }

  @Get('finance/income')
  @Permissions('foundation.finance_income_monitor.view')
  async financeIncome() {
    return this.svc.getFinanceIncome();
  }

  @Get('finance/expense')
  @Permissions('foundation.finance_expense_monitor.view')
  async financeExpense() {
    return this.svc.getFinanceExpense();
  }

  @Get('finance/arrears')
  @Permissions('foundation.finance_arrears_monitor.view')
  async financeArrears() {
    return this.svc.getFinanceArrears();
  }

  @Get('finance/cashflow')
  @Permissions('foundation.finance_cashflow.view')
  async financeCashflow() {
    return this.svc.getFinanceCashflow();
  }

  @Get('approvals')
  @Permissions('foundation.strategy_approval.view')
  async approvals() {
    return this.svc.getApprovals();
  }

  @Get('documents')
  @Permissions('foundation.document.view')
  async documents() {
    return this.svc.getFoundationDocuments();
  }

  @Get('announcements')
  @Permissions('foundation.announcement.view')
  async announcements() {
    return this.svc.getFoundationAnnouncements();
  }

  @Get('reports/bulanan')
  @Permissions('foundation.report_monthly.view')
  async reportBulanan() {
    return this.svc.getStrategicReport('bulanan');
  }

  @Get('reports/semesteran')
  @Permissions('foundation.report_semester.view')
  async reportSemesteran() {
    return this.svc.getStrategicReport('semesteran');
  }

  @Get('reports/tahunan')
  @Permissions('foundation.report_annual.view')
  async reportTahunan() {
    return this.svc.getStrategicReport('tahunan');
  }

  @Get('calendar')
  @Permissions('foundation.dashboard.view')
  async calendar() {
    return this.svc.getCalendarEvents();
  }

  @Get('policies')
  @Permissions('foundation.policy.view')
  async policies() {
    return this.svc.getPolicies();
  }

  @Get('preferences')
  @Permissions('foundation.dashboard_preference.view')
  async preferences() {
    return this.svc.getDashboardPreferences();
  }
}
