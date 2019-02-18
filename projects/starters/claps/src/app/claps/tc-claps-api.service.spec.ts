import { TestBed } from '@angular/core/testing';

import { TcClapsApiService } from './tc-claps-api.service';

describe('TcClapsApiService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcClapsApiService = TestBed.get(TcClapsApiService);
    expect(service).toBeTruthy();
  });
});
