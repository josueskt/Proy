import { TestBed } from '@angular/core/testing';

import { VistalibroService } from './vistalibro.service';

describe('VistalibroService', () => {
  let service: VistalibroService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(VistalibroService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
