import { Body, Controller, Post } from '@nestjs/common';

import { RegisterUserDto } from '../../dtos/RegisterUser.dto';
import { LoginUserDto } from '../../dtos/LoginUser.dto';

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
