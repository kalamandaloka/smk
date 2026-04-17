import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { SuperadminService } from './superadmin.service';

@Controller('superadmin')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class SuperadminController {
  constructor(private readonly svc: SuperadminService) {}

  @Get('summary')
  @Permissions('platform.manage')
  async summary() {
    return this.svc.getSummary();
  }

  @Get('notifications')
  @Permissions('platform.manage')
  async notifications() {
    return this.svc.getNotifications();
  }

  @Get('calendar')
  @Permissions('platform.manage')
  async calendar() {
    return this.svc.getCalendarGlobal();
  }

  @Get('akademik/kurikulum')
  @Permissions('platform.manage')
  async kurikulum() {
    return this.svc.getKurikulum();
  }

  @Get('akademik/rombel-template')
  @Permissions('platform.manage')
  async rombelTemplate() {
    return this.svc.getRombelTemplate();
  }

  @Get('akademik/kalender-template')
  @Permissions('platform.manage')
  async kalenderTemplate() {
    return this.svc.getKalenderTemplate();
  }

  @Get('akademik/jenjang')
  @Permissions('platform.manage')
  async jenjang() {
    return this.svc.getJenjang();
  }

  @Get('akademik/fase-tingkat')
  @Permissions('platform.manage')
  async faseTingkat() {
    return this.svc.getFaseTingkat();
  }

  @Get('penilaian/pengaturan')
  @Permissions('platform.manage')
  async assessmentSystem() {
    return this.svc.getAssessmentSystem();
  }

  @Get('penilaian/template-rapor')
  @Permissions('platform.manage')
  async templateRapor() {
    return this.svc.getReportTemplates();
  }

  @Get('penilaian/predikat-nilai')
  @Permissions('platform.manage')
  async predikatNilai() {
    return this.svc.getGradePredicates();
  }

  @Get('penilaian/jenis-penilaian')
  @Permissions('platform.manage')
  async jenisPenilaian() {
    return this.svc.getAssessmentTypes();
  }

  @Get('penilaian/kkm')
  @Permissions('platform.manage')
  async kkm() {
    return this.svc.getKkmRules();
  }

  @Get('penilaian/aturan-kelulusan')
  @Permissions('platform.manage')
  async aturanKelulusan() {
    return this.svc.getGraduationRules();
  }

  @Get('penilaian/bank-soal-global')
  @Permissions('platform.manage')
  async bankSoalGlobal() {
    return this.svc.getGlobalQuestionBank();
  }

  @Get('siswa/master')
  @Permissions('platform.manage')
  async siswaGlobal() {
    return this.svc.getGlobalStudents();
  }

  @Get('siswa/status')
  @Permissions('platform.manage')
  async statusSiswa() {
    return this.svc.getStudentStatuses();
  }

  @Get('siswa/alumni')
  @Permissions('platform.manage')
  async alumni() {
    return this.svc.getAlumni();
  }

  @Get('siswa/mutasi')
  @Permissions('platform.manage')
  async mutasi() {
    return this.svc.getMutations();
  }

  @Get('siswa/prestasi')
  @Permissions('platform.manage')
  async prestasi() {
    return this.svc.getStudentAchievements();
  }

  @Get('siswa/pelanggaran')
  @Permissions('platform.manage')
  async pelanggaran() {
    return this.svc.getStudentViolations();
  }

  @Get('siswa/tata-tertib')
  @Permissions('platform.manage')
  async tataTertib() {
    return this.svc.getStudentRules();
  }

  @Get('administrasi/yayasan-unit')
  @Permissions('platform.manage')
  async yayasanUnit() {
    return this.svc.getFoundationAndUnits();
  }

  @Get('administrasi/master-sdm')
  @Permissions('platform.manage')
  async masterSdm() {
    return this.svc.getMasterSdm();
  }

  @Get('administrasi/approval-center')
  @Permissions('platform.manage')
  async approvalCenter() {
    return this.svc.getApprovalCenter();
  }

  @Get('administrasi/subrole')
  @Permissions('platform.manage')
  async subrole() {
    return this.svc.getSubroles();
  }

  @Get('administrasi/jabatan')
  @Permissions('platform.manage')
  async jabatan() {
    return this.svc.getPositions();
  }

  @Get('administrasi/dokumen-template')
  @Permissions('platform.manage')
  async dokumenTemplate() {
    return this.svc.getDocumentTemplates();
  }

  @Get('administrasi/audit-log')
  @Permissions('platform.manage')
  async auditLog() {
    return this.svc.getAuditLog();
  }

  @Get('keuangan/monitoring')
  @Permissions('platform.manage')
  async financeMonitoring() {
    return this.svc.getFinanceMonitoring();
  }

  @Get('keuangan/jenis-biaya')
  @Permissions('platform.manage')
  async jenisBiaya() {
    return this.svc.getFeeTypes();
  }

  @Get('keuangan/struktur-biaya')
  @Permissions('platform.manage')
  async strukturBiaya() {
    return this.svc.getFeeStructure();
  }

  @Get('keuangan/template-tagihan')
  @Permissions('platform.manage')
  async templateTagihan() {
    return this.svc.getBillingTemplates();
  }

  @Get('keuangan/payment-settings')
  @Permissions('platform.manage')
  async paymentSettings() {
    return this.svc.getPaymentSettings();
  }

  @Get('keuangan/rekap-pemasukan')
  @Permissions('platform.manage')
  async rekapPemasukan() {
    return this.svc.getIncomeRecap();
  }

  @Get('keuangan/tunggakan')
  @Permissions('platform.manage')
  async tunggakan() {
    return this.svc.getArrearsMonitoring();
  }

  @Get('keuangan/diskon-beasiswa')
  @Permissions('platform.manage')
  async diskonBeasiswa() {
    return this.svc.getDiscountScholarships();
  }

  @Get('komunikasi/helpdesk')
  @Permissions('platform.manage')
  async helpdesk() {
    return this.svc.getHelpdesk();
  }

  @Get('komunikasi/template-notifikasi')
  @Permissions('platform.manage')
  async templateNotifikasi() {
    return this.svc.getNotificationTemplates();
  }

  @Get('komunikasi/gateway')
  @Permissions('platform.manage')
  async gateway() {
    return this.svc.getMessagingGateway();
  }

  @Get('laporan/user')
  @Permissions('platform.manage')
  async laporanUser() {
    return this.svc.getUserReport();
  }

  @Get('laporan/aktivitas')
  @Permissions('platform.manage')
  async laporanAktivitas() {
    return this.svc.getActivityReport();
  }

  @Get('laporan/analytics')
  @Permissions('platform.manage')
  async analytics() {
    return this.svc.getAnalytics();
  }

  @Get('laporan/executive')
  @Permissions('platform.manage')
  async executive() {
    return this.svc.getExecutiveAnalytics();
  }

  @Get('laporan/akademik')
  @Permissions('platform.manage')
  async laporanAkademik() {
    return this.svc.getAcademicGlobalReport();
  }

  @Get('laporan/penilaian')
  @Permissions('platform.manage')
  async laporanPenilaian() {
    return this.svc.getAssessmentGlobalReport();
  }

  @Get('laporan/siswa')
  @Permissions('platform.manage')
  async laporanSiswa() {
    return this.svc.getStudentGlobalReport();
  }

  @Get('laporan/guru-staff')
  @Permissions('platform.manage')
  async laporanGuruStaff() {
    return this.svc.getTeacherStaffGlobalReport();
  }

  @Get('laporan/keuangan')
  @Permissions('platform.manage')
  async laporanKeuangan() {
    return this.svc.getFinanceGlobalReport();
  }

  @Get('pengaturan/branding')
  @Permissions('platform.manage')
  async branding() {
    return this.svc.getBranding();
  }

  @Get('pengaturan/domain')
  @Permissions('platform.manage')
  async domain() {
    return this.svc.getDomainSettings();
  }

  @Get('pengaturan/integrasi')
  @Permissions('platform.manage')
  async integrasi() {
    return this.svc.getIntegrations();
  }

  @Get('pengaturan/backup')
  @Permissions('platform.manage')
  async backup() {
    return this.svc.getBackupSettings();
  }

  @Get('pengaturan/keamanan')
  @Permissions('platform.manage')
  async keamanan() {
    return this.svc.getSecuritySettings();
  }

  @Get('pengaturan/system-settings')
  @Permissions('platform.manage')
  async systemSettings() {
    return this.svc.getSystemSettings();
  }

  @Get('pengaturan/umum')
  @Permissions('platform.manage')
  async umum() {
    return this.svc.getGeneralSettings();
  }

  @Get('pengaturan/konfigurasi-menu')
  @Permissions('platform.manage')
  async konfigurasiMenu() {
    return this.svc.getMenuConfig();
  }

  @Get('pengaturan/feature-toggle')
  @Permissions('platform.manage')
  async featureToggle() {
    return this.svc.getFeatureToggle();
  }

  @Get('pengaturan/api-webhook')
  @Permissions('platform.manage')
  async apiWebhook() {
    return this.svc.getApiWebhookSettings();
  }

  @Get('pengaturan/error-monitoring')
  @Permissions('platform.manage')
  async errorMonitoring() {
    return this.svc.getErrorMonitoring();
  }
}
