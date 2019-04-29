import { TestBed } from '@angular/core/testing';

import { ServiceHandlerService } from './service-handler.service';

describe('ServiceHandlerService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: ServiceHandlerService = TestBed.get(ServiceHandlerService);
    expect(service).toBeTruthy();
  });
});
