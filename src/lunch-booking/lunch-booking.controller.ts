import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  ParseArrayPipe,
  Post,
  UseGuards,
} from '@nestjs/common';
import { GetUser, Roles } from 'src/auth/decorators';
import { User } from 'src/auth/schemas';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { BookLunchDto } from './dto/book-lunch.dto';

import { LunchBookingService } from './lunch-booking.service';

@Controller('lunch-bookings')
export class LunchBookingController {
  constructor(private readonly lunchBookingService: LunchBookingService) {}

  @Get('summary')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getLunchBookingSummary(@GetUser() user: User) {
    return this.lunchBookingService.getLunchBookingSummary(user);
  }

  @Get('/my')
  @UseGuards(JwtAuthGuard)
  async getMyLunchBookings(@GetUser() user: User) {
    return this.lunchBookingService.getMyLunchBookings(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  async bookLunch(
    @GetUser() user: User,
    @Body(new ParseArrayPipe({ items: BookLunchDto })) dto: BookLunchDto[],
  ) {
    return this.lunchBookingService.bookLunch(user, dto);
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteAllLunchBookings(@GetUser() user: User) {
    return this.lunchBookingService.deleteAllLunchBookings(user);
  }
}
