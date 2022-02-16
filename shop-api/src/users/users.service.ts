import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { AuthService } from 'src/auth/auth.service';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import {
  CreateUserDto,
  InviteUserDto,
  UpdatePasswordDto,
  UpdateUserDto,
} from './dto/user.dto';
import { UserProfileI } from './interfaces/user.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
    private readonly authService: AuthService,
  ) {}

  async getAllUsers() {
    return await this.userRepository.find();
  }

  async getUserById(id: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ id });
  }

  async getUserByEmail(email: string): Promise<UserEntity> {
    return await this.userRepository.findOne({ email });
  }

  async getUserByActivationToken(token: string) {
    return await this.userRepository.findOne({ activationToken: token });
  }

  async getUserByResetPasswordToken(token: string) {
    return await this.userRepository.findOne({ resetPasswordToken: token });
  }

  async getUserProfile(userId: string): Promise<UserProfileI> {
    const user = await this.getUserById(userId);
    if (!user) throw new NotFoundException();
    const profile: UserProfileI = {
      userId: user.id,
      role: user.role,
      active: user.active,
      firstName: user.firstName,
      lastName: user.lastName,
      email: user.email,
    };
    return profile;
  }

  async createUser({ email, password }: CreateUserDto | InviteUserDto) {
    const user = await this.getUserByEmail(email);
    if (user) throw new BadRequestException();

    const activationToken = await this.generateActivationToken();

    const newUser = await (
      await this.userRepository.insert({
        email,
        password,
        activationToken,
      })
    ).raw;
    if (!newUser) throw new InternalServerErrorException();
    this.mailService.newAccountMail(email, activationToken);
    return newUser;
  }

  async activateAccount(token: string) {
    const user = await this.getUserByActivationToken(token);
    if (!user) throw new NotFoundException();

    (user.activationToken = ''), (user.active = true);
    await user.save();
    return await this.getUserProfile(user.id);
  }

  async inviteUserByEmail(email: string) {
    const userExists = await this.getUserByEmail(email);
    if (userExists) throw new BadRequestException('User already exists');

    const user = { email, password: await this.genPassword() };
    const newUser = await this.createUser(user);
    if (!newUser) throw new InternalServerErrorException();
    await this.resetPassword(newUser.id);
    return true;
  }

  async updateUser(id: string, user: UpdateUserDto) {
    const existingUser = await this.getUserById(id);
    if (!existingUser) throw new NotFoundException();
    console.log(user, existingUser);
    const updatedUser = await (await this.userRepository.update(id, user)).raw;
    console.log(updatedUser);
    if (!updatedUser) return 'aaa';
    return updatedUser;
  }

  async removeUserById(id: string) {
    return await this.userRepository.delete(id);
  }

  async forgotPasswordByEmail(email: string) {
    const user = await this.getUserByEmail(email);
    if (!user) throw new NotFoundException();
    return await this.resetPassword(user.id);
  }

  async resetPassword(userId: string) {
    const user = await this.getUserById(userId);
    if (!user) return;
    user.resetPasswordToken = await this.generateActivationToken();
    const updatedUser = await user.save();
    if (!updatedUser) throw new InternalServerErrorException();
    this.mailService.setNewPasswordPasswordMail(
      updatedUser.email,
      updatedUser.resetPasswordToken,
    );
    return true;
  }

  async handleResettingPassword(token: string, passwordDto: UpdatePasswordDto) {
    const user = await this.getUserByResetPasswordToken(token);
    if (!user) throw new NotFoundException();
    const hashedPassword: string = await this.authService.hashPassword(
      passwordDto.password,
    );
    user.password = hashedPassword;
    user.resetPasswordToken = '';
    await user.save();
    return await this.getUserProfile(user.id);
  }

  async generateActivationToken() {
    return await this.genPassword();
  }

  async genPassword(): Promise<string> {
    const { randomBytes } = await import('crypto');
    return new Promise<string>((resolve, reject) => {
      randomBytes(16, (err, data) => {
        if (err) reject(err);
        else resolve(data.toString('hex'));
      });
    });
  }
}
