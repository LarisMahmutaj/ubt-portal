import { UbtpostsService } from './ubtposts.service';
import { Module } from '@nestjs/common';
import { UbtpostsController } from './ubtposts.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Ubtpost } from './ubtposts.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Ubtpost])],
  controllers: [UbtpostsController],
  providers: [UbtpostsService],
})
export class UbtpostsModule {}
