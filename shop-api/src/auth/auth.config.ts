import { ConfigType, registerAs } from '@nestjs/config';

export const AuthConfig = registerAs('auth', () => ({
  secret: process.env.JWT_SECRET ?? 'secret99',
}));

export type AuthConfigType = ConfigType<typeof AuthConfig>;
