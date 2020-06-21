import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CoursesService } from './courses.service';
import { CoursesController } from './courses.controller';
import { Course, CourseUser } from './courses.entity';
import { UbtpostsModule } from 'src/ubtposts/ubtposts.module';
import { JwtModule } from '@nestjs/jwt';

import * as dotenv from 'dotenv';
import { CoursePost } from 'src/ubtposts/ubtposts.entity';
dotenv.config();
@Module({
  imports: [
    TypeOrmModule.forFeature([Course, CourseUser, CoursePost]),
    UbtpostsModule,
    JwtModule.register({ secret: process.env.SECRET }),
  ],
  controllers: [CoursesController],
  providers: [CoursesService],
})
export class CoursesModule {}
