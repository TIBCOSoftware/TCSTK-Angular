/**
 * @ngdoc service
 * @name SessionRefreshService
 *
 * @description
 *
 * Used to handle refresh TSC/Domain cookie
 *
 * Will schedule an API call to get updated cookie
 *
 */

import { Injectable } from '@angular/core';
import {tap} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';


@Injectable({
  providedIn: 'root'
})

export class SessionRefreshService {

  constructor(private http: HttpClient) { }

  private delay: number;

  public scheduleCookieRefresh(delay: number, usingProxy: boolean) {
    this.delay = delay;
    const refreshFunction = usingProxy ? this.proxiedRefreshFunction : this.normalRefreshFunction;
    setInterval(refreshFunction, delay);
  }

  private proxiedRefreshFunction = () => {
    this.proxyTokenRefresh().pipe(
      tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
    ).subscribe();
  }

  private normalRefreshFunction = () => {
    this.normalTokenRefresh().pipe(
      tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
    ).subscribe();
  }

  public proxyTokenRefresh(): Observable<any> {
    const url = '/tokenRefresh';
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  public normalTokenRefresh(): Observable<any> {
    const url = '/organisation/v1/claims';
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

}
