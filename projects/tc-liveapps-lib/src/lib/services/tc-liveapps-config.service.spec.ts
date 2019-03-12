import { TestBed } from '@angular/core/testing';

import { TcLiveappsConfigService } from './tc-liveapps-config.service';

describe('TcLiveappsConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcLiveappsConfigService = TestBed.get(TcLiveappsConfigService);
    expect(service).toBeTruthy();
  });
});
