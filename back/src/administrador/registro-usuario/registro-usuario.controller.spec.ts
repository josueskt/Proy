import { Test, TestingModule } from '@nestjs/testing';
import { RegistroUsuarioController } from './registro-usuario.controller';

describe('RegistroUsuarioController', () => {
  let controller: RegistroUsuarioController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistroUsuarioController],
    }).compile();

    controller = module.get<RegistroUsuarioController>(RegistroUsuarioController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
