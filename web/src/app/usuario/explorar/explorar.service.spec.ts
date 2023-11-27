import { TestBed } from '@angular/core/testing';

import { ExplorarService } from './explorar.service';

describe('ExplorarService', () => {
  let service: ExplorarService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ExplorarService);
  });

  it('should be created', () => {
    expect(service).toBeTruthy();
  });
});
