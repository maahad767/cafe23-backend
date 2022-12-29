import { Injectable, RequestTimeoutException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Office, OfficeDocument, User } from 'src/auth/schemas';
import { BookLunchDto } from './dto/book-lunch.dto';
import { LunchBooking, LunchBookingDocument } from './schemas';

@Injectable()
export class LunchBookingService {
  constructor(
    @InjectModel(Office.name) private officeModel: Model<Office>,
    @InjectModel(LunchBooking.name)
    private lunchBookingModel: Model<LunchBookingDocument>,
  ) {}

  async bookLunch(user: User, dto: BookLunchDto[]) {
    dto.map(async (lunch_booking) => {
      let office: OfficeDocument;
      if (lunch_booking.office) {
        office = await this.officeModel.findOne({ ...lunch_booking.office });
        if (!office) {
          office = new this.officeModel({ ...lunch_booking.office });
        }
      } else {
        office = user.office;
      }

      this.lunchBookingModel.findOneAndUpdate(
        {
          user: user,
          date: lunch_booking.date,
        },
        {
          user: user,
          date: lunch_booking.date,
          lunch_option: lunch_booking.lunch_option,
          guests: lunch_booking.guests,
          office: office,
        },
      );
    });
    return this.lunchBookingModel
      .find({
        user: user,
        date: { $in: dto.map((lunch_booking) => lunch_booking.date) },
      })
      .populate('office');
  }
  async getMyLunchBookings(user: User) {
    throw new Error('Method not implemented.');
  }
  async getLunchBookingSummary(user: User) {
    throw new Error('Method not implemented.');
  }
  async deleteAllLunchBookings(user: User) {
    this.lunchBookingModel.deleteMany();
  }
}
