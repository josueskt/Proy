import { TestBed } from '@angular/core/testing';

import { CargaLibrosBloqueService } from './carga-libros-bloque.service';

describe('CargaLibrosBloqueService', () => {
  let service: CargaLibrosBloqueService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CargaLibrosBloqueService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
