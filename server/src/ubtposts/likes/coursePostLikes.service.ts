import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursePostLike } from './like.entity';

@Injectable()
export class CoursePostLikesService {
  constructor(
    @InjectRepository(CoursePostLike)
    private coursePostLikes: Repository<CoursePostLike>,
  ) {}

  async findAll() {
    return await this.coursePostLikes.find();
  }

  async getPostLikes(postId: string) {
    return await this.coursePostLikes.find({ where: { postId } });
  }

  async getUserLikes(userId: string) {
    return await this.coursePostLikes.find({ where: { userId } });
  }

  async findOne(userId: string, postId: string) {
    return await this.coursePostLikes.findOne({ where: { userId, postId } });
  }

  async create(like: CoursePostLike) {
    await this.coursePostLikes.insert(like);
  }

  async delete(userId: string, postId: string) {
    await this.coursePostLikes.delete({ userId, postId });
  }
}
