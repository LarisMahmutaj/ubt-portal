import { Injectable } from '@nestjs/common';
import { Ubtpost } from './ubtposts.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UbtpostsService {
  constructor(
    @InjectRepository(Ubtpost) private ubtposts: Repository<Ubtpost>,
  ) {}

  async findAll(): Promise<Ubtpost[]> {
    return await this.ubtposts.find({
      order: {
        date: 'DESC',
      },
    });
  }

  async findOne(id: string): Promise<Ubtpost> {
    return await this.ubtposts.findOne({ ubtpostId: id });
  }

  async create(ubtpost: Ubtpost) {
    return await this.ubtposts.insert(ubtpost);
  }

  async delete(id: string) {
    return await this.ubtposts.delete(id);
  }

  async update(ubtpostId: string, content: string) {
    return await this.ubtposts.update({ ubtpostId }, { content });
  }
}
