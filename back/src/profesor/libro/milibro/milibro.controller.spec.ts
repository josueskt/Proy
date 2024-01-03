import { Test, TestingModule } from '@nestjs/testing';
import { MilibroController } from './milibro.controller';

describe('MilibroController', () => {
  let controller: MilibroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MilibroController],
    }).compile();

    controller = module.get<MilibroController>(MilibroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
