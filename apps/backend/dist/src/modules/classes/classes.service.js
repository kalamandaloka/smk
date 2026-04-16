"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClassesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let ClassesService = class ClassesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async list() {
        return this.prisma.class.findMany({
            include: {
                school: true,
                department: true,
                academicYear: true,
                homeroomTeacher: { select: { id: true, name: true, email: true } },
                _count: { select: { teachers: true, students: true } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async create(dto) {
        return this.prisma.class.create({ data: dto });
    }
    async listTeachers(classId) {
        const exists = await this.prisma.class.findUnique({ where: { id: classId }, select: { id: true } });
        if (!exists)
            throw new common_1.NotFoundException('Class not found');
        return this.prisma.classTeacher.findMany({
            where: { classId },
            select: { id: true, teacher: { select: { id: true, email: true, name: true } }, createdAt: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async addTeacher(classId, teacherId) {
        await this.prisma.classTeacher.create({ data: { classId, teacherId } });
        return { classId, teacherId };
    }
    async removeTeacher(classId, teacherId) {
        await this.prisma.classTeacher.deleteMany({ where: { classId, teacherId } });
        return { classId, teacherId };
    }
    async listStudents(classId) {
        const exists = await this.prisma.class.findUnique({ where: { id: classId }, select: { id: true } });
        if (!exists)
            throw new common_1.NotFoundException('Class not found');
        return this.prisma.classStudent.findMany({
            where: { classId },
            select: { id: true, student: { select: { id: true, email: true, name: true } }, createdAt: true },
            orderBy: { createdAt: 'desc' },
        });
    }
    async addStudent(classId, studentId) {
        await this.prisma.classStudent.create({ data: { classId, studentId } });
        return { classId, studentId };
    }
    async removeStudent(classId, studentId) {
        await this.prisma.classStudent.deleteMany({ where: { classId, studentId } });
        return { classId, studentId };
    }
    async setHomeroomTeacher(classId, teacherId) {
        await this.prisma.class.update({ where: { id: classId }, data: { homeroomTeacherId: teacherId } });
        return { classId, teacherId };
    }
};
exports.ClassesService = ClassesService;
exports.ClassesService = ClassesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], ClassesService);
//# sourceMappingURL=classes.service.js.map