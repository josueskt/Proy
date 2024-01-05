import { Test, TestingModule } from '@nestjs/testing';
import { GetLibroService } from './get_libro.service';

describe('GetLibroService', () => {
  let service: GetLibroService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [GetLibroService],
    }).compile();

    service = module.get<GetLibroService>(GetLibroService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
