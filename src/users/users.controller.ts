import {
  Controller,
  Post,
  Body,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Service')
@Controller()
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.usersService.signUp(createUserDto);
  }

  @Post('logIn')
  logIn(@Body() createUserDto: CreateUserDto) {
    return this.usersService.logIn(createUserDto);
  }



}
