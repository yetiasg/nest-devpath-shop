import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { UpdateUserDto } from './dto/user.dto';
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

  @Patch(':id')
  async updateUser(@Param('id') id: string, @Body() user: UpdateUserDto) {
    return await this.usersService.updateUser(id, user);
  }

  @Post('invite')
  async inviteUser(@Body('email') email: string) {
    return await this.usersService.inviteUserByEmail(email);
  }

  @Delete(':id')
  async removeUserById(@Param('id') id: string) {
    return await this.usersService.removeUserById(id);
  }
}
