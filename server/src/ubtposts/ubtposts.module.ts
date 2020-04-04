import { UbtpostsService } from './ubtposts.service';
import { Ubtpost } from './interfaces/ubtpost.interface';
import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { UbtpostsController } from './ubtposts.controller';
import { UbtpostSchema } from './schemas/ubtpost.schema';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'Ubtpost', schema: UbtpostSchema }]),
  ],
  controllers: [UbtpostsController],
  providers: [UbtpostsService],
})
export class UbtpostsModule {}
