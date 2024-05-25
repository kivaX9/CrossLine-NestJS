import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Profile } from 'src/typeorm/entities/Profile';
import { User } from 'src/typeorm/entities/User';

import { UpdateUserDto } from 'src/modules/users/dtos/UpdateUser.dto';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  // Get
  getUsers() {
    return this.userRepository.find();
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id });
  }

  // Put
  updateUser(id: number, updateUserDetails: UpdateUserDto) {
    const { username, password } = updateUserDetails;
    return this.userRepository.update({ id }, { username, password });
  }

  // Delete
  deleteUser(id: number) {
    this.profileRepository.delete({ user: { id } });

    return this.userRepository.delete({ id });
  }
}
