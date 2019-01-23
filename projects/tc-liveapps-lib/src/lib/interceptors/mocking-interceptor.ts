import { Injectable } from '@angular/core';
import {HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpClient} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { startWith, tap, shareReplay } from 'rxjs/operators';
import { RequestCacheService } from '../services/request-cache.service';

@Injectable()
export class MockingInterceptor implements HttpInterceptor {
  constructor() {
  }
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let mockResponse;
    if (req.url === '/pageflow/caseActions?$sandbox=31&$filter=applicationId eq 1742 and caseType eq 1 and caseState eq Created and caseRef eq 150471') {
      // use the mock
      const resp = require('./mock.json');
      mockResponse = new HttpResponse(resp);
      // mockResponse.body = resp.body;

    } else {
      // dont use the mock
      return this.sendRequest(req, next);
    }
    // return mocked response
    return mockResponse ? of(mockResponse) : this.sendRequest(req, next);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req);
  }
}
