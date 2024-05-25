import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';

import { LoginUserParams, RegisterUserParams } from 'src/utils/types';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    private jwtService: JwtService,
  ) {}

  // Post
  async registerUser(registerUserDetails: RegisterUserParams) {
    const newUser = this.userRepository.create({ ...registerUserDetails });

    const savedUser = await this.userRepository.save(newUser);

    const newProfile = this.profileRepository.create({ user: savedUser });
    await this.profileRepository.save(newProfile);

    return savedUser;
  }

  async loginUser(loginUserDetails: LoginUserParams) {
    const { username, password } = loginUserDetails;
    const user = await this.userRepository.findOneBy({ username });
    if (user.password !== password) {
      throw new UnauthorizedException();
    }
    const payload = { sub: user.id, username: user.username };
    user.token = await this.jwtService.signAsync(payload);
    return user;
  }
}
