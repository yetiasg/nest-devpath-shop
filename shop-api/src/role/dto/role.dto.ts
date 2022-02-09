import { IsNotEmpty, IsString } from 'class-validator';
import { Role } from '../role.type';

export class ChangeRoleDto {
  @IsString()
  @IsNotEmpty()
  userId: string;

  @IsString()
  @IsNotEmpty()
  role: Role;
}
