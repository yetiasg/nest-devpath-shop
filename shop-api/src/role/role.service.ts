import { BadRequestException, Injectable } from '@nestjs/common';
import { Role } from './role.type';

@Injectable()
export class RoleService {
  async changeUserRole(userId: string, role: Role) {
    if (role.toString() in Role) {
      return { userId, role };
    }
    return new BadRequestException();
  }
}
