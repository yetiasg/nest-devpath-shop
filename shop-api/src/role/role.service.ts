import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from 'src/users/user.entity';
import { Repository } from 'typeorm';
import { Role } from './role.type';

@Injectable()
export class RoleService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async changeUserRole(userId: string, role: Role) {
    console.log(role, 'aaaa');
    if (role in Role) {
      const updatedUser = await this.userRepository.update(
        { id: userId },
        { role },
      );
      if (!updatedUser) return;
      return updatedUser;
    }
    return new BadRequestException('Can not chang role for this user');
  }
}
