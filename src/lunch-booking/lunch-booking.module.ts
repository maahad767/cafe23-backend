import { Module } from '@nestjs/common';
import { LunchBookingService } from './lunch-booking.service';
import { LunchBookingController } from './lunch-booking.controller';

@Module({
  controllers: [LunchBookingController],
  providers: [LunchBookingService]
})
export class LunchBookingModule {}
