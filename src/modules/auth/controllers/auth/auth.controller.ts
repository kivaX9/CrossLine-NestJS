import { Body, Controller, Post } from '@nestjs/common';

import {
  LoginUserDto,
  RegisterUserDto,
} from 'src/modules/auth/dtos/LoginUser.dto';

import { AuthService } from 'src/modules/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Post
  @Post('register')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }

  @Post('login')
  loginUser(@Body() loginrUserDto: LoginUserDto) {
    return this.authService.loginUser(loginrUserDto);
  }
}
