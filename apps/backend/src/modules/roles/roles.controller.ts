import { Controller, Get, UseGuards } from '@nestjs/common';
import { JwtAuthGuard } from '../../common/guards/jwt-auth.guard';
import { PermissionsGuard } from '../../common/guards/permissions.guard';
import { Permissions } from '../../common/decorators/permissions.decorator';
import { RolesService } from './roles.service';

@Controller('roles')
@UseGuards(JwtAuthGuard, PermissionsGuard)
export class RolesController {
  constructor(private readonly svc: RolesService) {}

  @Get()
  @Permissions('platform.manage')
  async listRoles() {
    return this.svc.listRoles();
  }

  @Get('permissions')
  @Permissions('platform.manage')
  async listPermissions() {
    return this.svc.listPermissions();
  }
}
