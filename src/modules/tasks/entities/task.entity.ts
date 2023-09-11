import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { TaskStatus } from './enum.values';

@Schema({ timestamps: true })
export class Task {
  @Prop({ required: true })
  taskName: string;
  @Prop({ required: true })
  taskDescription: string;
  @Prop({ enum: TaskStatus })

  taskState:TaskStatus
}

export const TaskSchema = SchemaFactory.createForClass(Task);
