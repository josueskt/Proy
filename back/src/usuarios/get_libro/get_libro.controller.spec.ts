import { Test, TestingModule } from '@nestjs/testing';
import { GetLibroController } from './get_libro.controller';

describe('GetLibroController', () => {
  let controller: GetLibroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [GetLibroController],
    }).compile();

    controller = module.get<GetLibroController>(GetLibroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
