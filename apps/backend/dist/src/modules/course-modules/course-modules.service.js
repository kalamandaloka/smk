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
exports.CourseModulesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let CourseModulesService = class CourseModulesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async listByCourse(courseId) {
        return this.prisma.courseModule.findMany({
            where: { courseId },
            orderBy: [{ order: 'asc' }, { createdAt: 'asc' }],
        });
    }
    async create(dto) {
        var _a;
        return this.prisma.courseModule.create({
            data: { courseId: dto.courseId, title: dto.title, order: (_a = dto.order) !== null && _a !== void 0 ? _a : 0 },
        });
    }
    async update(id, dto) {
        return this.prisma.courseModule.update({ where: { id }, data: dto });
    }
    async delete(id) {
        return this.prisma.courseModule.delete({ where: { id } });
    }
};
exports.CourseModulesService = CourseModulesService;
exports.CourseModulesService = CourseModulesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], CourseModulesService);
//# sourceMappingURL=course-modules.service.js.map