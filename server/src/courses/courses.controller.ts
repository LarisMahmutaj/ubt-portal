import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Patch,
  Request,
  ForbiddenException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course, CourseUser, CoursePermission } from './courses.entity';
import { CreateCourseDto } from './courses.dto';
import { UbtpostsService } from 'src/ubtposts/ubtposts.service';
import { Ubtpost } from 'src/ubtposts/ubtposts.entity';
import { JwtService } from '@nestjs/jwt';

@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly ubtpostsService: UbtpostsService,
    private readonly jwtService: JwtService,
  ) {}

  @Get()
  async findAllCourses(): Promise<Course[]> {
    return await this.coursesService.findAll();
  }

  @Get(':courseId')
  async findCourseById(@Param('courseId') courseId): Promise<Course> {
    return await this.coursesService.findOneById(courseId);
  }

  @Post()
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
  ): Promise<Course> {
    const newCourse = new Course(createCourseDto);
    const { ownerId } = createCourseDto;
    newCourse.ownerId = ownerId;

    await this.coursesService.create(newCourse);
    return newCourse;
  }

  @Patch(':courseId')
  async updateCourse(
    @Body() updateCourseDto: CreateCourseDto,
    @Param('courseId') courseId,
  ): Promise<Course> {
    const updatedCourse = new Course(updateCourseDto);
    await this.coursesService.update(courseId, updatedCourse);
    return { courseId, ...updatedCourse };
  }

  @Delete(':courseId')
  async deleteCourse(@Param('courseId') courseId): Promise<Course> {
    await this.coursesService.delete(courseId);
    return { ...courseId };
  }

  @Post(':courseId/ubtposts')
  async getCoursePosts(
    @Param('courseId') courseId,
    @Body() req,
  ): Promise<Ubtpost[]> {
    try {
      const user = this.jwtService.verify(req.token);
      const permission = await this.coursesService.checkPermission(
        courseId,
        user.userId,
      );
      if (
        permission === CoursePermission.READ ||
        permission === CoursePermission.WRITE
      ) {
        return await this.ubtpostsService.getCoursePosts(courseId);
      } else {
        throw new ForbiddenException();
      }
    } catch (error) {
      throw new ForbiddenException();
    }
  }

  @Post(':courseId/join')
  async joinCourse(
    @Param('courseId') courseId: string,
    @Body() req,
  ): Promise<CourseUser> {
    const user = this.jwtService.verify(req.token);
    return await this.coursesService.createCourseUser(courseId, user.userId);
  }
}
