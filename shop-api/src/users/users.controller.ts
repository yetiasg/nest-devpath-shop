import { Body, Controller, Delete, Get, Param, Post } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller({ path: 'users', version: '1' })
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  async getAllUsers() {
    return await this.usersService.getAllUsers();
  }

  @Get(':id')
  async getUserById(@Param('id') id: string) {
    return await this.usersService.getUserById(id);
  }

  @Delete(':id')
  async removeUserById(@Param('id') id: string) {
    return await this.usersService.removeUserById(id);
  }

  @Post('invite')
  async inviteUser(@Body('email') email: string) {
    return await this.usersService.inviteUserByEmail(email);
  }
}
