import { Test, TestingModule } from '@nestjs/testing';
import { RegistroUsuarioService } from './registro-usuario.service';

describe('RegistroUsuarioService', () => {
  let service: RegistroUsuarioService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [RegistroUsuarioService],
    }).compile();

    service = module.get<RegistroUsuarioService>(RegistroUsuarioService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
