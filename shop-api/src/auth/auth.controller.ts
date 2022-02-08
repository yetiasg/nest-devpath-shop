import { Body, Controller, Post, UseGuards } from '@nestjs/common';
import { Public } from 'src/common/decorators/public.decorator';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UsersService } from 'src/users/users.service';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/auth.dto';
import { LocalGuard } from './guards/local.guard';

@Controller({ path: 'auth', version: '1' })
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly usersService: UsersService,
  ) {}

  @Post('login')
  @Public()
  @UseGuards(LocalGuard)
  async login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return await this.authService.login(loginDto);
  }

  @Post('register')
  @Public()
  async register(@Body() userDto: CreateUserDto) {
    console.log(userDto);
    return await this.usersService.createUser(userDto);
  }

  @Post('refresh')
  async refresh(@Body('refresh_token') refreshToken: string) {
    console.log(refreshToken);
    return await this.authService.refresh(refreshToken);
  }
}
