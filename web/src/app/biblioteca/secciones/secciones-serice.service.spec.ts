import { TestBed } from '@angular/core/testing';

import { SeccionesSericeService } from './secciones-serice.service';

describe('SeccionesSericeService', () => {
  let service: SeccionesSericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeccionesSericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
