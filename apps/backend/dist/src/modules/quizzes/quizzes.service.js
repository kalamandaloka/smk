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
exports.QuizzesService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let QuizzesService = class QuizzesService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async create(dto) {
        var _a, _b;
        if (!dto.questions || dto.questions.length === 0)
            throw new common_1.BadRequestException('questions required');
        return this.prisma.quiz.create({
            data: {
                lessonId: dto.lessonId,
                passingScore: (_a = dto.passingScore) !== null && _a !== void 0 ? _a : 0,
                maxAttempts: (_b = dto.maxAttempts) !== null && _b !== void 0 ? _b : 0,
                questions: {
                    create: dto.questions.map((q, idx) => {
                        var _a;
                        return ({
                            prompt: q.prompt,
                            order: (_a = q.order) !== null && _a !== void 0 ? _a : idx,
                            options: {
                                create: q.options.map((o) => {
                                    var _a;
                                    return ({
                                        text: o.text,
                                        isCorrect: (_a = o.isCorrect) !== null && _a !== void 0 ? _a : false,
                                    });
                                }),
                            },
                        });
                    }),
                },
            },
            include: { questions: { include: { options: true }, orderBy: { order: 'asc' } } },
        });
    }
    async get(id) {
        const quiz = await this.prisma.quiz.findUnique({
            where: { id },
            include: { questions: { include: { options: true }, orderBy: { order: 'asc' } } },
        });
        if (!quiz)
            throw new common_1.NotFoundException();
        return quiz;
    }
    async startAttempt(quizId, studentId) {
        const quiz = await this.prisma.quiz.findUnique({ where: { id: quizId } });
        if (!quiz)
            throw new common_1.NotFoundException();
        if (quiz.maxAttempts > 0) {
            const attempts = await this.prisma.quizAttempt.count({ where: { quizId, studentId } });
            if (attempts >= quiz.maxAttempts)
                throw new common_1.ForbiddenException('max attempts reached');
        }
        return this.prisma.quizAttempt.create({ data: { quizId, studentId } });
    }
    async submitAttempt(attemptId, studentId, dto) {
        var _a;
        const attempt = await this.prisma.quizAttempt.findUnique({
            where: { id: attemptId },
            include: {
                quiz: {
                    include: {
                        questions: { include: { options: true }, orderBy: { order: 'asc' } },
                    },
                },
            },
        });
        if (!attempt)
            throw new common_1.NotFoundException();
        if (attempt.studentId !== studentId)
            throw new common_1.ForbiddenException();
        if (attempt.submittedAt)
            throw new common_1.BadRequestException('already submitted');
        const questionById = new Map(attempt.quiz.questions.map((q) => [q.id, q]));
        const answers = (_a = dto.answers) !== null && _a !== void 0 ? _a : [];
        const filtered = answers.filter((a) => questionById.has(a.questionId));
        const correctByQuestion = new Map();
        for (const q of attempt.quiz.questions) {
            const correct = q.options.find((o) => o.isCorrect);
            if (correct)
                correctByQuestion.set(q.id, correct.id);
        }
        let correctCount = 0;
        for (const a of filtered) {
            const correctOptionId = correctByQuestion.get(a.questionId);
            if (correctOptionId && correctOptionId === a.optionId)
                correctCount += 1;
        }
        const total = attempt.quiz.questions.length;
        const score = total === 0 ? 0 : Math.round((correctCount / total) * 100);
        const passed = score >= attempt.quiz.passingScore;
        await this.prisma.$transaction(async (tx) => {
            await tx.quizAnswer.createMany({
                data: filtered.map((a) => ({ attemptId, questionId: a.questionId, optionId: a.optionId })),
                skipDuplicates: true,
            });
            await tx.quizAttempt.update({
                where: { id: attemptId },
                data: { submittedAt: new Date(), score, passed },
            });
        });
        return { score, passed };
    }
    async getAttempt(attemptId, studentId) {
        const attempt = await this.prisma.quizAttempt.findUnique({
            where: { id: attemptId },
            include: { quiz: { include: { lesson: true } }, answers: true },
        });
        if (!attempt)
            throw new common_1.NotFoundException();
        if (attempt.studentId !== studentId)
            throw new common_1.ForbiddenException();
        return attempt;
    }
};
exports.QuizzesService = QuizzesService;
exports.QuizzesService = QuizzesService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], QuizzesService);
//# sourceMappingURL=quizzes.service.js.map