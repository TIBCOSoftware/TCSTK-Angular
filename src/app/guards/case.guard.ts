// This guard is to check case Id is valid before loading route
// We have to load the config to get sandbox Id then pass that to the getCaseByRef call
// This will return (observable to) true if the case exists or false if it doesnt

import {Inject, Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {ConfigResolver} from '../resolvers/config.resolver';
import {LiveAppsService} from '../services/live-apps.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {catchError, map, mergeMap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';

@Injectable()
export class CaseGuard implements CanActivate {

  constructor(private liveapps: LiveAppsService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // get app config
    // const path = route.url.toString().split('/');
    const caseRef = route.url[route.url.length - 1].path;

    const configResolver = new ConfigResolver(this.liveapps);

    const decision = configResolver.resolve(route)
      .pipe(
        // use mergeMap so we can pass the config into the getCaseByRef call)
        mergeMap(
          appConf => {
            return this.liveapps.getCaseByRef(appConf.sandboxId, caseRef)
              .pipe(
                map(caseinfo => {
                  if (caseinfo) {
                    return true;
                  } else {
                    // if no caseinfo returned (Should not happen)
                    this.router.navigate(['/starterApp/home'], {});
                    return false;
                  }
                }),
                catchError(error => {
                  // if the case is not found (someone tried to manually route to an invalid caseref) then redirect back to home
                  console.error('Unable to load case ' + caseRef + ' are you sure that is a valid case reference?');
                  this.router.navigate(['/starterApp/home'], {});
                  return throwError(error);
                })
              );
          }
        )
      );

    return decision;
  }

}
