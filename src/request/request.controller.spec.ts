import { Test } from '@nestjs/testing';
import { RequestController } from './request.controller';
import { RequestModule } from './request.module';

describe('RequestController', () => {
  let myController: RequestController;

  beforeEach(async () => {
    const module = await Test.createTestingModule({
      imports: [RequestModule],
    }).compile();

    myController = module.get<RequestController>(RequestController);
  });

  it('should the correct value', () => {
    expect(myController).toBeDefined();
  });
});
