import { Controller } from '@nestjs/common';
import { LunchBookingService } from './lunch-booking.service';

@Controller('lunch-booking')
export class LunchBookingController {
  constructor(private readonly lunchBookingService: LunchBookingService) {}
}
