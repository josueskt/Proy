import { Test, TestingModule } from '@nestjs/testing';
import { CargaLLoteService } from './carga_l_lote.service';

describe('CargaLLoteService', () => {
  let service: CargaLLoteService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CargaLLoteService],
    }).compile();

    service = module.get<CargaLLoteService>(CargaLLoteService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
