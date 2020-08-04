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
import { Course, CourseUser, CoursePermission, Role } from './courses.entity';
import {
  CreateCourseDto,
  CreateCoursePostDto,
  CreateCourseUserDto,
} from './courses.dto';
import { Ubtpost, CoursePost } from 'src/ubtposts/ubtposts.entity';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { CoursePostLike } from 'src/ubtposts/likes/like.entity';
import { CoursePostLikesService } from 'src/ubtposts/likes/ubtpostLikes.service';
import { CoursePostComment } from 'src/ubtposts/comments/comment.entity';
import { CoursePostCommentsService } from 'src/ubtposts/comments/ubtpostComments.service';
import { CommentDto } from 'src/ubtposts/ubtpost.dto';
import { UsersService } from 'src/users/users.service';
import { InvitationsService } from './invitations.service';
import { Invitation } from './invitations.entity';
import { CreateInvitationDto } from './invitations.dto';
import { SearchUsersDto } from 'src/users/users.dto';
import { User } from 'src/users/users.entity';

@UseGuards(JwtAuthGuard)
@Controller('courses')
export class CoursesController {
  constructor(
    private readonly coursesService: CoursesService,
    private readonly likesService: CoursePostLikesService,
    private readonly commentsService: CoursePostCommentsService,
    private readonly usersService: UsersService,
    private readonly invitationsService: InvitationsService,
  ) {}

  @Get()
  async getPublicCourses(): Promise<Course[]> {
    return await this.coursesService.findPublicCourses();
  }

  @Get('/joined')
  async getJoinedCourses(@Request() req): Promise<Course[]> {
    return await this.coursesService.findJoinedCourses(req.user.sub);
  }

  @Get('/my')
  async getUserCourses(@Request() req): Promise<Course[]> {
    return await this.coursesService.findUserCourses(req.user.sub);
  }

  @Get(':courseId')
  async findCourseById(@Param('courseId') courseId): Promise<Course> {
    return await this.coursesService.findOneById(courseId);
  }

  @Post()
  async createCourse(
    @Body() createCourseDto: CreateCourseDto,
    @Request() req,
  ): Promise<Course> {
    const newCourse = new Course(createCourseDto);
    newCourse.ownerId = req.user.sub;

    const createdCourse = await this.coursesService.create(newCourse);
    const courseUser = new CourseUser({
      courseId: createdCourse.courseId,
      userId: req.user.sub,
      coursePermission: CoursePermission.WRITE,
      role: Role.OWNER,
    });
    await this.coursesService.createCourseUser(courseUser);
    return createdCourse;
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

  //Likes
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
      return await this.likesService.getPostLikes(postId);
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
      const exists = await this.likesService.findOne(req.user.sub, postId);
      if (!exists) {
        const like = new CoursePostLike();
        like.postId = postId;
        like.userId = req.user.sub;

        await this.likesService.create(like);
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
      const exists = await this.likesService.findOne(req.user.sub, postId);
      if (exists) {
        await this.likesService.delete(req.user.sub, postId);
        return exists;
      } else {
        throw new NotFoundException();
      }
    }
  }

  //Comments

  @Get(':courseId/posts/:postId/comments')
  async getPostComments(
    @Param('courseId') courseId,
    @Param('postId') postId,
    @Request() req,
  ): Promise<CoursePostComment[]> {
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );
    if (
      permission === CoursePermission.READ ||
      permission === CoursePermission.WRITE
    ) {
      const comments = await this.commentsService.getPostComments(postId);
      console.error(comments);
      return comments;
    } else {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to view posts in this course',
      });
    }
  }

  @Get(':courseId/posts/:postId/comments/count')
  async getPostCommentCount(
    @Param('courseId') courseId,
    @Param('postId') postId,
    @Request() req,
  ): Promise<number> {
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );
    if (
      permission === CoursePermission.READ ||
      permission === CoursePermission.WRITE
    ) {
      return await this.commentsService.getPostCommentCount(postId);
    } else {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to view posts in this course',
      });
    }
  }

  @Post(':courseId/posts/:postId/comments')
  async createPostComment(
    @Param('courseId') courseId,
    @Param('postId') postId,
    @Request() req,
    @Body() createCommentDto: CommentDto,
  ): Promise<CoursePostComment> {
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );

    if (
      permission === CoursePermission.READ ||
      permission === CoursePermission.WRITE
    ) {
      const comment = new CoursePostComment(createCommentDto);
      comment.postId = postId;
      comment.userId = req.user.sub;

      await this.commentsService.create(comment);
      comment.user = await this.usersService.findById(req.user.sub);
      return comment;
    } else {
      throw new ForbiddenException({
        status: 403,
        error: "You dont have 'Write' permission in this course",
      });
    }
  }

  @Delete(':courseId/comments/:commentId')
  async deletePostComment(
    @Param('courseId') courseId,
    @Param('commentId') commentId,
    @Request() req,
  ) {
    const permission = await this.coursesService.checkPermission(
      courseId,
      req.user.sub,
    );

    if (
      permission === CoursePermission.READ ||
      permission === CoursePermission.WRITE
    ) {
      const comment = await this.commentsService.findOne(commentId);
      if (comment) {
        if (comment.userId === req.user.sub) {
          await this.commentsService.delete(commentId);
          return comment;
        } else {
          throw new ForbiddenException({
            status: 403,
            error: 'You dont have permission to delete this comment',
          });
        }
      } else {
        throw new NotFoundException();
      }
    } else {
      throw new ForbiddenException({
        status: 403,
        error: "You dont have 'Write' permission in this course",
      });
    }
  }

  // Invitations
  @Post(':courseId/join')
  async joinCourse(
    @Param('courseId') courseId: string,
    @Request() req,
    @Body() createCourseUserDto: CreateCourseUserDto,
  ): Promise<CourseUser> {
    const courseUser = new CourseUser(createCourseUserDto);
    return await this.coursesService.createCourseUser(courseUser);
  }

  @Post(':courseId/invitations')
  async createInvite(
    @Param('courseId') courseId: string,
    @Request() req,
    @Body() createInvitationDto: CreateInvitationDto,
  ): Promise<Invitation> {
    const course = await this.coursesService.findOneById(courseId);
    if (req.user.sub != course.ownerId) {
      throw new ForbiddenException({
        status: 403,
        message: 'You dont have permission to send invitations in this course',
      });
    } else {
      const invitation = new Invitation(createInvitationDto);
      invitation.courseId = courseId;
      await this.invitationsService.create(invitation);
      return await this.invitationsService.findOne(
        invitation.userEmail,
        courseId,
      );
    }
  }

  @Post(':courseId/search-users')
  async searchUsers(
    @Param('courseId') courseId: string,
    @Request() req,
    @Body() searchUsersDto: SearchUsersDto,
  ): Promise<User[]> {
    const course = await this.coursesService.findOneById(courseId);
    if (req.user.sub != course.ownerId) {
      throw new ForbiddenException({
        status: 403,
        message: 'You dont have permission to send invitations in this course',
      });
    } else {
      return await this.coursesService.searchUsers(
        searchUsersDto.text,
        courseId,
      );
    }
  }
}
