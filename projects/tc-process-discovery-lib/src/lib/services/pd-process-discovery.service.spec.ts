import { TestBed } from '@angular/core/testing';

import { PdProcessDiscoveryService } from './pd-process-discovery.service';

describe('PdProcessDiscoveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: PdProcessDiscoveryService = TestBed.get(PdProcessDiscoveryService);
    expect(service).toBeTruthy();
  });
});
