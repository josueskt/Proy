import { Test, TestingModule } from '@nestjs/testing';
import { LibroTipoController } from './libro_tipo.controller';

describe('LibroTipoController', () => {
  let controller: LibroTipoController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibroTipoController],
    }).compile();

    controller = module.get<LibroTipoController>(LibroTipoController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
