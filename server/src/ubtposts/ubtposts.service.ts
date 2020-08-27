import { Injectable } from '@nestjs/common';
import { Ubtpost } from './ubtposts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';

@Injectable()
export class UbtpostsService {
  constructor(
    @InjectRepository(Ubtpost) private ubtposts: Repository<Ubtpost>,
  ) {}

  async findAll() {
    return await this.ubtposts.find({
      order: {
        date: 'DESC',
      },
      relations: ['author'],
    });
  }

  async findOne(postId: string) {
    return await this.ubtposts.findOne(postId);
  }

  async create(ubtpost: Ubtpost) {
    return await this.ubtposts.insert({
      content: ubtpost.content,
      date: ubtpost.date,
      authorId: ubtpost.authorId,
    });
  }

  async delete(id: string) {
    return await this.ubtposts.delete(id);
  }

  async update(postId: string, content: string) {
    return await this.ubtposts.update({ postId }, { content });
  }
}
