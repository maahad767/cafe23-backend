import { Module } from '@nestjs/common';
import { LunchBookingService } from './lunch-booking.service';
import { LunchBookingController } from './lunch-booking.controller';
import { LunchBooking, LunchBookingSchema } from './schemas';
import { MongooseModule } from '@nestjs/mongoose';
import { Office, OfficeSchema, User, UserSchema } from 'src/auth/schemas';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: User.name, schema: UserSchema },
      { name: LunchBooking.name, schema: LunchBookingSchema },
      { name: Office.name, schema: OfficeSchema },
    ]),
  ],
  controllers: [LunchBookingController],
  providers: [LunchBookingService],
})
export class LunchBookingModule {}
