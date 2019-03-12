import { TestBed } from '@angular/core/testing';

import { TcGeneralConfigService } from './tc-general-config.service';

describe('TcGenericConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcGeneralConfigService = TestBed.get(TcGeneralConfigService);
    expect(service).toBeTruthy();
  });
});
