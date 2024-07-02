import { Test, TestingModule } from '@nestjs/testing';
import { DevolucionesBibliotecaController } from './devoluciones-biblioteca.controller';

describe('DevolucionesBibliotecaController', () => {
  let controller: DevolucionesBibliotecaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [DevolucionesBibliotecaController],
    }).compile();

    controller = module.get<DevolucionesBibliotecaController>(DevolucionesBibliotecaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
