import { IsString, IsEmail, IsNotEmpty, MinLength, IsEnum } from 'class-validator';
import { UserRole } from 'src/typeorm/entities/User';

export class CreateUserDto {
  
  @IsString()
  @IsNotEmpty()
  username: string;

  @IsEmail()
  @IsNotEmpty()
  email: string;

  @IsString()
  @MinLength(6, { message: 'Password must be at least 6 characters long' })
  @IsNotEmpty()
  password: string;

  @IsEnum(UserRole)
  role: UserRole = UserRole.USER;
}
