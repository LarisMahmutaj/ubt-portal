import {
  Controller,
  Get,
  Post,
  Delete,
  Param,
  Body,
  Patch,
  Request,
  ForbiddenException,
  UseGuards,
  BadRequestException,
  NotFoundException,
} from '@nestjs/common';
import { CoursesService } from './courses.service';
import { Course, CourseUser, CoursePermission } from './courses.entity';
import { CreateCourseDto, CreateCoursePostDto } from './courses.dto';
import { Ubtpost, CoursePost } from 'src/ubtposts/ubtposts.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UbtpostLike, CoursePostLike } from 'src/ubtposts/likes/like.entity';
import { UbtpostLikesService } from 'src/ubtposts/likes/ubtpostLikes.service';
import { CoursePostLikesService } from 'src/ubtposts/likes/coursePostLikes.service';

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly ubtpostLikesService: UbtpostLikesService,
    private readonly coursePostLikesService: CoursePostLikesService,
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

  @Post(':courseId/join')
  async joinCourse(
    @Param('courseId') courseId: string,
    @Request() req,
  ): Promise<CourseUser> {
    return await this.coursesService.createCourseUser(courseId, req.user.sub);
  }

  // CoursePosts
  @Get(':courseId/posts')
  async getCoursePosts(
    @Param('courseId') courseId,
    @Request() req,
  ): Promise<Ubtpost[]> {
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );
    if (
      permission === CoursePermission.READ ||
      permission === CoursePermission.WRITE
    ) {
      return await this.coursesService.getCoursePosts(courseId);
    } else {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to view posts in this course',
      });
    }
  }

  @Post(':courseId/posts')
  async createCoursePost(
    @Param('courseId') courseId,
    @Request() req,
    @Body() createCoursePostDto: CreateCoursePostDto,
  ): Promise<CoursePost> {
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );

    if (permission === CoursePermission.WRITE) {
      const coursePost = new CoursePost(createCoursePostDto);
      coursePost.courseId = courseId;
      coursePost.authorId = req.user.sub;
      await this.coursesService.createCoursePost(coursePost);
      return await coursePost;
    } else {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to post in this course',
      });
    }
  }

  @Patch(':courseId/posts/:postId')
  async updateCoursePost(
    @Param('courseId') courseId,
    @Param('postId') postId,
    @Request() req,
    @Body() updateCoursePostDto: CreateCoursePostDto,
  ): Promise<CoursePost> {
    if (req.user.sub !== updateCoursePostDto.authorId) {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to edit this post',
      });
    }
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );
    if (permission === CoursePermission.WRITE) {
      const editedPost = new CoursePost(updateCoursePostDto);
      await this.coursesService.updateCoursePost(postId, editedPost);
      return editedPost;
    } else {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to write in this course',
      });
    }
  }

  @Delete(':courseId/posts/:postId')
  async deleteCoursePost(
    @Param('courseId') courseId,
    @Param('postId') postId,
    @Request() req,
  ): Promise<CoursePost> {
    const post = await this.coursesService.findOneCoursePost(postId);
    if (req.user.sub !== post.authorId) {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to edit this post',
      });
    }
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );

    if (permission === CoursePermission.WRITE) {
      await this.coursesService.deleteCoursePost(postId);
      return post;
    } else {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to write in this course',
      });
    }
  }

  @Get(':courseId/posts/:postId/likes')
  async getPostLikes(
    @Param('courseId') courseId,
    @Param('postId') postId,
    @Request() req,
  ): Promise<CoursePostLike[]> {
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );
    if (
      permission === CoursePermission.READ ||
      permission === CoursePermission.WRITE
    ) {
      return await this.coursePostLikesService.getPostLikes(postId);
    } else {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to view posts in this course',
      });
    }
  }

  @Post(':courseId/posts/:postId/likes')
  async createPostLike(
    @Param('courseId') courseId,
    @Param('postId') postId,
    @Request() req,
  ): Promise<CoursePostLike> {
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );

    if (
      permission === CoursePermission.READ ||
      permission === CoursePermission.WRITE
    ) {
      const exists = await this.coursePostLikesService.findOne(
        req.user.sub,
        postId,
      );
      if (!exists) {
        const like = new CoursePostLike();
        like.postId = postId;
        like.userId = req.user.sub;

        await this.coursePostLikesService.create(like);
        return like;
      } else {
        throw new BadRequestException({
          status: 400,
          error: 'You have already liked this post',
        });
      }
    } else {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to view posts in this course',
      });
    }
  }

  @Delete(':courseId/posts/:postId/likes')
  async removePostLike(
    @Param('courseId') courseId,
    @Param('postId') postId,
    @Request() req,
  ): Promise<CoursePostLike> {
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );

    if (
      permission === CoursePermission.READ ||
      permission === CoursePermission.WRITE
    ) {
      const exists = await this.coursePostLikesService.findOne(
        req.user.sub,
        postId,
      );
      if (exists) {
        await this.coursePostLikesService.delete(req.user.sub, postId);
        return exists;
      } else {
        throw new NotFoundException();
      }
    }
  }
}
