import {
  IsString,
  MaxLength,
  MinLength,
  IsStrongPassword,
  IsEmail,
  IsEnum,
} from 'class-validator';
import { Role } from '@prisma/client';

export class CreateUserDto {
  @IsString()
  @MinLength(2, { message: 'First name must be at least 2 characters long.' })
  @MaxLength(20, {
    message: 'First name must be less than 20 characters long.',
  })
  fistName: string;

  @IsString()
  @MinLength(2, { message: 'Last name must be at least 2 characters long.' })
  @MaxLength(20, { message: 'Last name must be less than 20 characters long.' })
  lastName: string;

  @IsEmail()
  email: string;

  @IsStrongPassword()
  password: string;

  @IsEnum(Role, {
    message: `Role must be from  ${Object.keys(Role).join(',')}`,
  })
  role: Role;
}
