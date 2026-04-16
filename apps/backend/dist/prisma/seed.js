"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const client_1 = require("@prisma/client");
const bcrypt = require("bcryptjs");
const prisma = new client_1.PrismaClient();
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
        'platform.manage'
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
        { code: 'HEAD_PROGRAM', name: 'Kaprogli' },
        { code: 'TEACHER', name: 'Guru' },
        { code: 'HOMEROOM', name: 'Wali Kelas' },
        { code: 'COUNSELOR', name: 'Guru BK' },
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
    const adminEmail = 'admin@smk.local';
    const adminPwd = 'Admin123!';
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
    const dummyAccounts = [
        { email: 'kepsek@smk.local', name: 'Kepala Sekolah', roleCode: 'PRINCIPAL' },
        { email: 'akademik@smk.local', name: 'Admin Akademik', roleCode: 'ACADEMIC_ADMIN' },
        { email: 'kaprogli@smk.local', name: 'Kepala Program', roleCode: 'HEAD_PROGRAM' },
        { email: 'guru@smk.local', name: 'Budi Santoso (Guru)', roleCode: 'TEACHER' },
        { email: 'walikelas@smk.local', name: 'Siti Aminah (Wali Kelas)', roleCode: 'HOMEROOM' },
        { email: 'gurubk@smk.local', name: 'Ahmad Yani (Guru BK)', roleCode: 'COUNSELOR' },
        { email: 'siswa@smk.local', name: 'Andi (Siswa)', roleCode: 'STUDENT' }
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
//# sourceMappingURL=seed.js.map