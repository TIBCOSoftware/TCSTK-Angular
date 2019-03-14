import { Injectable } from '@angular/core';
import {
  HttpRequest,
  HttpHandler,
  HttpEvent,
  HttpInterceptor,
  HttpResponse,
  HttpErrorResponse,
} from '@angular/common/http';

import { Observable, of } from 'rxjs';
import {catchError, tap} from 'rxjs/operators';
import {ActivatedRouteSnapshot, Router, RouterStateSnapshot} from '@angular/router';

@Injectable()
export class AuthErrorInterceptor implements HttpInterceptor {
  private TIBCO_CLOUD_DOMAIN = 'cloud.tibco.com';
  private TIBCO_TEST_DOMAIN = 'tenant-integration.tcie.pro';
  constructor(private router: Router) {}

  intercept(req: HttpRequest<any>, next: HttpHandler): Observable<HttpEvent<any>> {
    return next.handle(req).pipe(
      catchError((err: any) => {
          if (err instanceof HttpErrorResponse) {
            // error: "Logged out due to inactivity. Hit refresh.↵"
            // headers: HttpHeaders {normalizedNames: Map(0), lazyUpdate: null, lazyInit: ƒ}
            // message: "Http failure response for https://localhost:4200/clientstate/states?$filter=type=PRIVATE%20and%20name=%27testappjs.recentcases.tibcolabs.client.context.PRIVATE%27: 419 OK"
            // name: "HttpErrorResponse"
            // ok: false
            // status: 419
            // statusText: "OK"
            if (err.status === 419) {
              // timed out
              // should only be used if not on tibco cloud (and hence using our login route)
              // TODO: Externalize redirect URL
              // check if we are hosted on tibco.cloud.com
              const host = window.location.hostname.split('.');
              const hostDomain = host[host.length - 3] + '.' + host[host.length - 2] + '.' + host[host.length - 1];
              if (hostDomain === this.TIBCO_CLOUD_DOMAIN || hostDomain === this.TIBCO_TEST_DOMAIN) {
                // on tibco cloud - let tibco cloud handle it
              } else {
                this.router.navigate(['/login'], {queryParams: {}});
              }
            } else {
              throw err;
            }
          }
          return of(err);
        }
      )
    );
  }
}
