import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/user.dto';

@Injectable()
export class UsersService {
  async createUser(userDto: CreateUserDto) {
    return userDto;
  }
}
