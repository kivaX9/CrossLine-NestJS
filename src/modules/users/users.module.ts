import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { JwtService } from '@nestjs/jwt';

import { UsersController } from './controllers/users/users.controller';
import { UsersService } from './services/users/users.service';

import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';

@Module({
  imports: [TypeOrmModule.forFeature([User, Profile])],
  controllers: [UsersController],
  providers: [UsersService, JwtService],
})
export class UsersModule {}
