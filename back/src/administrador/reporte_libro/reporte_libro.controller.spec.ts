import { Test, TestingModule } from '@nestjs/testing';
import { ReporteLibroController } from './reporte_libro.controller';

describe('ReporteLibroController', () => {
  let controller: ReporteLibroController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [ReporteLibroController],
    }).compile();

    controller = module.get<ReporteLibroController>(ReporteLibroController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
