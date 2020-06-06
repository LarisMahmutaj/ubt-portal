import { Controller, Get, Post, Body, Param, Redirect } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './register-user.dto';
import { User } from './users.entity';

import * as dotenv from 'dotenv';
dotenv.config();

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

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
