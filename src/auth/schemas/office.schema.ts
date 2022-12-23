import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { HydratedDocument } from 'mongoose';

export type OfficeDocument = HydratedDocument<Office>;

@Schema()
export class Office {
  @Prop()
  branch: string;

  @Prop()
  floor: string;
}

export const OfficeSchema = SchemaFactory.createForClass(Office);
