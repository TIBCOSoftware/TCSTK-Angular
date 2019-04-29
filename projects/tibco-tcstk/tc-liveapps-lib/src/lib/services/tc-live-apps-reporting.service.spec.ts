import { TestBed } from '@angular/core/testing';

import { TcLiveAppsReportingService } from './tc-live-apps-reporting.service';

describe('TcLiveAppsReportingService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcLiveAppsReportingService = TestBed.get(TcLiveAppsReportingService);
    expect(service).toBeTruthy();
  });
});
