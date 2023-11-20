import { Test, TestingModule } from '@nestjs/testing';
import { RegistrarArcService } from './registrar_arc.service';

describe('RegistrarArcService', () => {
  let service: RegistrarArcService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistrarArcService],
    }).compile();

    service = module.get<RegistrarArcService>(RegistrarArcService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
