import { Test, TestingModule } from '@nestjs/testing';
import { RegistrarArcController } from './registrar_arc.controller';

describe('RegistrarArcController', () => {
  let controller: RegistrarArcController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [RegistrarArcController],
    }).compile();

    controller = module.get<RegistrarArcController>(RegistrarArcController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
