import { Test, TestingModule } from '@nestjs/testing';
import { MisprestamosController } from './misprestamos.controller';

describe('MisprestamosController', () => {
  let controller: MisprestamosController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MisprestamosController],
    }).compile();

    controller = module.get<MisprestamosController>(MisprestamosController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
