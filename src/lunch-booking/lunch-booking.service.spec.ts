import { Test, TestingModule } from '@nestjs/testing';
import { LunchBookingService } from './lunch-booking.service';

describe('LunchBookingService', () => {
  let service: LunchBookingService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LunchBookingService],
    }).compile();

    service = module.get<LunchBookingService>(LunchBookingService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
