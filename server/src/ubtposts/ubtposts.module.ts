import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbtpostsService } from './ubtposts.service';
import { UbtpostsController } from './ubtposts.controller';
import { Ubtpost, CoursePost } from './ubtposts.entity';
import { Like } from './like.entity';
import { LikesService } from './likes.service';

@Module({
  imports: [TypeOrmModule.forFeature([Ubtpost, Like])],
  controllers: [UbtpostsController],
  providers: [UbtpostsService, LikesService],
  exports: [UbtpostsService],
})
export class UbtpostsModule {}
