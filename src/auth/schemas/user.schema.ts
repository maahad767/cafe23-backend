import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Office } from '.';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop({ unique: true })
  bsId: string;

  @Prop({ unique: true })
  email: string;

  @Prop()
  hash: string;

  @Prop()
  phone: string;

  @Prop()
  name: string;

  @Prop({ enum: ['EMPLOYEE', 'SUPPORT'] })
  role: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'Owner', required: false })
  office: Office;
}

export const UserSchema = SchemaFactory.createForClass(User);