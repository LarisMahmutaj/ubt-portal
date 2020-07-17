import { Injectable, ForbiddenException } from '@nestjs/common';
import {
  Course,
  Privacy,
  CourseUser,
  CoursePermission,
} from './courses.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CoursePost } from 'src/ubtposts/ubtposts.entity';
import { UsersService } from 'src/users/users.service';
import { InvitationsService } from './invitations.service';
import { Invitation } from './invitations.entity';

@Injectable()
export class CoursesService {
  constructor(
    @InjectRepository(Course) private courses: Repository<Course>,
    @InjectRepository(CourseUser) private courseUsers: Repository<CourseUser>,
    @InjectRepository(CoursePost) private coursePosts: Repository<CoursePost>,
    @InjectRepository(Invitation) private invitations: Repository<Invitation>,
    private readonly usersService: UsersService,
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

  async findUserCourses(userId: string) {
    return await this.courses.find({
      where: { ownerId: userId },
      order: { name: 'ASC' },
    });
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

  async createCourseUser(cu: CourseUser) {
    const courseUser = new CourseUser(cu);

    await this.courseUsers.insert(courseUser);
    return courseUser;
  }

  async searchUsers(text: string, courseId) {
    const users = await this.usersService.searchUsers(text);

    const courseUsers = await this.courseUsers.find({ where: { courseId } });
    const invites = await this.invitations.find();

    // This returns only the users that are not in the course and contain the text provided
    const filteredUsers = users.filter(
      (u) => !courseUsers.find((x) => x.userId === u.userId),
    );

    const finalUsers = filteredUsers.filter(
      (u) => !invites.find((x) => x.userEmail === u.email),
    );

    return finalUsers;
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
