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
exports.InteractiveService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let InteractiveService = class InteractiveService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async launchSession(lessonId, userId) {
        const lesson = await this.prisma.lesson.findUnique({ where: { id: lessonId } });
        if (!lesson)
            throw new common_1.NotFoundException('Lesson not found');
        return this.prisma.interactiveSession.create({
            data: {
                lessonId,
                userId,
                status: 'STARTED',
            },
        });
    }
    async submitResult(sessionId, data) {
        const session = await this.prisma.interactiveSession.findUnique({ where: { id: sessionId } });
        if (!session)
            throw new common_1.NotFoundException('Session not found');
        await this.prisma.interactiveResult.create({
            data: {
                sessionId,
                data: data || {},
            },
        });
        return this.prisma.interactiveSession.update({
            where: { id: sessionId },
            data: { status: 'COMPLETED' },
        });
    }
    async getSession(sessionId) {
        return this.prisma.interactiveSession.findUnique({
            where: { id: sessionId },
            include: { results: true },
        });
    }
};
exports.InteractiveService = InteractiveService;
exports.InteractiveService = InteractiveService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], InteractiveService);
//# sourceMappingURL=interactive.service.js.map