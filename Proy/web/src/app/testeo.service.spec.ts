import { TestBed } from '@angular/core/testing';

import { TesteoService } from './testeo.service';

describe('TesteoService', () => {
  let service: TesteoService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(TesteoService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
