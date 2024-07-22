import { Test, TestingModule } from '@nestjs/testing';
import { ReporteLibroService } from './reporte_libro.service';

describe('ReporteLibroService', () => {
  let service: ReporteLibroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [ReporteLibroService],
    }).compile();

    service = module.get<ReporteLibroService>(ReporteLibroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
