// This guard is to try to redirect any direct access to a route prior to login.

import {Inject, Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // work out if we are hosted on tibco.cloud.com
    const host = window.location.hostname.split('.');
    const hostDomain = host[host.length - 3] + '.' + host[host.length - 2] + '.' + host[host.length - 1];
    if (hostDomain === 'cloud.tibco.com' || hostDomain === 'tenant-integration.tcie.pro') {
      // delegate handling login/auth to cloud.tibco.com
      return true;
    } else {
      // use the sessionTimestamp to decide whether to redirect to login (30 mins expiry of token if no API call)
      const tcsTimestamp = sessionStorage.getItem('tcsTimestamp');
      if (tcsTimestamp && Number(tcsTimestamp) > (Number(Date.now()) - (30 * 60000))) {
        // logged in and api called made in last 30 mins so should be OK
        return true;
      } else {
        // not logged in so redirect to login page
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      }
    }
  }
}
