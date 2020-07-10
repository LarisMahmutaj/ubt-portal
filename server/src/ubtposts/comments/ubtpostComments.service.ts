import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { UbtpostComment, CoursePostComment } from './comment.entity';

@Injectable()
export class UbtpostCommentsService {
  constructor(
    @InjectRepository(UbtpostComment)
    private ubtpostComments: Repository<UbtpostComment>,
  ) {}

  async findAll() {
    return await this.ubtpostComments.find();
  }

  async getPostComments(postId: string) {
    return await this.ubtpostComments.find({
      where: { postId },
      relations: ['user'],
      order: { date: 'ASC' },
    });
  }

  async getUserComments(userId: string) {
    return await this.ubtpostComments.find({ where: { userId } });
  }

  async findOneById(commentId: string) {
    return await this.ubtpostComments.findOne({ commentId });
  }

  async findOne(userId: string, postId: string) {
    return await this.ubtpostComments.findOne({
      where: { userId, postId },
      relations: ['user'],
    });
  }

  async create(comment: UbtpostComment) {
    await this.ubtpostComments.insert(comment);
  }

  async delete(commentId) {
    await this.ubtpostComments.delete({ commentId });
  }
}

@Injectable()
export class CoursePostCommentsService {
  constructor(
    @InjectRepository(CoursePostComment)
    private coursePostComments: Repository<CoursePostComment>,
  ) {}

  async findAll() {
    return await this.coursePostComments.find();
  }

  async getPostComments(postId: string) {
    return await this.coursePostComments.find({ where: { postId } });
  }

  async getUserComments(userId: string) {
    return await this.coursePostComments.find({ where: { userId } });
  }

  async findOne(commentId: string) {
    return await this.coursePostComments.findOne({ commentId });
  }

  async create(comment: UbtpostComment) {
    await this.coursePostComments.insert(comment);
  }

  async delete(commentId: string) {
    await this.coursePostComments.delete({ commentId });
  }
}
