import { TestBed } from '@angular/core/testing';

import { TcSharedStateService } from './tc-shared-state.service';

describe('TcSharedStateService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcSharedStateService = TestBed.get(TcSharedStateService);
    expect(service).toBeTruthy();
  });
});
