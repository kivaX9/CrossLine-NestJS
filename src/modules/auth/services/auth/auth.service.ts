import * as bcrypt from 'bcrypt';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';

import { RegisterUserDto } from '../../dtos/RegisterUser.dto';
import { LoginUserDto } from '../../dtos/LoginUser.dto';

@Injectable()
export class AuthService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
    @Inject(JwtService) private jwtService: JwtService,
  ) {}

  // Post
  async registerUser(registerUserDetails: RegisterUserDto) {
    const { username, password } = registerUserDetails;

    const saltOrRounds = 10;
    const hash = await bcrypt.hash(password, saltOrRounds);

    const newUser = this.userRepository.create({ username, password: hash });

    const savedUser = await this.userRepository.save(newUser);

    const newProfile = this.profileRepository.create({ user: savedUser });
    await this.profileRepository.save(newProfile);

    return savedUser;
  }

  async loginUser(loginUserDetails: LoginUserDto) {
    const { username, password } = loginUserDetails;
    const user = await this.userRepository.findOneBy({ username });

    const { password: hash } = user;
    const isMatch = await bcrypt.compare(password, hash);

    if (!isMatch) {
      throw new UnauthorizedException();
    }

    const payload = { sub: user.id, username: user.username };
    const token = await this.jwtService.signAsync(payload);

    return { ...user, token };
  }
}
