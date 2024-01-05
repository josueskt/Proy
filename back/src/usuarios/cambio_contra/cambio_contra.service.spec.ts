import { Test, TestingModule } from '@nestjs/testing';
import { CambioContraService } from './cambio_contra.service';

describe('CambioContraService', () => {
  let service: CambioContraService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [CambioContraService],
    }).compile();

    service = module.get<CambioContraService>(CambioContraService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
