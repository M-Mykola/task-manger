import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsEmail } from 'class-validator';

export class CreateUserDto {
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  @IsEmail()
  userEmail: string;
  @ApiProperty()
  @IsString()
  @IsNotEmpty()
  userPassword: string;
}
