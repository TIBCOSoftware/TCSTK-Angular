import { TestBed } from '@angular/core/testing';

import { CwmSettingsConfigServiceService } from './cwm-settings-config-service.service';

describe('CwmSettingsConfigServiceService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: CwmSettingsConfigServiceService = TestBed.get(CwmSettingsConfigServiceService);
    expect(service).toBeTruthy();
  });
});
