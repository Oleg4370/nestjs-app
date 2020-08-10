import { Model } from 'mongoose';
import { Injectable, Optional } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Log } from './logs.schema';
import { CreateLogDTO } from './logs.dto';

@Injectable()
export class LogsService {
  constructor(
    @InjectModel('Logs') private logModel: Model<Log>,
    @Optional() private label: string
  ) {}

  setLabel(label: string): void {
    this.label = label;
  }

  error(message): Promise<Log> {
    return this.create({
      level: 'error',
      label: this.label,
      message
    });
  }

  info(message): Promise<Log> {
    return this.create({
      level: 'info',
      label: this.label,
      message
    });
  }

  warn(message): Promise<Log> {
    return this.create({
      level: 'warning',
      label: this.label,
      message
    });
  }

  async create(logDto: CreateLogDTO): Promise<Log> {
    const createdLog = new this.logModel(logDto);
    return createdLog.save();
  }

  async findAll(): Promise<Log[]> {
    return this.logModel.find().exec();
  }
}
