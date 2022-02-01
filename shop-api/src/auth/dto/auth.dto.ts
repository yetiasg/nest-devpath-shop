import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}

export class RefreshDto {
  @IsString()
  @IsNotEmpty()
  readonly refreshToken: string;
}
