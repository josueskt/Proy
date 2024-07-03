import { Test, TestingModule } from '@nestjs/testing';
import { SecionesService } from './seciones.service';

describe('SecionesService', () => {
  let service: SecionesService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [SecionesService],
    }).compile();

    service = module.get<SecionesService>(SecionesService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
