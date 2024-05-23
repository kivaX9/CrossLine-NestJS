import { Module } from '@nestjs/common'
import { TypeOrmModule } from '@nestjs/typeorm'

import { ProfilesController } from './controllers/profiles/profiles.controller'
import { ProfilesService } from './services/profiles/profiles.service'

import { Profile } from 'src/typeorm/entities/Profile'

@Module({
  imports: [TypeOrmModule.forFeature([Profile])],
  controllers: [ProfilesController],
  providers: [ProfilesService],
})
export class ProfilesModule {}
