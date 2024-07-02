import { Test, TestingModule } from '@nestjs/testing';
import { SecionesController } from './seciones.controller';

describe('SecionesController', () => {
  let controller: SecionesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SecionesController],
    }).compile();

    controller = module.get<SecionesController>(SecionesController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
