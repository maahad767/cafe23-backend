import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import mongoose, { HydratedDocument } from 'mongoose';
import { OfficeDocument, UserDocument } from 'src/auth/schemas';

export type LunchBookingDocument = HydratedDocument<LunchBooking>;

@Schema()
export class LunchBooking {
  @Prop()
  date: Date;

  @Prop({ enum: ['DELICIOUS', 'DIET', 'OFF'], default: 'OFF' }) // TODO improve
  lunch_option: string;

  @Prop({ default: 0 })
  guests: number;

  @Prop({ type: mongoose.Schema.Types.ObjectId, ref: 'User' })
  user: UserDocument;

  @Prop({
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Office',
  })
  office: OfficeDocument;
}

export const LunchBookingSchema = SchemaFactory.createForClass(LunchBooking);
LunchBookingSchema.index({ date: 1, user: 1 }, { unique: true });
