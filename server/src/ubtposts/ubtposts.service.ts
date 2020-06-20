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
      where: {
        courseId: null
      },
      order: {
        date: 'DESC',
      },
      relations: ['author'],
    });
  }

  async findOne(ubtpostId: string) {
    return await this.ubtposts.findOne({ ubtpostId });
  }

  async create(ubtpost: Ubtpost) {
    return await this.ubtposts.insert({
      content: ubtpost.content,
      date: ubtpost.date,
      authorId: ubtpost.authorId,
      courseId: ubtpost.courseId
    });
  }

  async delete(id: string) {
    return await this.ubtposts.delete(id);
  }

  async update(ubtpostId: string, content: string) {
    return await this.ubtposts.update({ ubtpostId }, { content });
  }

  async getCoursePosts(courseId: string){
    return await this.ubtposts.find({ where: { courseId } })
  }
}
