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
              this.router.navigate(['/login'], {queryParams: {} });
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
