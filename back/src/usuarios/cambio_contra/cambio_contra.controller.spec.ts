import { Test, TestingModule } from '@nestjs/testing';
import { CambioContraController } from './cambio_contra.controller';

describe('CambioContraController', () => {
  let controller: CambioContraController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CambioContraController],
    }).compile();

    controller = module.get<CambioContraController>(CambioContraController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
