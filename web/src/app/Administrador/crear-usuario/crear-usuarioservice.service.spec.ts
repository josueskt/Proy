import { TestBed } from '@angular/core/testing';

import { CrearUsuarioserviceService } from './crear-usuarioservice.service';

describe('CrearUsuarioserviceService', () => {
  let service: CrearUsuarioserviceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearUsuarioserviceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
