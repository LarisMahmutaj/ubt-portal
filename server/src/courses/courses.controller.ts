import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { CoursesService } from './courses.service'
import { Course } from './courses.entity'
import { CreateCourseDto } from './courses.dto';
import { UpdateResult, DeleteResult, InsertResult } from 'typeorm';

@Controller('courses')
export class CoursesController {
  constructor(private readonly coursesService: CoursesService){}

  @Get()
  findAll(): Promise<Course[]> {
    return this.coursesService.findAll()
  }

  @Get(':id')
  findOneById(@Param('id') id): Promise<Course>{
    return this.coursesService.findOneById(id);
  }

  @Post()
  create(@Body() createCourseDto: CreateCourseDto): Promise<InsertResult>{
    const newCourse = new Course(createCourseDto);
    const { ownerId } = createCourseDto;
    newCourse.ownerId = ownerId;

    return this.coursesService.create(newCourse);
  }

  @Put(':id')
  update(@Body() updateCourseDto: CreateCourseDto, @Param('id') id): Promise<UpdateResult>{
    const updatedCourse = new Course(updateCourseDto);
    return this.coursesService.update(id, updatedCourse)
  }

  @Delete('id')
  delete(@Param('id') id): Promise<DeleteResult> {
    return this.coursesService.delete(id);
  }
}

