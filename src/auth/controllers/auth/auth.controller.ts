import { Body, Controller, Post } from '@nestjs/common';
import { RegisterUserDto } from 'src/auth/dtos/LoginUser.dto';

import { AuthService } from 'src/auth/services/auth/auth.service';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  // Post
  @Post('login')
  registerUser(@Body() registerUserDto: RegisterUserDto) {
    return this.authService.registerUser(registerUserDto);
  }
}
