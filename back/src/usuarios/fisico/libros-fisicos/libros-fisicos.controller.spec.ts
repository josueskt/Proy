import { Test, TestingModule } from '@nestjs/testing';
import { LibrosFisicosController } from './libros-fisicos.controller';

describe('LibrosFisicosController', () => {
  let controller: LibrosFisicosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [LibrosFisicosController],
    }).compile();

    controller = module.get<LibrosFisicosController>(LibrosFisicosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
