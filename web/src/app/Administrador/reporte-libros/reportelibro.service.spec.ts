import { TestBed } from '@angular/core/testing';

import { ReportelibroService } from './reportelibro.service';

describe('ReportelibroService', () => {
  let service: ReportelibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ReportelibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
