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
import { CoursePost } from 'src/ubtposts/ubtposts.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courses: Repository<Course>,
    @InjectRepository(CourseUser) private courseUsers: Repository<CourseUser>,
    @InjectRepository(CoursePost) private coursePosts: Repository<CoursePost>,
  ) {}

  async checkPermission(courseId: string, userId: string) {
    const courseUser = await this.courseUsers.findOne({ courseId, userId });
    const course = await this.findOneById(courseId);
    if (!courseUser) {
      if (course.privacy === Privacy.PUBLIC) {
        return await CoursePermission.READ;
      } else {
        throw new ForbiddenException({
          status: 403,
          error: 'You dont have permission to view this course',
        });
      }
    } else {
      return courseUser.coursePermission;
    }
  }

  async findPublicCourses() {
    return await this.courses.find({
      where: {
        privacy: Privacy.PUBLIC,
      },
      order: {
        name: 'ASC',
      },
      relations: ['owner'],
    });
  }

  async findJoinedCourses(userId) {
    const courseUsers = await this.courseUsers.find({
      where: {
        userId,
      },
      relations: ['course'],
    });
    const courses = [];
    courseUsers.forEach((courseUser) => {
      courses.push(courseUser.course);
    });

    return courses;
  }

  async findOneById(courseId: string) {
    return await this.courses.findOne(
      { courseId: courseId },
      { relations: ['owner'] },
    );
  }

  async create(course: Course) {
    const result = await this.courses.insert({
      name: course.name,
      description: course.description,
      date: course.date,
      ownerId: course.ownerId,
      privacy: course.privacy,
    });

    course.courseId = result.identifiers[0].courseId;
    return course;
  }

  async delete(courseId: string) {
    await this.courses.delete(courseId);
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

  async createCourseUser(courseUser: CourseUser) {
    var courseUser = new CourseUser(courseUser);

    await this.courseUsers.insert(courseUser);
    return courseUser;
  }

  //Course Posts
  async getCoursePosts(courseId: string) {
    return await this.coursePosts.find({
      where: { courseId },
      relations: ['author'],
      order: {
        date: 'DESC',
      },
    });
  }

  async findOneCoursePost(postId: string) {
    return await this.coursePosts.findOne({ postId });
  }

  async createCoursePost(coursePost: CoursePost) {
    return await this.coursePosts.insert(coursePost);
  }

  async updateCoursePost(postId: string, coursePost: CoursePost) {
    return await this.coursePosts.update(
      { postId },
      { content: coursePost.content },
    );
  }

  async deleteCoursePost(postId: string) {
    await this.coursePosts.delete({ postId });
  }
}
