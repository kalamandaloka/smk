import { CanActivate, ExecutionContext, Injectable, ForbiddenException } from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { PERMISSIONS_KEY } from '../decorators/permissions.decorator';
import { PrismaService } from '../../prisma/prisma.service';

@Injectable()
export class PermissionsGuard implements CanActivate {
  constructor(private reflector: Reflector, private prisma: PrismaService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const required = this.reflector.getAllAndOverride<string[]>(PERMISSIONS_KEY, [
      context.getHandler(),
      context.getClass(),
    ]);
    if (!required || required.length === 0) return true;
    const req = context.switchToHttp().getRequest();
    const user = req.user as { sub: string };
    if (!user?.sub) throw new ForbiddenException();
    const perms = await this.prisma.permission.findMany({
      where: {
        rolePerms: {
          some: {
            role: { userRoles: { some: { userId: user.sub } } },
          },
        },
      },
      select: { code: true },
    });
    const codes = new Set(perms.map((p) => p.code));
    const ok = required.every((p) => codes.has(p));
    if (!ok) throw new ForbiddenException();
    return true;
  }
}
