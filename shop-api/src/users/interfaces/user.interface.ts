import { Role } from 'src/role/role.type';

export interface UserProfileI {
  userId: string;
  role: Role;
  access_token?: string;
}
