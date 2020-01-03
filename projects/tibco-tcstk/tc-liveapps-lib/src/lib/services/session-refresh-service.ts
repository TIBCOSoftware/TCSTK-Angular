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


@Injectable({
  providedIn: 'root'
})

export class SessionRefreshService {

  constructor(private liveappsService: LiveAppsService) { }

  private delay: number;

  public scheduleCookieRefresh(delay: number) {
    this.delay = delay;
    setTimeout(this.refreshFunction, delay);
  }

  private refreshFunction = () => {
    this.liveappsService.tokenRefresh().subscribe(
      next => {
        // console.log('token refreshed: ', next);
        this.scheduleCookieRefresh(this.delay);
      }
    );
  }
}
