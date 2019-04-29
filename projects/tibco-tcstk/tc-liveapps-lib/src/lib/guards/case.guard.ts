// This guard is to check case Id is valid before loading route
// We have to get sandbox Id then pass that to the getCaseByRef call
// This will return (observable) true if the case exists or false if it doesnt

import {Inject, Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LiveAppsService} from '../services/live-apps.service';
import {HttpClient, HttpHandler} from '@angular/common/http';
import {catchError, flatMap, map, mergeMap} from 'rxjs/operators';
import {Observable, of, throwError} from 'rxjs';
import {ClaimsResolver} from '../resolvers/claims.resolver';
import {Claim} from '@tibco-tcstk/tc-core-lib';

@Injectable()
export class CaseGuard implements CanActivate {

  constructor(private liveapps: LiveAppsService, private router: Router) {
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // get app config
    const caseRef = route.url[route.url.length - 1].path;

    const claimsResolver = new ClaimsResolver(this.liveapps);

    const decision: Observable<boolean> = claimsResolver.resolve()
      .pipe(
        // use flatMap so we can pass the config into the getCaseByRef call)
        flatMap(
          claims => {
            return this.liveapps.getCaseByRef(claims.primaryProductionSandbox.id, caseRef)
              .pipe(
                map(caseinfo => {
                  if (caseinfo) {
                    return true;
                  } else {
                    // TODO: Externalize redirect URL
                    this.router.navigate(['/starterApp/home'], {});
                    return false;
                  }
                }),
                catchError(error => {
                  // if the case is not found (someone tried to manually route to an invalid caseref) then redirect back to home
                  console.error('Unable to load case ' + caseRef + ' are you sure that is a valid case reference?');
                  // TODO: Externalize redirect URL
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
