import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OfficeDocument = HydratedDocument<Office>;

@Schema()
export class Office {
  @Prop({ enum: ['Mohakhali-Main', 'Mohakhali-New', 'Mirpur-DOHS'] })
  branch: string;

  @Prop()
  floor: number;

  @Prop()
  room: number;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
