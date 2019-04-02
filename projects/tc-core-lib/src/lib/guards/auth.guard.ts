// This guard will redirect to login when not authenticated against live apps.
// If hosted on Tibco cloud it will not be used since Tibco Cloud/Live Apps WRP resources are protected anyway.

// session is detected if API called in last 30 mins (checks local sessionTimestamp)
// alternative way to achieve this would be to make an API call - eg) live apps claims call

// NOTE: assumes the login route is /login

import {Inject, Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';

@Injectable()
export class AuthGuard implements CanActivate {
  private TIBCO_CLOUD_DOMAIN = 'cloud.tibco.com';
  private TIBCO_TEST_DOMAIN = 'tenant-integration.tcie.pro';

  constructor(private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // check if we are hosted on tibco.cloud.com
    const host = window.location.hostname.split('.');
    const hostDomain = host[host.length - 3] + '.' + host[host.length - 2] + '.' + host[host.length - 1];
    if (hostDomain === this.TIBCO_CLOUD_DOMAIN || hostDomain === this.TIBCO_TEST_DOMAIN) {
      // delegate handling login/auth to Tibco Cloud since WRP resources are protected anyway
      return true;
    } else {
      // use the sessionTimestamp to decide whether to redirect to login (30 mins expiry of token if no API call)
      const tcsTimestamp = sessionStorage.getItem('tcsTimestamp');
      if (tcsTimestamp && Number(tcsTimestamp) > (Number(Date.now()) - (30 * 60000))) {
        // logged in and api called made in last 30 mins so should be OK
        return true;
      } else {
        // not logged in so redirect to login page
        // TODO: Externalize redirect URL
        // const TIBCO_CLOUD_LOGIN = 'https://account.cloud.tibco.com/idm/v1/login-saml?relayState=';
        /*const TIBCO_CLOUD_LOGIN = 'https://account.tenant-integration.tcie.pro/idm/v1/login-saml?relayState=';
        const reauthUrl = btoa('{ "resumeURL":"' + window.location.href + '", "tenantId":"BPM" }');
        console.log('redirecting to: ' + TIBCO_CLOUD_LOGIN + reauthUrl);
        window.location.href = TIBCO_CLOUD_LOGIN + reauthUrl;*/
        this.router.navigate(['/login'], {queryParams: {returnUrl: state.url}});
      }
    }
  }
}
