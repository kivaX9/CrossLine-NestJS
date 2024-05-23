import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Profile } from 'src/typeorm/entities/Profile'
import { User } from 'src/typeorm/entities/User'

import { CreateUserParams, UpdateUserParams } from 'src/utils/types'

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private userRepository: Repository<User>,
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  // Get
  getUsers() {
    return this.userRepository.find()
  }

  async getUserById(id: number) {
    return await this.userRepository.findOneBy({ id })
  }

  // Post
  async creatUser(createUserDetails: CreateUserParams) {
    const newUser = this.userRepository.create({ ...createUserDetails })

    const savedUser = await this.userRepository.save(newUser)

    const newProfile = this.profileRepository.create({ user: savedUser })
    await this.profileRepository.save(newProfile)

    return savedUser
  }

  // Put
  updateUser(id: number, updateUserDetails: UpdateUserParams) {
    return this.userRepository.update({ id }, { ...updateUserDetails })
  }

  // Delete
  deleteUser(id: number) {
    this.profileRepository.delete({ user: { id } })

    return this.userRepository.delete({ id })
  }
}
