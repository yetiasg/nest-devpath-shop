import { ConfigType, registerAs } from '@nestjs/config';

export const AuthConfig = registerAs('auth', () => ({
  secret: process.env.JWT_SECRET ?? 'eloelosecretelo123',
  sessionExpirationTime: parseInt(process.env.SESSION_EXPIRATION_TIME) || 3600,
}));

export type AuthConfigType = ConfigType<typeof AuthConfig>;
