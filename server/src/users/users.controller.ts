import { Controller, Get, Post, Body } from '@nestjs/common';
import { UsersService } from './users.service';
import { RegisterUserDto } from './register-user.dto';
import { User } from './users.entity';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  register(@Body() registerUserDto: RegisterUserDto): Promise<User> {
    const newUser = new User(registerUserDto);
    return this.usersService.create(newUser);
  }
}
