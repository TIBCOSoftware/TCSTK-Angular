import { TestBed } from '@angular/core/testing';

import { TcCaseCardConfigService } from './tc-case-card-config.service';

describe('TcCaseCardConfigService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcCaseCardConfigService = TestBed.get(TcCaseCardConfigService);
    expect(service).toBeTruthy();
  });
});
