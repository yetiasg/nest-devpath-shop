import { Injectable } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { LoginDto, RefreshDto } from './dto/auth.dto';

@Injectable()
export class AuthService {
  async login(loginDto: LoginDto) {
    return loginDto;
  }

  async register(registerDto: CreateUserDto) {
    return registerDto;
  }

  async refresh(refreshDto: RefreshDto) {
    return refreshDto;
  }
}
