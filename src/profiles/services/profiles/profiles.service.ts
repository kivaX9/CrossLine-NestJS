import { Repository } from 'typeorm'
import { Injectable } from '@nestjs/common'
import { InjectRepository } from '@nestjs/typeorm'

import { Profile } from 'src/typeorm/entities/Profile'

import { UpdateProfileParams } from 'src/utils/types'

@Injectable()
export class ProfilesService {
  constructor(
    @InjectRepository(Profile) private profileRepository: Repository<Profile>,
  ) {}

  // Get
  async getProfile(id: number) {
    return await this.profileRepository.findOne({
      where: { user: { id } },
      relations: { user: true },
    })
  }

  // Put
  updateProfile(id: number, updateProfileDetails: UpdateProfileParams) {
    return this.profileRepository.update(
      { user: { id } },
      { ...updateProfileDetails },
    )
  }

  // Delete
  deleteUser(id: number) {
    return this.profileRepository.delete({ id })
  }
}
