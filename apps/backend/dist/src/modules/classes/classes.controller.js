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
exports.ClassesController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../../common/guards/jwt-auth.guard");
const permissions_guard_1 = require("../../common/guards/permissions.guard");
const permissions_decorator_1 = require("../../common/decorators/permissions.decorator");
const classes_service_1 = require("./classes.service");
const create_class_dto_1 = require("./dto/create-class.dto");
const assign_user_dto_1 = require("./dto/assign-user.dto");
const set_homeroom_teacher_dto_1 = require("./dto/set-homeroom-teacher.dto");
let ClassesController = class ClassesController {
    constructor(svc) {
        this.svc = svc;
    }
    async list() {
        return this.svc.list();
    }
    async create(dto) {
        return this.svc.create(dto);
    }
    async listTeachers(id) {
        return this.svc.listTeachers(id);
    }
    async addTeacher(id, dto) {
        return this.svc.addTeacher(id, dto.userId);
    }
    async removeTeacher(id, userId) {
        return this.svc.removeTeacher(id, userId);
    }
    async listStudents(id) {
        return this.svc.listStudents(id);
    }
    async addStudent(id, dto) {
        return this.svc.addStudent(id, dto.userId);
    }
    async removeStudent(id, userId) {
        return this.svc.removeStudent(id, userId);
    }
    async setHomeroom(id, dto) {
        var _a;
        return this.svc.setHomeroomTeacher(id, (_a = dto.userId) !== null && _a !== void 0 ? _a : null);
    }
};
exports.ClassesController = ClassesController;
__decorate([
    (0, common_1.Get)(),
    (0, permissions_decorator_1.Permissions)('class.read'),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "list", null);
__decorate([
    (0, common_1.Post)(),
    (0, permissions_decorator_1.Permissions)('class.manage'),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_class_dto_1.CreateClassDto]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(':id/teachers'),
    (0, permissions_decorator_1.Permissions)('class.read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "listTeachers", null);
__decorate([
    (0, common_1.Post)(':id/teachers'),
    (0, permissions_decorator_1.Permissions)('class.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_user_dto_1.AssignUserDto]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "addTeacher", null);
__decorate([
    (0, common_1.Delete)(':id/teachers/:userId'),
    (0, permissions_decorator_1.Permissions)('class.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "removeTeacher", null);
__decorate([
    (0, common_1.Get)(':id/students'),
    (0, permissions_decorator_1.Permissions)('class.read'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "listStudents", null);
__decorate([
    (0, common_1.Post)(':id/students'),
    (0, permissions_decorator_1.Permissions)('class.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, assign_user_dto_1.AssignUserDto]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "addStudent", null);
__decorate([
    (0, common_1.Delete)(':id/students/:userId'),
    (0, permissions_decorator_1.Permissions)('class.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Param)('userId')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "removeStudent", null);
__decorate([
    (0, common_1.Put)(':id/homeroom-teacher'),
    (0, permissions_decorator_1.Permissions)('class.manage'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, set_homeroom_teacher_dto_1.SetHomeroomTeacherDto]),
    __metadata("design:returntype", Promise)
], ClassesController.prototype, "setHomeroom", null);
exports.ClassesController = ClassesController = __decorate([
    (0, common_1.Controller)('classes'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard, permissions_guard_1.PermissionsGuard),
    __metadata("design:paramtypes", [classes_service_1.ClassesService])
], ClassesController);
//# sourceMappingURL=classes.controller.js.map