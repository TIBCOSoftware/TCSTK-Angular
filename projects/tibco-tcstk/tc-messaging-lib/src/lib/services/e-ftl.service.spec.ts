import { TestBed } from '@angular/core/testing';

import { EFTLService } from './e-ftl.service';

describe('EFTLService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: EFTLService = TestBed.get(EFTLService);
    expect(service).toBeTruthy();
  });
});
