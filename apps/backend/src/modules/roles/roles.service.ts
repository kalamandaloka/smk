import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class RolesService {
  constructor(private prisma: PrismaService) {}

  async listRoles() {
    return this.prisma.role.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }

  async listPermissions() {
    return this.prisma.permission.findMany({
      orderBy: { createdAt: 'desc' },
    });
  }
}
