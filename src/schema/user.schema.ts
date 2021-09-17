import { Prop, Schema as NestSchema, SchemaFactory } from '@nestjs/mongoose';
import { Schema } from 'mongoose';

export type UserDocument = User & Document;

@NestSchema()
export class User {
  @Prop()
  id: Schema.Types.ObjectId;

  @Prop({ required: true, unique: true })
  username: string;
}

export const UserSchema = SchemaFactory.createForClass(User);
