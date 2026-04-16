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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.QuizzesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const quizzes_service_1 = require("./quizzes.service");
const create_quiz_dto_1 = require("./dto/create-quiz.dto");
const submit_quiz_dto_1 = require("./dto/submit-quiz.dto");
let QuizzesController = class QuizzesController {
    constructor(svc) {
        this.svc = svc;
    }
    async create(dto) {
        return this.svc.create(dto);
    }
    async get(id) {
        return this.svc.get(id);
    }
    async startAttempt(quizId, req) {
        return this.svc.startAttempt(quizId, req.user.sub);
    }
    async submit(attemptId, req, dto) {
        return this.svc.submitAttempt(attemptId, req.user.sub, dto);
    }
    async getAttempt(attemptId, req) {
        return this.svc.getAttempt(attemptId, req.user.sub);
    }
};
exports.QuizzesController = QuizzesController;
__decorate([
    (0, common_1.Post)('quizzes'),
    (0, permissions_decorator_1.Permissions)('quiz.manage'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_quiz_dto_1.CreateQuizDto]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)('quizzes/:id'),
    (0, permissions_decorator_1.Permissions)('quiz.manage'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "get", null);
__decorate([
    (0, common_1.Post)('quizzes/:id/attempts'),
    (0, permissions_decorator_1.Permissions)('quiz.attempt'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "startAttempt", null);
__decorate([
    (0, common_1.Post)('quiz-attempts/:id/submit'),
    (0, permissions_decorator_1.Permissions)('quiz.attempt'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __param(2, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object, submit_quiz_dto_1.SubmitQuizDto]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "submit", null);
__decorate([
    (0, common_1.Get)('quiz-attempts/:id'),
    (0, permissions_decorator_1.Permissions)('quiz.attempt'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], QuizzesController.prototype, "getAttempt", null);
exports.QuizzesController = QuizzesController = __decorate([
    (0, common_1.Controller)(),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [quizzes_service_1.QuizzesService])
], QuizzesController);
//# sourceMappingURL=quizzes.controller.js.map