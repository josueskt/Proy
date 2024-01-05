import { Test, TestingModule } from '@nestjs/testing';
import { DescargaController } from './descarga.controller';

describe('DescargaController', () => {
  let controller: DescargaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DescargaController],
    }).compile();

    controller = module.get<DescargaController>(DescargaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
