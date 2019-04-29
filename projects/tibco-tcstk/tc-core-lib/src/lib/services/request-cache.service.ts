/**
 * @ngdoc component
 * @name RequestCacheService
 *
 * @description
 *
 * This service provides the ability to cache http requests
 *
 *
 */

import { Injectable } from '@angular/core';
import { HttpRequest, HttpResponse } from '@angular/common/http';

// cache for an hour max
const maxAge = 3.6e+6;

@Injectable({
  providedIn: 'root'
})

export class RequestCacheService {
  cache = new Map();

  get(req: HttpRequest<any>): HttpResponse<any> | undefined {
    const url = req.urlWithParams;
    const cached = this.cache.get(url);

    if (!cached) {
      return undefined;
    }

    const isExpired = cached.lastRead < (Date.now() - maxAge);
    const expired = isExpired ? 'expired ' : '';
    return cached.response;
  }

  put(req: HttpRequest<any>, response: HttpResponse<any>): void {
    // console.log(JSON.stringify(response));
    const url = req.url;
    const entry = { url, response, lastRead: Date.now() };
    this.cache.set(url, entry);

    const expired = Date.now() - maxAge;
    this.cache.forEach(expiredEntry => {
      if (expiredEntry.lastRead < expired) {
        this.cache.delete(expiredEntry.url);
      }
    });
  }
}


