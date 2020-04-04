import { Injectable } from '@nestjs/common';
import { Ubtpost } from './interfaces/ubtpost.interface';
import { Model } from 'mongoose';
import { InjectModel } from '@nestjs/mongoose';

@Injectable()
export class UbtpostsService {
  constructor(
    @InjectModel('Ubtpost') private readonly ubtpostModel: Model<Ubtpost>,
  ) {}

  async findAll(): Promise<Ubtpost[]> {
    return await this.ubtpostModel.find();
  }

  async findOne(id: string): Promise<Ubtpost> {
    return await this.ubtpostModel.findOne({ _id: id });
  }

  async create(ubtpost: Ubtpost): Promise<Ubtpost> {
    const newUbtpost = new this.ubtpostModel(ubtpost);
    return await newUbtpost.save();
  }

  async delete(id: string): Promise<Ubtpost> {
    return await this.ubtpostModel.findByIdAndRemove(id);
  }

  async update(id: string, ubtpost: Ubtpost): Promise<Ubtpost> {
    return await this.ubtpostModel.findByIdAndUpdate(id, ubtpost, {
      new: true,
    });
  }
}
