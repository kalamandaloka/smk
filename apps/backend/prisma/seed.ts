import { PrismaClient } from '@prisma/client';
import * as bcrypt from 'bcryptjs';

const prisma = new PrismaClient();

async function main() {
  const permissions = [
    'user.read',
    'user.create',
    'user.update',
    'school.read',
    'school.manage',
    'academic.manage',
    'program.read',
    'program.manage',
    'class.read',
    'class.manage',
    'course.read',
    'course.manage',
    'lesson.read',
    'lesson.manage',
    'quiz.manage',
    'quiz.attempt',
    'assessment.manage',
    'progress.read',
    'progress.write',
    'report.read',
    'report.school.read',
    'platform.manage',
    'foundation.dashboard.view',
    'foundation.academic_monitor.view',
    'foundation.curriculum_monitor.view',
    'foundation.assessment_monitor.view',
    'foundation.graduation_monitor.view',
    'foundation.student_monitor.view',
    'foundation.student_achievement_monitor.view',
    'foundation.student_violation_monitor.view',
    'foundation.hrd_monitor.view',
    'foundation.strategy_approval.view',
    'foundation.strategy_approval.approve',
    'foundation.document.view',
    'foundation.document.create',
    'foundation.document.edit',
    'foundation.audit_summary.view',
    'foundation.finance_income_monitor.view',
    'foundation.finance_expense_monitor.view',
    'foundation.finance_arrears_monitor.view',
    'foundation.finance_cashflow.view',
    'foundation.announcement.view',
    'foundation.announcement.create',
    'foundation.announcement.edit',
    'foundation.announcement.approve',
    'foundation.report_monthly.view',
    'foundation.report_semester.view',
    'foundation.report_annual.view',
    'foundation.policy.view',
    'foundation.policy.create',
    'foundation.policy.edit',
    'foundation.policy.approve',
    'foundation.dashboard_preference.view',
    'foundation.dashboard_preference.edit',
    'principal.dashboard.view',
    'principal.learning_monitor.view',
    'principal.teacher_monitor.view',
    'principal.curriculum_schedule_monitor.view',
    'principal.school_attendance.view',
    'principal.score_monitor.view',
    'principal.final_score_validation.view',
    'principal.final_score_validation.approve',
    'principal.report.view',
    'principal.report.approve',
    'principal.graduation.view',
    'principal.graduation.approve',
    'principal.student_monitor.view',
    'principal.bk_monitor.view',
    'principal.student_achievement.view',
    'principal.student_violation.view',
    'principal.program_approval.view',
    'principal.program_approval.approve',
    'principal.school_document.view',
    'principal.school_document.create',
    'principal.school_document.edit',
    'principal.hrd_monitor.view',
    'principal.finance_summary.view',
    'principal.payment_monitor.view',
    'principal.announcement.view',
    'principal.announcement.create',
    'principal.announcement.edit',
    'principal.announcement.approve',
    'principal.message.view',
    'principal.message.create',
    'principal.academic_report.view',
    'principal.teacher_report.view',
    'principal.student_report.view',
    'principal.discipline_report.view',
    'principal.finance_report.view',
    'principal.dashboard_preference.view',
    'principal.dashboard_preference.edit',
    'principal.school_profile.view',
    'principal.school_profile.edit',
    'student.dashboard.view',
    'student.calendar.view',
    'student.class.view',
    'student.subject.view',
    'student.material.view',
    'student.assignment.view',
    'student.assignment.submit',
    'student.exam.view',
    'student.exam.submit',
    'student.schedule.view',
    'student.assignment_score.view',
    'student.exam_score.view',
    'student.practice_score.view',
    'student.report.view',
    'student.attendance.view',
    'student.portfolio.view',
    'student.portfolio.create',
    'student.portfolio.edit',
    'student.counseling.view',
    'student.counseling.create',
    'student.document.view',
    'student.certificate.view',
    'student.finance.view',
    'student.payment.view',
    'student.payment.history.view',
    'student.forum.view',
    'student.forum.create',
    'student.message.view',
    'student.message.create',
    'student.announcement.view',
    'student.progress.view',
    'student.attendance_recap.view',
    'student.score_summary.view',
    'student.profile.view',
    'student.profile.edit',
    'student.password.change',
    'student.preference.view',
    'student.preference.edit',
    'admin.dashboard.view',
    'admin.academic.view',
    'admin.assessment.view',
    'admin.student.view',
    'admin.staff.view',
    'admin.document.view',
    'admin.approval.view',
    'admin.finance.view',
    'admin.report.academic.view',
    'admin.report.attendance.view',
    'admin.report.finance.view',
    'admin.report.user.view',
    'admin.school.settings.view'
  ];

  for (const code of permissions) {
    await prisma.permission.upsert({
      where: { code },
      update: {},
      create: { code, name: code }
    });
  }

  const roles = [
    { code: 'PLATFORM_ADMIN', name: 'Platform Admin' },
    { code: 'PRINCIPAL', name: 'Kepala Sekolah' },
    { code: 'ACADEMIC_ADMIN', name: 'Admin Akademik' },
    { code: 'CHAIRMAN_FOUNDATION', name: 'Ketua Yayasan' },
    { code: 'HEAD_PROGRAM', name: 'Kaprogli' },
    { code: 'TEACHER', name: 'Guru' },
    { code: 'HOMEROOM', name: 'Wali Kelas' },
    { code: 'STUDENT_AFFAIRS', name: 'Kesiswaan' },
    { code: 'COUNSELOR', name: 'Guru BK' },
    { code: 'FINANCE', name: 'Keuangan' },
    { code: 'STUDENT', name: 'Siswa' }
  ];

  for (const r of roles) {
    await prisma.role.upsert({
      where: { code: r.code },
      update: { name: r.name },
      create: r
    });
  }

  const allPerms = await prisma.permission.findMany();
  const adminRole = await prisma.role.findUnique({ where: { code: 'PLATFORM_ADMIN' } });
  if (adminRole) {
    for (const p of allPerms) {
      await prisma.rolePerm.upsert({
        where: { roleId_permissionId: { roleId: adminRole.id, permissionId: p.id } },
        update: {},
        create: { roleId: adminRole.id, permissionId: p.id }
      });
    }
  }

  async function assignPerms(roleCode: string, permCodes: string[]) {
    const role = await prisma.role.findUnique({ where: { code: roleCode } });
    if (!role) return;
    const perms = await prisma.permission.findMany({ where: { code: { in: permCodes } } });
    for (const p of perms) {
      await prisma.rolePerm.upsert({
        where: { roleId_permissionId: { roleId: role.id, permissionId: p.id } },
        update: {},
        create: { roleId: role.id, permissionId: p.id },
      });
    }
  }

  await assignPerms('CHAIRMAN_FOUNDATION', [
    'school.read',
    'course.read',
    'class.read',
    'user.read',
    'progress.read',
    'report.read',
    'foundation.dashboard.view',
    'foundation.academic_monitor.view',
    'foundation.curriculum_monitor.view',
    'foundation.assessment_monitor.view',
    'foundation.graduation_monitor.view',
    'foundation.student_monitor.view',
    'foundation.student_achievement_monitor.view',
    'foundation.student_violation_monitor.view',
    'foundation.hrd_monitor.view',
    'foundation.strategy_approval.view',
    'foundation.document.view',
    'foundation.audit_summary.view',
    'foundation.finance_income_monitor.view',
    'foundation.finance_expense_monitor.view',
    'foundation.finance_arrears_monitor.view',
    'foundation.finance_cashflow.view',
    'foundation.announcement.view',
    'foundation.report_monthly.view',
    'foundation.report_semester.view',
    'foundation.report_annual.view',
    'foundation.policy.view',
    'foundation.dashboard_preference.view',
  ]);

  await assignPerms('PRINCIPAL', [
    'school.read',
    'course.read',
    'class.read',
    'user.read',
    'progress.read',
    'report.read',
    'principal.dashboard.view',
    'principal.learning_monitor.view',
    'principal.teacher_monitor.view',
    'principal.curriculum_schedule_monitor.view',
    'principal.school_attendance.view',
    'principal.score_monitor.view',
    'principal.final_score_validation.view',
    'principal.report.view',
    'principal.graduation.view',
    'principal.student_monitor.view',
    'principal.bk_monitor.view',
    'principal.student_achievement.view',
    'principal.student_violation.view',
    'principal.program_approval.view',
    'principal.school_document.view',
    'principal.hrd_monitor.view',
    'principal.finance_summary.view',
    'principal.payment_monitor.view',
    'principal.announcement.view',
    'principal.message.view',
    'principal.academic_report.view',
    'principal.teacher_report.view',
    'principal.student_report.view',
    'principal.discipline_report.view',
    'principal.finance_report.view',
    'principal.dashboard_preference.view',
    'principal.school_profile.view',
  ]);

  await assignPerms('STUDENT', [
    'school.read',
    'course.read',
    'class.read',
    'progress.read',
    'progress.write',
    'quiz.attempt',
    'student.dashboard.view',
    'student.calendar.view',
    'student.class.view',
    'student.subject.view',
    'student.material.view',
    'student.exam.view',
    'student.exam.submit',
    'student.exam_score.view',
    'student.progress.view',
    'student.attendance.view',
    'student.portfolio.view',
    'student.counseling.view',
    'student.document.view',
    'student.finance.view',
    'student.announcement.view',
    'student.profile.view',
    'student.profile.edit',
    'student.preference.view',
    'student.preference.edit',
  ]);

  await assignPerms('ACADEMIC_ADMIN', [
    'user.read',
    'user.create',
    'user.update',
    'school.read',
    'school.manage',
    'academic.manage',
    'program.read',
    'program.manage',
    'class.read',
    'class.manage',
    'course.read',
    'course.manage',
    'quiz.manage',
    'quiz.attempt',
    'progress.read',
    'progress.write',
    'report.read',
    'admin.dashboard.view',
    'admin.academic.view',
    'admin.assessment.view',
    'admin.student.view',
    'admin.staff.view',
    'admin.document.view',
    'admin.approval.view',
    'admin.finance.view',
    'admin.report.academic.view',
    'admin.report.attendance.view',
    'admin.report.finance.view',
    'admin.report.user.view',
    'admin.school.settings.view',
  ]);

  const adminEmail = 'superadmin@smk.com';
  const adminPwd = 'admin123';
  const password = await bcrypt.hash(adminPwd, 10);
  const adminUser = await prisma.user.upsert({
    where: { email: adminEmail },
    update: { name: 'Platform Admin', password },
    create: { email: adminEmail, name: 'Platform Admin', password }
  });
  if (adminRole) {
    await prisma.userRole.upsert({
      where: { userId_roleId: { userId: adminUser.id, roleId: adminRole.id } },
      update: {},
      create: { userId: adminUser.id, roleId: adminRole.id }
    });
  }

  // Create test accounts for each role dashboard
  const dummyAccounts = [
    { email: 'admin@smk.com', name: 'Admin Akademik', roleCode: 'ACADEMIC_ADMIN' },
    { email: 'ketuayayasan@smk.com', name: 'Ketua Yayasan', roleCode: 'CHAIRMAN_FOUNDATION' },
    { email: 'kepalasekolah@smk.com', name: 'Kepala Sekolah', roleCode: 'PRINCIPAL' },
    { email: 'guru@smk.com', name: 'Guru', roleCode: 'TEACHER' },
    { email: 'walikelas@smk.com', name: 'Wali Kelas', roleCode: 'HOMEROOM' },
    { email: 'kaprogli@smk.com', name: 'Kepala Program', roleCode: 'HEAD_PROGRAM' },
    { email: 'kesiswaan@smk.com', name: 'Kesiswaan', roleCode: 'STUDENT_AFFAIRS' },
    { email: 'bk@smk.com', name: 'Guru BK', roleCode: 'COUNSELOR' },
    { email: 'keuangan@smk.com', name: 'Keuangan', roleCode: 'FINANCE' },
    { email: 'siswa@smk.com', name: 'Siswa', roleCode: 'STUDENT' }
  ];

  for (const account of dummyAccounts) {
    const role = await prisma.role.findUnique({ where: { code: account.roleCode } });
    if (role) {
      const user = await prisma.user.upsert({
        where: { email: account.email },
        update: { name: account.name, password },
        create: { email: account.email, name: account.name, password }
      });
      await prisma.userRole.upsert({
        where: { userId_roleId: { userId: user.id, roleId: role.id } },
        update: {},
        create: { userId: user.id, roleId: role.id }
      });
    }
  }
}

main()
  .then(async () => {
    await prisma.$disconnect();
  })
  .catch(async (e) => {
    await prisma.$disconnect();
    process.exit(1);
  });
