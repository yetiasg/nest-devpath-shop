import { Body, Controller, Patch } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { ChangeRoleDto } from './dto/role.dto';
import { RoleService } from './role.service';

@ApiTags('role')
@Controller({ path: 'role', version: '1' })
export class RoleController {
  constructor(private readonly roleService: RoleService) {}
  @Patch()
  async changeUserRole(@Body() { userId, role }: ChangeRoleDto) {
    return await this.roleService.changeUserRole(userId, role);
  }
}
