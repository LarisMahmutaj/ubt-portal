import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  UseGuards,
} from '@nestjs/common';
import { UbtpostsService } from './ubtposts.service';
import { CreateUbtpostDto } from './ubtpost.dto';
import { Ubtpost } from './ubtposts.entity';
import { JwtAuthGuard } from '../auth/jwt-auth.guard';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';

@Controller('ubtposts')
export class UbtpostsController {
  constructor(private readonly ubtpostsService: UbtpostsService) {}

  @Get()
  findAll(): Promise<Ubtpost[]> {
    return this.ubtpostsService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id): Promise<Ubtpost> {
    return this.ubtpostsService.findOne(id);
  }

  @Post()
  create(@Body() createUbtpostDto: CreateUbtpostDto): Promise<InsertResult> {
    const newPost = new Ubtpost(createUbtpostDto);
    const { authorId } = createUbtpostDto;

    newPost.authorId = authorId;
    return this.ubtpostsService.create(newPost);
  }

  @Put(':id')
  update(
    @Body() updateUbtpostDto: CreateUbtpostDto,
    @Param('id') id,
  ): Promise<UpdateResult> {
    const updatedPost = new Ubtpost(updateUbtpostDto);
    return this.ubtpostsService.update(id, updatedPost.content);
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<DeleteResult> {
    return this.ubtpostsService.delete(id);
  }
}
