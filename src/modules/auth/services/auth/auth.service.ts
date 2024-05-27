import * as bcrypt from 'bcrypt';

import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

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
    @Inject(ConfigService) private configService: ConfigService,
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

    const returnUser = {
      ...savedUser,
      password: undefined,
    };
    return returnUser;
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
    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: '15m',
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: '7d',
    });

    const returnUser = {
      ...user,
      password: undefined,
      accessToken,
      refreshToken,
    };
    return returnUser;
  }

  async refresh(refreshToken: string) {
    const payload = await this.jwtService.verifyAsync(refreshToken, {
      secret: this.configService.get<string>('JWT_SECRET'),
    });
    const user = await this.userRepository.findOneBy({ id: payload.sub });

    if (!user || !refreshToken) {
      throw new UnauthorizedException();
    }

    const newPayload = { sub: user.id, username: user.username };
    const newAccessToken = await this.jwtService.signAsync(newPayload, {
      expiresIn: '15m',
    });

    return { accessToken: newAccessToken };
  }
}
