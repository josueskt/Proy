import { Test, TestingModule } from '@nestjs/testing';
import { EstantesService } from './estantes.service';

describe('EstantesService', () => {
  let service: EstantesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [EstantesService],
    }).compile();

    service = module.get<EstantesService>(EstantesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
