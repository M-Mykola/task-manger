import { Controller, Post, Body } from '@nestjs/common';
import { AuthService } from './auth.service';
import { CreateUserDto } from './dto/create-user.dto';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('User Service')
@Controller()
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signUp')
  signUp(@Body() createUserDto: CreateUserDto) {
    return this.authService.createUser(createUserDto);
  }

  @Post('signIn')
  logIn(
    @Body() createUserDto: CreateUserDto,
  ): Promise<{ accessToken: string }> {
    return this.authService.logIn(createUserDto);
  }
}
