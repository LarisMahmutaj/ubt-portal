import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UbtpostLike, CoursePostLike } from './like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UbtpostLikesService {
  constructor(
    @InjectRepository(UbtpostLike)
    private ubtpostLikes: Repository<UbtpostLike>,
  ) {}

  async findAll() {
    return await this.ubtpostLikes.find();
  }

  async getPostLikes(postId: string) {
    return await this.ubtpostLikes.find({ where: { postId } });
  }

  async getUserLikes(userId: string) {
    return await this.ubtpostLikes.find({ where: userId });
  }

  async findOne(userId: string, postId) {
    return await this.ubtpostLikes.findOne({
      where: { userId: userId, postId: postId },
    });
  }

  async create(like: UbtpostLike) {
    await this.ubtpostLikes.insert(like);
  }

  async delete(userId: string, postId) {
    await this.ubtpostLikes.delete({ userId, postId });
  }
}
