import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Put,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from 'src/guards/auth.guards';

import { UsersService } from 'src/users/services/users/users.service';

import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto';

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // Get
  @UseGuards(AuthGuard)
  @Get('all')
  getUsers() {
    return this.userService.getUsers();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id);
  }

  // Put
  @UseGuards(AuthGuard)
  @Put('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto);
  }

  // Delete
  @UseGuards(AuthGuard)
  @Delete('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id);
  }
}
