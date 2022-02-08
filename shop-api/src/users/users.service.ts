import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/user.dto';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async findUser(email: string): Promise<UserEntity> {
    return this.userRepository.findOne({ email });
  }

  async createUser(userDto: CreateUserDto) {
    return userDto;
  }
}
