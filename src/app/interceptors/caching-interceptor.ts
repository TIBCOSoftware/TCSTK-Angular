import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { startWith, tap, shareReplay } from 'rxjs/operators';
import { RequestCacheService } from '../services/request-cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let cachedResponse;
    if (req.headers.get('cacheResponse') || (req.urlWithParams.substr(0, 15)) === '../assets/icons') {
      // only cache if the cacheResponse flag is set
      cachedResponse = this.cache.get(req);
      // use the cache
      if (cachedResponse) {
        // console.log('*** using cached response for: ' + req.urlWithParams);
      } else {
        // console.log('*** no cached response for: ' + req.urlWithParams);
      }
    } else {
      // dont pass the cache since this should not be cached
      // console.log('*** BYPASS CACHE FOR: ' + req.urlWithParams);
      return this.sendRequest(req, next, undefined);
    }
    // return cached response or make request if no cached response
    return cachedResponse ? of(cachedResponse) : this.sendRequest(req, next, this.cache);
  }

  sendRequest(
    req: HttpRequest<any>,
    next: HttpHandler,
    cache: RequestCacheService): Observable<HttpEvent<any>> {
    return next.handle(req)
      .pipe(
      tap(event => {
        if (event instanceof HttpResponse && cache) {
          cache.put(req, event);
        }
      })
    );
  }
}
