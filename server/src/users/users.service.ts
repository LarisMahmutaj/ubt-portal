import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class UsersService {
  constructor(@InjectRepository(User) private users: Repository<User>) {}

  async findOne(email: string): Promise<User> {
    return this.users.findOne({ email: email });
  }

  async findById(id: string): Promise<User> {
    return this.users.findOne({ userId: id });
  }

  async create(user: User): Promise<User> {
    const exists = await this.users.findOne({
      email: user.email.toLowerCase(),
    });
    if (exists) {
      throw new BadRequestException('Email already Exists');
    }

    user.password = await bcrypt.hash(user.password, 10);

    try {
      return await this.users.save(user);
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
