import { Test, TestingModule } from '@nestjs/testing';
import { CargaLLoteController } from './carga_l_lote.controller';

describe('CargaLLoteController', () => {
  let controller: CargaLLoteController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [CargaLLoteController],
    }).compile();

    controller = module.get<CargaLLoteController>(CargaLLoteController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
