import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { CurrentUserId } from 'src/common/decorators/currentUserId.decorator';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UserProfileI } from 'src/users/interfaces/user.interface';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { JwtAuthGuard } from './guards/jwt';
import { LocalAuthGuard } from './guards/local.guard';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalAuthGuard)
  async login(@Body() loginDto: LoginDto): Promise<UserProfileI> {
    return await this.authService.login(loginDto);
  }

  @Post('register')
  @Public()
  async register(@Body() userDto: CreateUserDto) {
    return await this.authService.register(userDto);
  }

  @Get('profile')
  @UseGuards(JwtAuthGuard)
  async getUserProfile(@CurrentUserId() userId: string) {
    return await this.usersService.getUserProfile(userId);
  }
}
