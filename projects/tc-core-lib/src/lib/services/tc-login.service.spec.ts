import { TestBed } from '@angular/core/testing';

import { TcLoginService } from './tc-login.service';

describe('TcLoginService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcLoginService = TestBed.get(TcLoginService);
    expect(service).toBeTruthy();
  });
});
