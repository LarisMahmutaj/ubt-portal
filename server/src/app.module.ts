import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
// import { MongooseModule } from '@nestjs/mongoose';

import { UbtpostsModule } from './ubtposts/ubtposts.module';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { CoursesModule } from './courses/courses.module';

import * as dotenv from 'dotenv';

dotenv.config();

@Module({
  imports: [
    UbtpostsModule,
    
    // MongooseModule.forRoot(process.env.MONGO_URI, {
    //   useFindAndModify: false,
    //   useUnifiedTopology: true,
    //   useNewUrlParser: true,
    // }),
    UsersModule,
    AuthModule,
    CoursesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
