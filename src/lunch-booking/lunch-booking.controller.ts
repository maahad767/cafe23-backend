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
import { UserDocument } from 'src/auth/schemas';
import { JwtAuthGuard, RolesGuard } from '../auth/guards';
import { BookLunchDto } from './dto/book-lunch.dto';

import { LunchBookingService } from './lunch-booking.service';

@Controller('lunch-bookings')
export class LunchBookingController {
  constructor(private readonly lunchBookingService: LunchBookingService) {}

  @Get('summary')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async getLunchBookingSummary(@GetUser() user: UserDocument) {
    return this.lunchBookingService.getLunchBookingSummary(user);
  }

  @Get('/my')
  @UseGuards(JwtAuthGuard)
  async getMyLunchBookings(@GetUser() user: UserDocument) {
    return this.lunchBookingService.getMyLunchBookings(user);
  }

  @Post()
  @UseGuards(JwtAuthGuard)
  @HttpCode(HttpStatus.OK)
  async bookLunch(
    @GetUser() user: UserDocument,
    @Body(new ParseArrayPipe({ items: BookLunchDto })) dto: BookLunchDto[],
  ) {
    return this.lunchBookingService.bookLunch(user, dto);
  }

  @Post('create-all')
  @UseGuards(JwtAuthGuard, RolesGuard)
  @Roles('ADMIN')
  async createLunchBookingForAllUserMonth() {
    return this.lunchBookingService.createLunchBookingForAllUserMonth();
  }

  @HttpCode(HttpStatus.NO_CONTENT)
  @Delete()
  @UseGuards(JwtAuthGuard)
  async deleteAllLunchBookings(@GetUser() user: UserDocument) {
    return this.lunchBookingService.deleteAllLunchBookings(user);
  }
}
