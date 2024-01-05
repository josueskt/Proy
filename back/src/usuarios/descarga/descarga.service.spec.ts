import { Test, TestingModule } from '@nestjs/testing';
import { DescargaService } from './descarga.service';

describe('DescargaService', () => {
  let service: DescargaService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [DescargaService],
    }).compile();

    service = module.get<DescargaService>(DescargaService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
