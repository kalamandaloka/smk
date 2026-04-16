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
exports.CourseModulesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const course_modules_service_1 = require("./course-modules.service");
const create_course_module_dto_1 = require("./dto/create-course-module.dto");
const update_course_module_dto_1 = require("./dto/update-course-module.dto");
let CourseModulesController = class CourseModulesController {
    constructor(svc) {
        this.svc = svc;
    }
    async listByCourse(courseId) {
        return this.svc.listByCourse(courseId);
    }
    async create(dto) {
        return this.svc.create(dto);
    }
    async update(id, dto) {
        return this.svc.update(id, dto);
    }
    async delete(id) {
        return this.svc.delete(id);
    }
};
exports.CourseModulesController = CourseModulesController;
__decorate([
    (0, common_1.Get)('by-course/:courseId'),
    (0, permissions_decorator_1.Permissions)('course.read'),
    __param(0, (0, common_1.Param)('courseId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "listByCourse", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)('course.manage'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_course_module_dto_1.CreateCourseModuleDto]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "create", null);
__decorate([
    (0, common_1.Patch)(':id'),
    (0, permissions_decorator_1.Permissions)('course.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_course_module_dto_1.UpdateCourseModuleDto]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    (0, permissions_decorator_1.Permissions)('course.manage'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CourseModulesController.prototype, "delete", null);
exports.CourseModulesController = CourseModulesController = __decorate([
    (0, common_1.Controller)('course-modules'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [course_modules_service_1.CourseModulesService])
], CourseModulesController);
//# sourceMappingURL=course-modules.controller.js.map