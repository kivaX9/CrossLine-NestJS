import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';
import {
  LoginUserDto,
  RegisterUserDto,
} from 'src/modules/auth/dtos/LoginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private jwtService: JwtService,
  ) {}

  // Post
  async registerUser(registerUserDetails: RegisterUserDto) {
    const { username, password } = registerUserDetails;
    const newUser = this.userRepository.create({ username, password });

    const savedUser = await this.userRepository.save(newUser);

    const newProfile = this.profileRepository.create({ user: savedUser });
    await this.profileRepository.save(newProfile);

    return savedUser;
  }

  async loginUser(loginUserDetails: LoginUserDto) {
    const { username, password } = loginUserDetails;
    const user = await this.userRepository.findOneBy({ username });

    if (user.password !== password) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return { ...user, token };
  }
}
