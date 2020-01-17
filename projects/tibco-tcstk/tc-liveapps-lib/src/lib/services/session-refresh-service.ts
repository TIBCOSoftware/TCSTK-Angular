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
import {LiveAppsService} from './live-apps.service';
import {tap} from 'rxjs/operators';


@Injectable({
  providedIn: 'root'
})

export class SessionRefreshService {

  constructor(private liveappsService: LiveAppsService) { }

  private delay: number;

  public scheduleCookieRefresh(delay: number) {
    this.delay = delay;
    setInterval(this.refreshFunction, delay);
  }

  private refreshFunction = () => {
    this.liveappsService.tokenRefresh().pipe(
      tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
    ).subscribe();
  }
}
