// Copyright (c) 2018-2018. TIBCO Software Inc. All Rights Reserved. Confidential & Proprietary.
import { TestBed, inject } from '@angular/core/testing';

import { LazyLoadingLibraryService } from './lazy-loading-library.service';

describe('LazyLoadingLibraryService', () => {
  beforeEach(() => {
    TestBed.configureTestingModule({
      providers: [LazyLoadingLibraryService]
    });
  });

  it('should be created', inject([LazyLoadingLibraryService], (service: LazyLoadingLibraryService) => {
    expect(service).toBeTruthy();
  }));
});
