import { TestBed } from '@angular/core/testing';

import { LiveAppsService } from './live-apps.service';

describe('LiveAppsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: LiveAppsService = TestBed.get(LiveAppsService);
    expect(service).toBeTruthy();
  });
});
