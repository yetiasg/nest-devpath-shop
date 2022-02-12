import {
  CanActivate,
  ExecutionContext,
  mixin,
  Type,
  UnauthorizedException,
} from '@nestjs/common';
import { Role } from 'src/role/role.type';

export const RoleGuard = (
  roles: Role[] = [],
  canSuperAdmin = true,
): Type<CanActivate> => {
  class RoleGuardMixin implements CanActivate {
    canActivate(context: ExecutionContext) {
      const { user } = context.switchToHttp().getRequest();
      if (!user?.active) {
        throw new UnauthorizedException('You have to activate accoun first');
      }
      return (
        roles.includes(user?.role) ||
        (user?.role === Role.ADMIN && canSuperAdmin)
      );
    }
  }
  return mixin(RoleGuardMixin);
};
