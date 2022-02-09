import {
  BadRequestException,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { AuthConfig, AuthConfigType } from './auth.config';
import { UserEntity } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/user.dto';

@Injectable()
export class AuthService {
  constructor(
    @Inject(AuthConfig.KEY) private readonly authConfig: AuthConfigType,
    private readonly jwtService: JwtService,
    private readonly usersService: UsersService,
  ) {}

  async login({ email }: LoginDto) {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return;
    return await this.signAccessToken(user);
  }

  async register({ email, password }: CreateUserDto) {
    const hashedPassword: string = await this.hashPassword(password);
    console.log(hashedPassword);
    const newUser = this.usersService.createUser({
      email,
      password: hashedPassword,
    } as CreateUserDto);
    if (!newUser) throw new BadRequestException('User already exists');
    return newUser;
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
    const user = await this.usersService.getUserByEmail(email);
    console.log(user);
    if (!user) throw new NotFoundException();
    const theSame = await this.comparePassword(password, user.password);
    if (!theSame) throw new UnauthorizedException('err');
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
        console.log(salt);
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
