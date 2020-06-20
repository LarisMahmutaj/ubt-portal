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

@UseGuards(JwtAuthGuard)
@Controller('ubtposts')
export class UbtpostsController {
  constructor(private readonly ubtpostsService: UbtpostsService) {}

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
    @Param('id') ubtpostId,
  ): Promise<Ubtpost> {
    const updatedPost = new Ubtpost(updateUbtpostDto);
    await this.ubtpostsService.update(ubtpostId, updatedPost.content);
    return {ubtpostId , ...updatedPost};
  }

  @Delete(':id')
  delete(@Param('id') id): Promise<DeleteResult> {
    return this.ubtpostsService.delete(id);
  }
}
