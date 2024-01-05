import { Test, TestingModule } from '@nestjs/testing';
import { LibroTipoService } from './libro_tipo.service';

describe('LibroTipoService', () => {
  let service: LibroTipoService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [LibroTipoService],
    }).compile();

    service = module.get<LibroTipoService>(LibroTipoService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
