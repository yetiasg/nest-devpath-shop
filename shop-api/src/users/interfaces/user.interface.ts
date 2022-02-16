import { Role } from 'src/role/role.type';

export interface UserProfileI {
  userId: string;
  role: Role;
  active: boolean;
  access_token?: string;
  firstName?: string;
  lastName?: string;
  email?: string;
}
