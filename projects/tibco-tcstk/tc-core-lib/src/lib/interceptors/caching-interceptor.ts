/**
 * @ngdoc component
 * @name CachingInterceptor
 *
 * @description
 *
 * This interceptor will intercept http calls if it is enabled in the tc-core-lib-module.ts.
 *
 * It will cache requests if the cacheResponse header is specified on the http request.
 * If flush cache header is on the request it will not use the cache and will overwrite the current cached entry.
 *
 *
 */

import { Injectable } from '@angular/core';
import { HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler } from '@angular/common/http';

import { Observable, of } from 'rxjs';
import { tap } from 'rxjs/operators';
import { RequestCacheService } from '../services/request-cache.service';

@Injectable()
export class CachingInterceptor implements HttpInterceptor {
  constructor(private cache: RequestCacheService) {}
  intercept(req: HttpRequest<any>, next: HttpHandler) {
    let cachedResponse;
    if (req.headers.get('cacheResponse') || (req.urlWithParams.substr(0, 15)) === '../assets/icons') {
      // only cache if the cacheResponse flag is set
      if (!req.headers.get('flushCache')) {
        cachedResponse = this.cache.get(req);
      } else {
      }
      // use the cache
    } else {
      // dont pass the cache since this should not be cached
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
