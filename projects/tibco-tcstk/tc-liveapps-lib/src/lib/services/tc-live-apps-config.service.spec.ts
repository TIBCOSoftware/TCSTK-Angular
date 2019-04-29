import { TestBed } from '@angular/core/testing';

import { TcLiveAppsConfigService } from './tc-live-apps-config.service';

describe('TcLiveAppsConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcLiveAppsConfigService = TestBed.get(TcLiveAppsConfigService);
    expect(service).toBeTruthy();
  });
});
