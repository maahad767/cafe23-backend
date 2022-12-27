import { Controller, Get, UseGuards } from '@nestjs/common';
import { GetUser, Roles } from 'src/auth/decorators';
import { User } from 'src/auth/schemas';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';

import { LunchBookingService } from './lunch-booking.service';

@Controller('lunch-bookings')
export class LunchBookingController {
  constructor(private readonly lunchBookingService: LunchBookingService) {}

  // book lunch next week

  // update booking

  // cancel booking

  // get all bookings

  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('EMPLOYEE')
  @Get()
  async getAllBookings(@GetUser() user: User) {
    console.log(user);

    return { message: 'This action returns all bookings' };
  }

  // get all bookings for a user

  // get all bookings for a date

  // get all bookings for a user and date

  // get all bookings for a user and date range

  // get all bookings for a date range

  // get all bookings for a user and date range
}
