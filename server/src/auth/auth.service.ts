import {
  Injectable,
  BadRequestException,
  UnauthorizedException,
  HttpException,
} from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { User } from '../users/users.entity';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class AuthService {
  constructor(
    private readonly usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(email: string, pass: string): Promise<any> {
    const user = await this.usersService.findOneWithPassword(email);
    if (user) {
      const validPass = await bcrypt.compare(pass, user.password);
      if (validPass) {
        //Next line didn't return a user object
        // const { password, ...result } = user;

        return {
          userId: user.userId,
          email: user.email,
          fullname: user.fullname,
          date: user.date,
        };
      }
      return null;
    }
    return null;
  }

  async login(user: User) {
    const payload = { email: user.email, sub: user.userId };

    const u = await this.usersService.findById(user.userId);

    if (u.active === false) {
      throw new HttpException(
        {
          status: 401,
          message: 'Please confirm your email to login',
        },
        401,
      );
    } else {
      return {
        access_token: this.jwtService.sign(payload),
        userId: user.userId,
        email: user.email,
        fullname: user.fullname,
      };
    }
  }
}
