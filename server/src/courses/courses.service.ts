import { Injectable } from '@nestjs/common';
import { Course, Privacy } from './courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';

@Injectable()
export class CoursesService {
  constructor(@InjectRepository(Course) private courses: Repository<Course>) {}

  async findAll(): Promise<Course[]> {
    return await this.courses.find({
      order: {
        name: 'ASC',
      },
      relations: ['owner'],
    });
  }

  async findOneById(courseId: string): Promise<Course> {
    return await this.courses.findOne({ courseId });
  }

  async create(course: Course): Promise<InsertResult> {
    return await this.courses.insert({
      name: course.name,
      description: course.description,
      date: course.date,
      ownerId: course.ownerId,
      privacy: course.privacy,
    });
  }

  async delete(id: string) {
    return await this.courses.delete(id);
  }

  async update(courseId: string, course: Course) {
    return await this.courses.update(
      { courseId },
      {
        description: course.description,
        name: course.name,
        privacy: course.privacy,
      },
    );
  }
}
