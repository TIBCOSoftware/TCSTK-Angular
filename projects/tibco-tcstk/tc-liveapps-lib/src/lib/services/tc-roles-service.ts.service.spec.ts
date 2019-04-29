import { TestBed } from '@angular/core/testing';

import { TcRolesService.TsService } from './tc-roles-service.ts.service';

describe('TcRolesService.TsService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcRolesService.TsService = TestBed.get(TcRolesService.TsService);
    expect(service).toBeTruthy();
  });
});
