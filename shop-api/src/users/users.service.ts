import {
  BadRequestException,
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { MailService } from 'src/mail/mail.service';
import { Repository } from 'typeorm';
import { CreateUserDto, InviteUserDto, UpdateUserDto } from './dto/user.dto';
import { UserProfileI } from './interfaces/user.interface';
import { UserEntity } from './user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
    private readonly mailService: MailService,
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

  async getUserProfile(userId: string): Promise<UserProfileI> {
    const user = await this.getUserById(userId);
    if (!user) throw new NotFoundException();
    const profile: UserProfileI = {
      userId: user.id,
      role: user.role,
    };
    return profile;
  }

  async createUser({ email, password }: CreateUserDto | InviteUserDto) {
    const user = await this.getUserByEmail(email);
    if (user) throw new BadRequestException();

    const newUser = await (
      await this.userRepository.insert({ email, password })
    ).raw;
    if (!newUser) throw new InternalServerErrorException();
    this.mailService.sendMail(email);
    return newUser;
  }

  async inviteUserByEmail(email: string) {
    const userExists = await this.getUserByEmail(email);
    if (userExists) throw new BadRequestException('User already exists');

    const user = { email, password: await this.genPassword() };
    const newUser = await this.createUser(user);
    if (!newUser) throw new InternalServerErrorException();
    this.mailService.sendMail(email);
    return newUser.raw;
  }

  async updateUser(id: string, user: UpdateUserDto) {
    if (!(await this.getUserById(id))) throw new NotFoundException();
    const updatedUser = await (await this.userRepository.update(id, user)).raw;
    if (!updatedUser) return;
    return updatedUser;
  }

  async removeUserById(id: string) {
    return await this.userRepository.delete(id);
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
