import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto, UpdateUserDto } from './dto/user.dto';
import { UserProfileI } from './interfaces/user.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async getUserProfile(userId: string): Promise<UserProfileI> {
    const user = await this.getUserById(userId);
    const profile: UserProfileI = {
      userId: user.id,
      role: user.role,
    };
    return profile;
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ id });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ email });
  }

  async createUser({ email, password }: CreateUserDto) {
    const user = await this.getUserByEmail(email);
    if (user) throw new BadRequestException();
    return await this.userRepository.insert({ email, password });
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const updatedUser = await this.userRepository.update(id, user);
    if (!updatedUser) return;
    return updatedUser;
  }
}
