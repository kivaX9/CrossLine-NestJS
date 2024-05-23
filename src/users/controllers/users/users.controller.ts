import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  ParseIntPipe,
  Post,
  Put,
} from '@nestjs/common'

import { UsersService } from 'src/users/services/users/users.service'

import { CreateUserDto } from 'src/users/dtos/CreateUser.dto'
import { UpdateUserDto } from 'src/users/dtos/UpdateUser.dto'

@Controller('users')
export class UsersController {
  constructor(private userService: UsersService) {}

  // Get
  @Get('all')
  getUsers() {
    return this.userService.getUsers()
  }

  @Get(':id')
  getUserById(@Param('id', ParseIntPipe) id: number) {
    return this.userService.getUserById(id)
  }

  // Post
  @Post('create')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.creatUser(createUserDto)
  }

  // Put
  @Put('update/:id')
  async updateUser(
    @Param('id', ParseIntPipe) id: number,
    @Body() updateUserDto: UpdateUserDto,
  ) {
    await this.userService.updateUser(id, updateUserDto)
  }

  // Delete
  @Delete('delete/:id')
  async deleteUser(@Param('id', ParseIntPipe) id: number) {
    await this.userService.deleteUser(id)
  }
}