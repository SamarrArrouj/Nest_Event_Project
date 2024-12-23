import { IsOptional, IsString, IsEmail, MinLength, IsEnum } from 'class-validator';
import { UserRole } from 'src/typeorm/entities/User';

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  username?: string;

  @IsOptional()
  @IsEmail()
  email?: string;

  @IsOptional()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  password?: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;
}
