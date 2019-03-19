import { TestBed } from '@angular/core/testing';

import { PdProcessDiscoveryConfigService } from './pd-process-discovery-config.service';

describe('PdProcessDiscoveryService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: PdProcessDiscoveryConfigService = TestBed.get(PdProcessDiscoveryConfigService);
    expect(service).toBeTruthy();
  });
});
