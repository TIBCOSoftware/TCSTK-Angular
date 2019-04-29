import { TestBed } from '@angular/core/testing';

import { TcCaseAuditService } from './tc-case-audit.service';

describe('TcCaseAuditService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcCaseAuditService = TestBed.get(TcCaseAuditService);
    expect(service).toBeTruthy();
  });
});
