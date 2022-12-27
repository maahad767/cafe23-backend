import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { User } from '../../auth/schemas/index';

export type RequestDocument = HydratedDocument<Request>;

@Schema()
export class Address {
  @Prop({ required: true })
  branch: string;

  @Prop({ required: true })
  floor: string;

  @Prop({ required: true })
  room: string;
}

@Schema()
export class Request {
  @Prop({ required: true })
  requestType: string;

  @Prop({ required: true })
  quantity: number;

  @Prop({ default: 'Requested' })
  status: string;

  @Prop({ default: false })
  isActive: boolean;

  @Prop({ default: Date.now() })
  createdAt: Date;

  @Prop({ type: Address, required: true })
  address: Address;

  @Prop({ required: true })
  bsId: string;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true })
  requestedUserId: User;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User', default: null })
  servedUserId: User;
}

export const RequestSchema = SchemaFactory.createForClass(Request);
