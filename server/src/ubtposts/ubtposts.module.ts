import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbtpostsService } from './ubtposts.service';
import { UbtpostsController } from './ubtposts.controller';
import { Ubtpost } from './ubtposts.entity';
import { UbtpostLike, CoursePostLike } from './likes/like.entity';
import {
  UbtpostCommentsService,
  CoursePostCommentsService,
} from './comments/ubtpostComments.service';
import { UbtpostComment, CoursePostComment } from './comments/comment.entity';
import {
  UbtpostLikesService,
  CoursePostLikesService,
} from './likes/ubtpostLikes.service';
import { UsersModule } from '../users/users.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Ubtpost,
      UbtpostLike,
      CoursePostLike,
      UbtpostComment,
      CoursePostComment,
    ]),
    UsersModule,
  ],
  controllers: [UbtpostsController],
  providers: [
    UbtpostsService,
    UbtpostLikesService,
    CoursePostLikesService,
    UbtpostCommentsService,
    CoursePostCommentsService,
  ],
  exports: [CoursePostLikesService, CoursePostCommentsService],
})
export class UbtpostsModule {}
