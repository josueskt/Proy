import { TestBed } from '@angular/core/testing';

import { CrearAutoresService } from './crear-autores.service';

describe('CrearAutoresService', () => {
  let service: CrearAutoresService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CrearAutoresService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
