import { Injectable, Inject } from '@nestjs/common';
import { ConfigType } from '@nestjs/config';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy, StrategyOptions } from 'passport-jwt';
import { UsersService } from 'src/users/users.service';
import { AuthConfig } from '../auth.config';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor(
    @Inject(AuthConfig.KEY) authConfig: ConfigType<typeof AuthConfig>,
    private readonly userService: UsersService,
  ) {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      ignoreExpiration: false,
      secretOrKey: authConfig.secret,
    } as StrategyOptions);
  }

  async validate(payload: any): Promise<any> {
    console.log({ payload });
    // const { sub: id, email } = payload;
    // return { id, email };
    // return this.userService.findUserByEmail(payload.email);
    return { id: '123', email: 'test@test.com' };
  }
}
