import { TestBed } from '@angular/core/testing';

import { TcGeneralLandingPageConfigService } from './tc-general-landing-page-config.service';

describe('TcGeneralConfigLandingPageService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
      const service: TcGeneralLandingPageConfigService = TestBed.get(TcGeneralLandingPageConfigService);
    expect(service).toBeTruthy();
  });
});
