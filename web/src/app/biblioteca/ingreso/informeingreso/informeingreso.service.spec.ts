import { TestBed } from '@angular/core/testing';

import { InformeingresoService } from './informeingreso.service';

describe('InformeingresoService', () => {
  let service: InformeingresoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(InformeingresoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
