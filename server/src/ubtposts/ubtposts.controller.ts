import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
} from '@nestjs/common';
import { UbtpostsService } from './ubtposts.service';
import { CreateUbtpostDto } from './dto/create-ubtpost.dto';
import { Ubtpost } from './interfaces/ubtpost.interface';

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
  create(@Body() createUbtpostDto: CreateUbtpostDto): Promise<Ubtpost> {
    return this.ubtpostsService.create(createUbtpostDto);
  }
  @Put(':id')
  update(
    @Body() updateUbtpostDto: CreateUbtpostDto,
    @Param('id') id,
  ): Promise<Ubtpost> {
    return this.ubtpostsService.update(id, updateUbtpostDto);
  }
  @Delete(':id')
  delete(@Param('id') id): Promise<Ubtpost> {
    return this.ubtpostsService.delete(id);
  }
}
