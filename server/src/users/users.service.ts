import { Injectable, BadRequestException } from '@nestjs/common';
import { User } from './interfaces/user.interface';
import { Model } from 'mongoose';
import * as bcrypt from 'bcryptjs';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UsersService {
  constructor(@InjectModel('User') private readonly userModel: Model<User>) {}

  async findOne(email: string): Promise<User> {
    return this.userModel.findOne({ email: email });
  }

  async findById(id: string): Promise<User> {
    return this.userModel.findOne({ _id: id });
  }

  async register(user: User): Promise<User> {
    const newUser = new this.userModel(user);

    const exists = await this.userModel.findOne({
      email: user.email.toLowerCase(),
    });
    if (exists) {
      throw new BadRequestException('Email already Exists');
    }

    newUser.password = await bcrypt.hash(newUser.password, 10);

    try {
      return await newUser.save();
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
