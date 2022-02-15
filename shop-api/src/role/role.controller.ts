import { Body, Controller, Patch, UseGuards } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChangeRoleDto } from './dto/role.dto';
import { RoleGuard } from './role.guard';
import { RoleService } from './role.service';
import { Role } from './role.type';

@ApiTags('role')
@Controller({ path: 'role', version: '1' })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Patch()
  @UseGuards(RoleGuard([Role.ADMIN, Role.USER]))
  async changeUserRole(@Body() { userId, role }: ChangeRoleDto) {
    return await this.roleService.changeUserRole(userId, role);
  }
}
