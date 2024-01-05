import { TestBed } from '@angular/core/testing';

import { TipoLibroService } from './tipo-libro.service';

describe('TipoLibroService', () => {
  let service: TipoLibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TipoLibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
