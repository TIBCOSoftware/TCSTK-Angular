// This guard will redirect to login screen when not authenticated against live apps.
// It is really just for dev as when on Tibco Cloud - Tibco cloud handles expiry/login redirection.
// Also when using oauth this isnt relevant as the oauth token obtained handled from outside the app.

// session is detected if API called in last 30 mins (checks local sessionTimestamp)
// alternative way to achieve this would be to make an API call - eg) live apps claims call

// NOTE: assumes the login route is /login

import {Inject, Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {TcCoreConfigService} from '../services/tc-core-config-service';

@Injectable()
export class AuthGuard implements CanActivate {
  private TIBCO_CLOUD_DOMAIN = 'cloud.tibco.com';
  private TIBCO_TEST_DOMAIN = 'tenant-integration.tcie.pro';
  private TIBCO_DEV_DOMAIN = 'emea.tibco.com';

  constructor(private router: Router, private coreConfigService: TcCoreConfigService) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if we are hosted on tibco.cloud.com
    const host = window.location.hostname.split('.');
    const hostDomain = host[host.length - 3] + '.' + host[host.length - 2] + '.' + host[host.length - 1];
    if (hostDomain === this.TIBCO_CLOUD_DOMAIN || hostDomain === this.TIBCO_TEST_DOMAIN || hostDomain === this.TIBCO_DEV_DOMAIN) {
      // delegate handling login/auth to Tibco Cloud since WRP resources are protected anyway
      return true;
    } else if (this.coreConfigService.getConfig().oAuthLocalStorageKey && this.coreConfigService.getConfig().oAuthLocalStorageKey !== '') {
      // dont use this when oauth enabled
      return true;
    } else {
      // use the sessionTimestamp to decide whether to redirect to login (30 mins expiry of token if no API call)
      const tcsTimestamp = sessionStorage.getItem('tcsTimestamp');
      if (tcsTimestamp && Number(tcsTimestamp) > (Number(Date.now()) - (30 * 60000))) {
        // logged in and api called made in last 30 mins so should be OK
        return true;
      } else {
        // not logged in so redirect to login page
        console.warn(Date.now());
        console.warn('Token expired - redirect to login: ', tcsTimestamp);
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      }
    }
  }
}
