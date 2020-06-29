import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Like } from './like.entity';
import { Repository } from 'typeorm';

@Injectable()
export class LikesService {
  constructor(@InjectRepository(Like) private likes: Repository<Like>) {}

  async findAll() {
    return await this.likes.find();
  }

  async getPostLikes(postId: string) {
    return await this.likes.find({ where: { postId } });
  }

  async getUserLikes(userId: string) {
    return await this.likes.find({ where: userId });
  }

  async findOne(userId: string, postId) {
    return await this.likes.findOne({
      where: { userId: userId, postId: postId },
    });
  }

  async create(like: Like) {
    return await this.likes.insert(like);
  }

  async delete(userId: string, postId) {
    return await this.likes.delete({ userId, postId });
  }
}
