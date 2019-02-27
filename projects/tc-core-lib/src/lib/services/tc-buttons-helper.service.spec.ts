import { TestBed } from '@angular/core/testing';

import { TcButtonsHelperService } from './tc-buttons-helper.service';

describe('TcButtonsHelperService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcButtonsHelperService = TestBed.get(TcButtonsHelperService);
    expect(service).toBeTruthy();
  });
});
