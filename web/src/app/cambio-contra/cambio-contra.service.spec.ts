import { TestBed } from '@angular/core/testing';

import { CambioContraService } from './cambio-contra.service';

describe('CambioContraService', () => {
  let service: CambioContraService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(CambioContraService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
