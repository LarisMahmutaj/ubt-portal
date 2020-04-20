import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/interfaces/user.interface';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOne(email);
    if (user) {
      const validPass = await bcrypt.compare(pass, user.password);

      if (validPass) {
        //Next line didn't return a user object
        // const { password, ...result } = user;

        return {
          _id: user._id,
          email: user.email,
          username: user.username,
          date: user.date,
        };
      }
      return null;
    }
    return null;
  }

  async login(user: any) {
    const payload = { email: user.email, sub: user._id };

    return {
      access_token: this.jwtService.sign(payload),
      _id: user._id,
      email: user.email,
      username: user.username
    };
  }
}
