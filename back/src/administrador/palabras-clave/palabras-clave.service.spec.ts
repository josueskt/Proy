import { Test, TestingModule } from '@nestjs/testing';
import { PalabrasClaveService } from './palabras-clave.service';

describe('PalabrasClaveService', () => {
  let service: PalabrasClaveService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [PalabrasClaveService],
    }).compile();

    service = module.get<PalabrasClaveService>(PalabrasClaveService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
