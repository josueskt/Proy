import { Test, TestingModule } from '@nestjs/testing';
import { NacionalidadService } from './nacionalidad.service';

describe('NacionalidadService', () => {
  let service: NacionalidadService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [NacionalidadService],
    }).compile();

    service = module.get<NacionalidadService>(NacionalidadService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
