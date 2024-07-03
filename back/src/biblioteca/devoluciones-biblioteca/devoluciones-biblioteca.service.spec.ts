import { Test, TestingModule } from '@nestjs/testing';
import { DevolucionesBibliotecaService } from './devoluciones-biblioteca.service';

describe('DevolucionesBibliotecaService', () => {
  let service: DevolucionesBibliotecaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DevolucionesBibliotecaService],
    }).compile();

    service = module.get<DevolucionesBibliotecaService>(DevolucionesBibliotecaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
