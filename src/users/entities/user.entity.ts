import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
export type OrderDocument = HydratedDocument<User>;

@Schema({ timestamps: true })
export class User {
  @Prop({ required: true })
  userEmail: string;
  @Prop({
    required: true,
  })
  userPassword: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
