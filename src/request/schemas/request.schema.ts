import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Office, User } from '../../auth/schemas/index';

export type RequestDocument = HydratedDocument<Request>;

@Schema()
export class Request {
  @Prop({ required: true })
  requestType: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: 'Requested' })
  status: string;

  @Prop({ default: true })
  isActive: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ type: Office, required: true })
  address: Office;

  @Prop({ required: true })
  bsId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  requestedUserId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  servedUserId: User;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
