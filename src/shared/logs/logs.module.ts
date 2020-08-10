import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { LogsService } from './logs.service';
import { LogsSchema } from './logs.schema';

@Module({
  imports: [MongooseModule.forFeature([{ name: 'Logs', schema: LogsSchema }])],
  providers: [LogsService],
  exports: [LogsService]
})
export class LogsModule {}
