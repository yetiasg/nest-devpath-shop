import {
  HttpException,
  Inject,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import bcrypt from 'bcrypt';
import { AuthConfig, AuthConfigType } from './auth.config';
import { UserEntity } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthConfig.KEY) private readonly authConfig: AuthConfigType,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login(loginDto: LoginDto) {
    return loginDto;
  }

  async refresh(refreshToken: string) {
    return {
      access_token: 'refreshToken',
      refreshToken: 'refreshToken',
      userId: '5',
      expiresIn: this.authConfig.sessionExpirationTime,
    };
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | HttpException> {
    const user = await this.usersService.findUser(email);
    const theSame = await this.comparePassword(password, user.password);
    if (!theSame) throw new UnauthorizedException();
    return user;
  }

  async signAccessToken(user: UserEntity): Promise<string> {
    const payload = { email: user.email, sub: user.id };
    const access_token = this.jwtService.signAsync(payload);
    return access_token;
  }

  async generateSalt(): Promise<string> {
    return new Promise<string>((resolve, reject) => {
      bcrypt.genSalt(12, (err, salt) => {
        if (err) reject(err);
        else resolve(salt);
      });
    });
  }

  async hashPassword(password: string): Promise<string> {
    const salt = await this.generateSalt();

    return new Promise((resolve, reject) => {
      bcrypt.hash(password, salt, (err, encrypted) => {
        if (err) reject(err);
        else resolve(encrypted);
      });
    });
  }

  async comparePassword(
    password: string,
    hashedPassword: string,
  ): Promise<string> {
    return new Promise((resolve, reject) => {
      bcrypt.compare(password, hashedPassword, (err, same) => {
        if (err) reject(err);
        else resolve(same);
      });
    });
  }
}
