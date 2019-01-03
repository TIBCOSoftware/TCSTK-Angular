// This guard is to check case Id is valid before loading route

import {Inject, Injectable} from '@angular/core';
import { Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot } from '@angular/router';
import {ConfigResolver} from '../resolvers/config.resolver';
import {LiveAppsService} from '../services/live-apps.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {catchError, map} from 'rxjs/operators';
import {throwError} from 'rxjs';

@Injectable()
export class CaseGuard implements CanActivate {

  constructor(private liveapps: LiveAppsService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot) {
    // get app config
    let config;
    // const path = route.url.toString().split('/');
    const caseRef = route.url[route.url.length - 1].path;

    const configResolver = new ConfigResolver();
    configResolver.resolve().subscribe(appConfig => config = appConfig);
    const caseDetails = this.liveapps.getCaseByRef(config.sandboxId, caseRef)
      .pipe(
        map(caseinfo => {
          if (caseinfo) {
            return true;
          } else {
            // if no caseinfo returned (Should not happen)
            this.router.navigate(['/home'], {});
          }
        }),
        catchError(error => {
          // if the case is not found (someone tried to manually route to an invalid caseref) then redirect back to home
          console.error('Unable to load case ' + caseRef + ' are you sure that is a valid case reference?');
          this.router.navigate(['/home'], {});
          return throwError(error);
        })
      );

    return caseDetails;


/*    if (1 === 1) {
        return true;
      } else {
        // go back home
        this.router.navigate(['/home'], {});
      }*/
    }
}
