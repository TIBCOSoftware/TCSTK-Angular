import { TestBed } from '@angular/core/testing';

import { TcCaseProcessesService } from './tc-case-processes.service';

describe('TcLiveappsCaseActionsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcCaseProcessesService = TestBed.get(TcCaseProcessesService);
    expect(service).toBeTruthy();
  });
});
