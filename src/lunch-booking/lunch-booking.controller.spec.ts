import { Test, TestingModule } from '@nestjs/testing';
import { LunchBookingController } from './lunch-booking.controller';
import { LunchBookingService } from './lunch-booking.service';

describe('LunchBookingController', () => {
  let controller: LunchBookingController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LunchBookingController],
      providers: [LunchBookingService],
    }).compile();

    controller = module.get<LunchBookingController>(LunchBookingController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
