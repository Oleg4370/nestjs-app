import { Model } from 'mongoose';
import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './logs.schema';
import { CreateLogDTO } from './logs.dto';

@Injectable()
export class LogsService {
  constructor(@InjectModel('Logs') private logModel: Model<Log>) {}

  async create(logDto: CreateLogDTO): Promise<Log> {
    const createdLog = new this.logModel(logDto);
    return createdLog.save();
  }

  async findAll(): Promise<Log[]> {
    return this.logModel.find().exec();
  }
}
