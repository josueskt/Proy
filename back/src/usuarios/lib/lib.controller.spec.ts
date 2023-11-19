import { Test, TestingModule } from '@nestjs/testing';
import { LibController } from './lib.controller';

describe('LibController', () => {
  let controller: LibController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibController],
    }).compile();

    controller = module.get<LibController>(LibController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
