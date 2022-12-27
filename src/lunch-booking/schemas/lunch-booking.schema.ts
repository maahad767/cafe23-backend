import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { Office, User } from 'src/auth/schemas';

export type LunchBookingDocument = HydratedDocument<LunchBooking>;

@Schema()
export class LunchBooking {
  @Prop()
  date: Date;

  @Prop({ enum: ['DELICIOUS', 'DIET', 'OFF'] }) // TODO improve
  lunch_option: string;

  @Prop({ default: 0 })
  guests: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: User;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office',
  })
  office: Office;
}

export const LunchBookingSchema = SchemaFactory.createForClass(LunchBooking);
