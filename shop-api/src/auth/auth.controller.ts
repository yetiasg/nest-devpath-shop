import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { LocalGuard } from './guards/local.guard';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  @UseGuards(LocalGuard)
  async login(@Body() loginDto: LoginDto) {
    return loginDto;
  }

  @Post('register')
  async register(@Body() registerDto: CreateUserDto) {
    return registerDto;
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    return refreshToken;
  }
}
