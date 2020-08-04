import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
  Request,
  BadRequestException,
  ForbiddenException,
} from '@nestjs/common';
import { UbtpostsService } from './ubtposts.service';
import { CreateUbtpostDto, CommentDto } from './ubtpost.dto';
import { Ubtpost } from './ubtposts.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { DeleteResult } from 'typeorm';
import { UbtpostLike } from './likes/like.entity';
import { UbtpostLikesService } from './likes/ubtpostLikes.service';
import { UbtpostComment } from './comments/comment.entity';
import { UbtpostCommentsService } from './comments/ubtpostComments.service';
import { UsersService } from 'src/users/users.service';

@UseGuards(JwtAuthGuard)
@Controller('ubtposts')
export class UbtpostsController {
  constructor(
    private readonly ubtpostsService: UbtpostsService,
    private readonly likesService: UbtpostLikesService,
    private readonly commentsService: UbtpostCommentsService,
    private readonly usersService: UsersService,
  ) {}

  @Get()
  async findAll(): Promise<Ubtpost[]> {
    return await this.ubtpostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Ubtpost> {
    return this.ubtpostsService.findOne(id);
  }

  @Post()
  async create(@Body() createUbtpostDto: CreateUbtpostDto): Promise<Ubtpost> {
    const newPost = new Ubtpost(createUbtpostDto);
    const { authorId } = createUbtpostDto;

    newPost.authorId = authorId;
    await this.ubtpostsService.create(newPost);

    return newPost;
  }

  @Put(':id')
  async update(
    @Body() updateUbtpostDto: CreateUbtpostDto,
    @Param('id') postId,
  ): Promise<Ubtpost> {
    const updatedPost = new Ubtpost(updateUbtpostDto);
    await this.ubtpostsService.update(postId, updatedPost.content);
    return { postId, ...updatedPost };
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<DeleteResult> {
    return this.ubtpostsService.delete(id);
  }

  //Likes
  @Get(':id/likes')
  async getPostLikes(@Param('id') postId: string): Promise<UbtpostLike[]> {
    return await this.likesService.getPostLikes(postId);
  }

  @Post(':id/likes')
  async createPostLike(
    @Param('id') postId,
    @Request() req,
  ): Promise<UbtpostLike> {
    const exists = await this.likesService.findOne(req.user.sub, postId);
    if (!exists) {
      const like = new UbtpostLike();
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
  }

  @Delete(':id/likes')
  async removePostLike(
    @Param('id') postId,
    @Request() req,
  ): Promise<UbtpostLike> {
    const exists = await this.likesService.findOne(req.user.sub, postId);
    if (exists) {
      await this.likesService.delete(req.user.sub, postId);
      return exists;
    }
  }

  //Comments
  @Get(':id/comments')
  async getPostComments(@Param('id') postId): Promise<UbtpostComment[]> {
    return await this.commentsService.getPostComments(postId);
  }

  @Get(':id/comments/count')
  async getPostCommentCount(@Param('id') postId): Promise<number> {
    return await this.commentsService.getPostCommentCount(postId);
  }

  @Post(':id/comments')
  async createPostComment(
    @Param('id') postId,
    @Request() req,
    @Body() commentDto: CommentDto,
  ): Promise<UbtpostComment> {
    const comment = new UbtpostComment(commentDto);
    comment.postId = postId;
    comment.userId = req.user.sub;

    await this.commentsService.create(comment);
    comment.user = await this.usersService.findById(req.user.sub);
    return comment;
  }

  @Delete('comments/:commentId')
  async deletePostComment(
    @Param('commentId') commentId,
    @Request() req,
  ): Promise<UbtpostComment> {
    const comment = await this.commentsService.findOneById(commentId);
    if (comment.userId !== req.user.sub) {
      throw new ForbiddenException({
        status: 403,
        error: 'You dont have permission to delete this comment',
      });
    } else {
      await this.commentsService.delete(commentId);
      return comment;
    }
  }
}
