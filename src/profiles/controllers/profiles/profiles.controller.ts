import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
} from '@nestjs/common';

import { UpdateProfileDto } from 'src/profiles/dtos/UpdateProfile';

import { ProfilesService } from 'src/profiles/services/profiles/profiles.service';

@Controller('profiles')
export class ProfilesController {
  constructor(private profileService: ProfilesService) {}

  // Get
  @Get('get/:id')
  getProfile(@Param('id', ParseIntPipe) id: number) {
    return this.profileService.getProfile(id);
  }

  // Put
  @Put('update/:id')
  async updateProfile(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateProfileDto: UpdateProfileDto,
  ) {
    await this.profileService.updateProfile(id, updateProfileDto);
  }

  // Delete
  @Delete('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.profileService.deleteUser(id);
  }
}
