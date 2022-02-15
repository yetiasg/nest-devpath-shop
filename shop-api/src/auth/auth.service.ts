import {
  BadRequestException,
  forwardRef,
  HttpException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dto/auth.dto';
import * as bcrypt from 'bcrypt';
import { UserEntity } from 'src/users/user.entity';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { CreateUserDto } from 'src/users/dto/user.dto';
import { UserProfileI } from 'src/users/interfaces/user.interface';

@Injectable()
export class AuthService {
  constructor(
    private readonly jwtService: JwtService,
    @Inject(forwardRef(() => UsersService))
    private readonly usersService: UsersService,
  ) {}

  async login({ email }: LoginDto): Promise<UserProfileI> {
    const user = await this.usersService.getUserByEmail(email);
    if (!user) return;
    const profile = await this.usersService.getUserProfile(user.id);
    const token = await this.signAccessToken(user);
    profile.access_token = token;
    return profile;
  }

  async register({ email, password }: CreateUserDto) {
    const user = await this.usersService.getUserByEmail(email);
    if (user) throw new BadRequestException('User already exists');
    const hashedPassword: string = await this.hashPassword(password);
    const newUser = this.usersService.createUser({
      email,
      password: hashedPassword,
    } as CreateUserDto);
    if (!newUser) throw new BadRequestException();
    return await this.login({ email } as LoginDto);
  }

  async validateUser(
    email: string,
    password: string,
  ): Promise<UserEntity | HttpException> {
    const user = await this.usersService.getUserByEmail(email);
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
