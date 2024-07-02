import { Test, TestingModule } from '@nestjs/testing';
import { EstantesController } from './estantes.controller';

describe('EstantesController', () => {
  let controller: EstantesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [EstantesController],
    }).compile();

    controller = module.get<EstantesController>(EstantesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
