import { Injectable, ForbiddenException } from '@nestjs/common';
import {
  Course,
  Privacy,
  CourseUser,
  CoursePermission,
} from './courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, InsertResult, UpdateResult } from 'typeorm';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courses: Repository<Course>,
    @InjectRepository(CourseUser) private courseUsers: Repository<CourseUser>,
  ) {}

  async findAll() {
    return await this.courses.find({
      order: {
        name: 'ASC',
      },
      relations: ['owner'],
    });
  }

  async findOneById(courseId: string) {
    return await this.courses.findOne(
      { courseId: courseId },
      { relations: ['owner'] },
    );
  }

  async create(course: Course) {
    await this.courses.insert({
      name: course.name,
      description: course.description,
      date: course.date,
      ownerId: course.ownerId,
      privacy: course.privacy,
    });
  }

  async delete(id: string) {
    await this.courses.delete(id);
  }

  async update(courseId: string, course: Course) {
    await this.courses.update(
      { courseId },
      {
        description: course.description,
        name: course.name,
        privacy: course.privacy,
      },
    );
  }

  async createCourseUser(courseId: string, userId: string) {
    var courseUser = new CourseUser({
      courseId: courseId,
      userId: userId,
      coursePermission: CoursePermission.WRITE,
      role: 'Member',
    });

    await this.courseUsers.insert(courseUser);
    return courseUser;
  }

  async checkPermission(courseId: string, userId: string) {
    const courseUser = await this.courseUsers.findOne({ courseId, userId });
    if (!courseUser) {
      throw new ForbiddenException();
    } else {
      return courseUser.coursePermission;
    }
  }
}
