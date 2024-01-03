import { Test, TestingModule } from '@nestjs/testing';
import { NacionalidadController } from './nacionalidad.controller';

describe('NacionalidadController', () => {
  let controller: NacionalidadController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [NacionalidadController],
    }).compile();

    controller = module.get<NacionalidadController>(NacionalidadController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
