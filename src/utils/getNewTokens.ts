import { Inject, Injectable } from '@nestjs/common';

import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

import { User } from 'src/typeorm/entities/User';

@Injectable()
export class NewTokens {
  constructor(
    @Inject(JwtService) private jwtService: JwtService,
    @Inject(ConfigService) private configService: ConfigService,
  ) {}

  async get(user: User) {
    const { id, username } = user;

    const payload = { sub: id, username };

    const accessToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('ACCESS_TOKEN_EXPIRES'),
    });
    const refreshToken = await this.jwtService.signAsync(payload, {
      expiresIn: this.configService.get<string>('REFRESH_TOKEN_EXPIRES'),
    });

    return { accessToken, refreshToken };
  }
}
