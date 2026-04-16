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
exports.InteractiveController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const interactive_service_1 = require("./interactive.service");
let InteractiveController = class InteractiveController {
    constructor(svc) {
        this.svc = svc;
    }
    async launchSession(lessonId, req) {
        return this.svc.launchSession(lessonId, req.user.sub);
    }
    async submitResult(sessionId, body) {
        return this.svc.submitResult(sessionId, body.data);
    }
    async getSession(sessionId) {
        return this.svc.getSession(sessionId);
    }
};
exports.InteractiveController = InteractiveController;
__decorate([
    (0, common_1.Post)('launch/:lessonId'),
    __param(0, (0, common_1.Param)('lessonId')),
    __param(1, (0, common_1.Req)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InteractiveController.prototype, "launchSession", null);
__decorate([
    (0, common_1.Post)('session/:sessionId/result'),
    __param(0, (0, common_1.Param)('sessionId')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, Object]),
    __metadata("design:returntype", Promise)
], InteractiveController.prototype, "submitResult", null);
__decorate([
    (0, common_1.Get)('session/:sessionId'),
    __param(0, (0, common_1.Param)('sessionId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], InteractiveController.prototype, "getSession", null);
exports.InteractiveController = InteractiveController = __decorate([
    (0, common_1.Controller)('interactive'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [interactive_service_1.InteractiveService])
], InteractiveController);
//# sourceMappingURL=interactive.controller.js.map