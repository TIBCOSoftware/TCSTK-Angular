import { TestBed } from '@angular/core/testing';

import { TcCaseStatesService } from './tc-case-states.service';

describe('TcCaseStatesService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcCaseStatesService = TestBed.get(TcCaseStatesService);
    expect(service).toBeTruthy();
  });
});
