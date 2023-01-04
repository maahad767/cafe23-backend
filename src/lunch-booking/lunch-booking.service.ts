import { BadRequestException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { Office, OfficeDocument, User, UserDocument } from 'src/auth/schemas';
import { BookLunchDto } from './dto/book-lunch.dto';
import { LunchBooking, LunchBookingDocument } from './schemas';

@Injectable()
export class LunchBookingService {
  constructor(
    @InjectModel(User.name) private userModel: Model<User>,
    @InjectModel(Office.name) private officeModel: Model<Office>,
    @InjectModel(LunchBooking.name)
    private lunchBookingModel: Model<LunchBookingDocument>,
  ) {}

  async bookLunch(user: UserDocument, dto: BookLunchDto[]) {
    const dateStart = new Date();
    dateStart.setDate(1);
    dateStart.setTime(0);
    const dateEnd = new Date(dateStart);
    dateEnd.setMonth(dateStart.getMonth() + 1);
    dateEnd.setDate(0);
    dto.map(async (lunch_booking) => {
      lunch_booking.date = new Date(lunch_booking.date);
      if (lunch_booking.date < dateStart || lunch_booking.date > dateEnd) {
        throw new BadRequestException(
          'You can only book lunch for the current month',
        );
      }

      const office: OfficeDocument = await this.officeModel
        .findOneAndUpdate(
          {
            ...lunch_booking.office,
          },
          lunch_booking.office,
          { upsert: true, new: true, runValidators: true },
        )
        .catch((err) => {
          throw new BadRequestException(
            'Something went wrong while saving the office. ' + err,
          );
        });

      this.lunchBookingModel
        .findOneAndUpdate(
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
          { upsert: true, new: true, runValidators: true },
        )
        .catch((err) => {
          throw new BadRequestException(
            'Something went wrong while saving the lunch booking. ' + err,
          );
        });
    });
    return { message: 'Lunch bookings updated' };
  }

  async getMyLunchBookings(user: UserDocument) {
    throw new Error('Method not implemented.');
  }

  async getLunchBookingSummary(user: UserDocument) {
    throw new Error('Method not implemented.');
  }

  async createLunchBookingForAllUserMonth() {
    const users = await this.userModel.find();
    const dateStart = new Date();
    dateStart.setDate(1);
    dateStart.setTime(0);
    const dateEnd = new Date(dateStart);
    dateEnd.setMonth(dateStart.getMonth() + 1);
    dateEnd.setDate(0);

    while (dateStart <= dateEnd) {
      users.map((user) => {
        const lunchBooking = new this.lunchBookingModel({
          user: user,
          date: dateStart,
          office: user.office,
        });
        lunchBooking.save();
      });
      dateStart.setDate(dateStart.getDate() + 1);
    }

    return { message: 'Lunch bookings created' };
  }

  async deleteAllLunchBookings(user: UserDocument) {
    await this.lunchBookingModel.deleteMany({});
  }
}
