import { Inject, Injectable } from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import bcrypt from 'bcrypt';
import { AuthConfig, AuthConfigType } from './auth.config';
import { UserEntity } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthConfig.KEY) private readonly authConfig: AuthConfigType,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    return loginDto;
  }

  async refresh(refreshToken: string) {
    return refreshToken;
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
