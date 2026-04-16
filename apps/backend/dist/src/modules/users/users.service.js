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
exports.UsersService = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const bcrypt = require("bcryptjs");
let UsersService = class UsersService {
    constructor(prisma) {
        this.prisma = prisma;
    }
    async findAll() {
        return this.prisma.user.findMany({
            select: {
                id: true,
                email: true,
                name: true,
                isActive: true,
                createdAt: true,
                school: { select: { id: true, name: true } },
                userRoles: { select: { role: { select: { code: true, name: true } } } },
            },
            orderBy: { createdAt: 'desc' },
        });
    }
    async findOne(id) {
        const user = await this.prisma.user.findUnique({
            where: { id },
            select: {
                id: true,
                email: true,
                name: true,
                isActive: true,
                createdAt: true,
                school: { select: { id: true, name: true } },
                userRoles: { select: { role: { select: { id: true, code: true, name: true } } } },
                taughtClasses: { select: { class: { select: { id: true, name: true } } } },
                studentClasses: { select: { class: { select: { id: true, name: true } } } },
                homeroomForClasses: { select: { id: true, name: true } },
            },
        });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        return user;
    }
    async create(input) {
        var _a, _b;
        const hash = await bcrypt.hash(input.password, 10);
        const user = await this.prisma.user.create({
            data: {
                email: input.email,
                name: input.name,
                password: hash,
                isActive: (_a = input.isActive) !== null && _a !== void 0 ? _a : true,
                schoolId: input.schoolId,
            },
        });
        const roleCodes = [
            ...((_b = input.roleCodes) !== null && _b !== void 0 ? _b : []),
            ...(input.roleCode ? [input.roleCode] : []),
        ].filter(Boolean);
        if (roleCodes.length > 0)
            await this.setRoles(user.id, roleCodes);
        return { id: user.id };
    }
    async update(id, input) {
        const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true } });
        if (!user)
            throw new common_1.NotFoundException('User not found');
        const password = input.password ? await bcrypt.hash(input.password, 10) : undefined;
        const data = {};
        if (input.email !== undefined)
            data.email = input.email;
        if (input.name !== undefined)
            data.name = input.name;
        if (input.isActive !== undefined)
            data.isActive = input.isActive;
        if (input.schoolId !== undefined)
            data.schoolId = input.schoolId;
        if (password !== undefined)
            data.password = password;
        await this.prisma.user.update({ where: { id }, data });
        return { id };
    }
    async delete(id) {
        await this.prisma.user.delete({ where: { id } });
        return { id };
    }
    async setRoles(userId, roleCodes) {
        const roles = await this.prisma.role.findMany({
            where: { code: { in: roleCodes } },
            select: { id: true },
        });
        const roleIds = roles.map((r) => r.id);
        await this.prisma.$transaction([
            this.prisma.userRole.deleteMany({
                where: { userId, roleId: { notIn: roleIds.length > 0 ? roleIds : ['__none__'] } },
            }),
            this.prisma.userRole.createMany({
                data: roleIds.map((roleId) => ({ userId, roleId })),
                skipDuplicates: true,
            }),
        ]);
        return { userId, roleCodes };
    }
};
exports.UsersService = UsersService;
exports.UsersService = UsersService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UsersService);
//# sourceMappingURL=users.service.js.map