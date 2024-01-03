import { TestBed } from '@angular/core/testing';

import { CrearUsuariosService } from './crear-usuarios.service';

describe('CrearUsuariosService', () => {
  let service: CrearUsuariosService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearUsuariosService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
