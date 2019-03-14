import { TestBed } from '@angular/core/testing';

import { TcSpotfireConfigService } from './tc-spotfire-config.service';

describe('TcSpotfireConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcSpotfireConfigService = TestBed.get(TcSpotfireConfigService);
    expect(service).toBeTruthy();
  });
});
