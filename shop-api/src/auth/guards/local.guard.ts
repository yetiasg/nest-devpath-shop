import {
  HttpException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { UserEntity } from 'src/users/user.entity';
import { AuthService } from '../auth.service';

@Injectable()
export class LocalGuard extends AuthGuard('local') {
  constructor(private readonly authService: AuthService) {
    super();
  }

  async validate(
    email: string,
    password: string,
  ): Promise<UserEntity | HttpException> {
    const user = await this.authService.validateUser(email, password);
    if (!user) throw new UnauthorizedException();
    return user;
  }
}
