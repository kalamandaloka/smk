import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

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

  async findOne(id: string) {
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
    if (!user) throw new NotFoundException('User not found');
    return user;
  }

  async create(input: {
    email: string;
    name: string;
    password: string;
    roleCode?: string;
    roleCodes?: string[];
    schoolId?: string;
    isActive?: boolean;
  }) {
    const hash = await bcrypt.hash(input.password, 10);
    const user = await this.prisma.user.create({
      data: {
        email: input.email,
        name: input.name,
        password: hash,
        isActive: input.isActive ?? true,
        schoolId: input.schoolId,
      },
    });
    const roleCodes = [
      ...(input.roleCodes ?? []),
      ...(input.roleCode ? [input.roleCode] : []),
    ].filter(Boolean);
    if (roleCodes.length > 0) await this.setRoles(user.id, roleCodes);
    return { id: user.id };
  }

  async update(
    id: string,
    input: {
      email?: string;
      name?: string;
      password?: string;
      isActive?: boolean;
      schoolId?: string | null;
    },
  ) {
    const user = await this.prisma.user.findUnique({ where: { id }, select: { id: true } });
    if (!user) throw new NotFoundException('User not found');

    const password = input.password ? await bcrypt.hash(input.password, 10) : undefined;
    const data: Record<string, unknown> = {};
    if (input.email !== undefined) data.email = input.email;
    if (input.name !== undefined) data.name = input.name;
    if (input.isActive !== undefined) data.isActive = input.isActive;
    if (input.schoolId !== undefined) data.schoolId = input.schoolId;
    if (password !== undefined) data.password = password;

    await this.prisma.user.update({ where: { id }, data });
    return { id };
  }

  async delete(id: string) {
    await this.prisma.user.delete({ where: { id } });
    return { id };
  }

  async setRoles(userId: string, roleCodes: string[]) {
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
}
