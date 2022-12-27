import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OfficeDocument = HydratedDocument<Office>;

@Schema()
export class Office {
  @Prop({ enum: ['Mohakhali-Main', 'Mohakhali-New', 'Mirpur-DOHS'] })
  branch: string;

  @Prop()
  floor: string;

  @Prop()
  room: string;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
