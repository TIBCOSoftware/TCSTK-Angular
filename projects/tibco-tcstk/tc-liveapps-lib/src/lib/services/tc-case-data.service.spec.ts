import { TestBed } from '@angular/core/testing';

import { TcCaseDataService } from './tc-case-data.service';

describe('TcCaseDataService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcCaseDataService = TestBed.get(TcCaseDataService);
    expect(service).toBeTruthy();
  });
});
