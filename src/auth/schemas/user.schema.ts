import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type UserDocument = HydratedDocument<User>;

@Schema()
export class User {
  @Prop()
  bsid: string;

  @Prop()
  email: string;

  @Prop()
  hash: string;

  @Prop()
  phone: string;

  @Prop()
  name: string;
}

export const CatSchema = SchemaFactory.createForClass(User);
