import { TestBed } from '@angular/core/testing';

import { SeccioneSericeService } from './seccione-serice.service';

describe('SeccioneSericeService', () => {
  let service: SeccioneSericeService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(SeccioneSericeService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
