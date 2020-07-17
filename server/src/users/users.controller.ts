import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Redirect,
  UseGuards,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto, SearchUsersDto } from './users.dto';
import { User } from './users.entity';

import * as dotenv from 'dotenv';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
dotenv.config();

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @UseGuards(JwtAuthGuard)
  @Get('/search')
  async searchUsers(@Body() searchUsersDto: SearchUsersDto): Promise<User[]> {
    return await this.usersService.searchUsers(searchUsersDto.text);
  }

  @Post()
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    const newUser = new User(registerUserDto);
    return this.usersService.create(newUser);
  }

  @Get('confirmation/:token')
  @Redirect('http://localhost:8080/email-confirmed')
  confirmation(@Param('token') token) {
    this.usersService.confirmation(token);
  }
}
