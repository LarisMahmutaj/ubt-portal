import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UbtpostsService } from './ubtposts.service';
import { UbtpostsController } from './ubtposts.controller';
import { Ubtpost, CoursePost } from './ubtposts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ubtpost])],
  controllers: [UbtpostsController],
  providers: [UbtpostsService],
  exports: [UbtpostsService],
})
export class UbtpostsModule {}
