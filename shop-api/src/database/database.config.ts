import { registerAs } from '@nestjs/config';

export const DatabaseConfig = registerAs('database', () => ({
  host: process.env.TYPEORM_HOST ?? 'localhost',
  database: process.env.TYPEORM_DATABASE ?? 'postgres',
  username: process.env.TYPEORM_USERNAME ?? 'postgres',
  password: process.env.TYPEORM_PASSWORD ?? 'postgres',
  port: Number(process.env.TYPEORM_PORT ?? 5433),
}));
