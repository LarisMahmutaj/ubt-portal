import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbtpostsService } from './ubtposts.service';
import { UbtpostsController } from './ubtposts.controller';
import { Ubtpost, CoursePost } from './ubtposts.entity';
import { UbtpostLike, CoursePostLike } from './likes/like.entity';
import { UbtpostLikesService } from './likes/ubtpostLikes.service';
import { CoursePostLikesService } from './likes/coursePostLikes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ubtpost, UbtpostLike, CoursePostLike])],
  controllers: [UbtpostsController],
  providers: [UbtpostsService, UbtpostLikesService, CoursePostLikesService],
  exports: [UbtpostsService, UbtpostLikesService, CoursePostLikesService],
})
export class UbtpostsModule {}
