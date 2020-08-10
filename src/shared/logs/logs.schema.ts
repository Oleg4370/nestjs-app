import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

@Schema()
export class Log extends Document {
  @Prop()
  level: string;

  @Prop()
  label: string;

  @Prop()
  message: string;
}

export const LogsSchema = SchemaFactory.createForClass(Log);
