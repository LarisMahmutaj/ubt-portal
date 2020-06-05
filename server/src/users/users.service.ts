import { Injectable, BadRequestException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from './users.entity';
import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { InjectRepository } from '@nestjs/typeorm';
import * as nodemailer from 'nodemailer';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private users: Repository<User>,
    private jwtService: JwtService,
  ) {}

  async findOne(email: string): Promise<User> {
    return await this.users.findOne({ email: email });
  }

  async findOneWithPassword(email: string): Promise<User> {
    const user = await this.users
      .createQueryBuilder('user')
      .select('user.userId')
      .addSelect('user.fullname')
      .addSelect('user.email')
      .addSelect('user.date')
      .addSelect('user.password')
      .where('user.email = :e', { e: email })
      .getOne();

    return user;
  }

  async findById(id: string) {
    return this.users.findOne({ userId: id });
  }

  async create(user: User): Promise<User> {
    const transporter = nodemailer.createTransport({
      host: 'smtp.gmail.com',
      port: 587,
      secure: false,
      requireTLS: true,
      auth: {
        user: process.env.GMAIL_USER,
        pass: process.env.GMAIL_PASS,
      },
    });

    const exists = await this.users.findOne({
      email: user.email.toLowerCase(),
    });
    if (exists) {
      throw new BadRequestException('Email already Exists');
    }

    user.password = await bcrypt.hash(user.password, 10);

    try {
      await this.users.save(user);

      const payload = { userId: user.userId };
      const token = this.jwtService.sign(payload);

      const url = `http://localhost:3000/users/confirmation/${token}`;

      transporter.sendMail({
        to: user.email,
        subject: 'Confirm Email',
        html: `Please click <a href="${url}">here</a> to confirm email`,
      });

      return user;
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async confirmation(token: string) {
    try {
      const { userId } = this.jwtService.verify(token);
      await this.users.update({ userId }, { active: true });
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
