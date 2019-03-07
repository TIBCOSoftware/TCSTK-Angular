import { TestBed } from '@angular/core/testing';

import { TcDocumentService } from './tc-document.service';

describe('TcDocumentService', () => {
  beforeEach(() => TestBed.configureTestingModule({}));

  it('should be created', () => {
    const service: TcDocumentService = TestBed.get(TcDocumentService);
    expect(service).toBeTruthy();
  });
});
