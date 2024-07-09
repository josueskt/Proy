import { TestBed } from '@angular/core/testing';

import { EstantesServiceService } from './estantes-service.service';

describe('EstantesServiceService', () => {
  let service: EstantesServiceService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(EstantesServiceService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
