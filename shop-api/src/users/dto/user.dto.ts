import {
  IsBoolean,
  IsEmail,
  IsNotEmpty,
  IsOptional,
  IsString,
} from 'class-validator';
import { Match } from 'src/util/match.decorator';

export class UpdateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly email?: string;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly firstName?: string;

  @IsNotEmpty()
  @IsBoolean()
  @IsOptional()
  readonly active?: boolean;

  @IsNotEmpty()
  @IsString()
  @IsOptional()
  readonly lastName?: string;
}

export class CreateUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;

  @IsString()
  @IsNotEmpty()
  @Match('password')
  readonly passwordConfirmation: string;
}

export class UpdatePasswordDto {
  @IsString()
  @IsNotEmpty()
  @IsOptional()
  readonly password?: string;

  @IsString()
  @IsNotEmpty()
  @IsOptional()
  @Match('password')
  readonly passwordConfirmation?: string;
}

export class InviteUserDto {
  @IsEmail()
  @IsNotEmpty()
  @IsString()
  readonly email: string;

  @IsString()
  @IsNotEmpty()
  readonly password: string;
}
