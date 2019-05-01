// This guard is to check whether the user has appropriate role to access a route based on config settings

import {Inject, Injectable} from '@angular/core';
import {Router, CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot} from '@angular/router';
import {LiveAppsService} from '../services/live-apps.service';
import {HttpClient, HttpHandler, HttpHeaders} from '@angular/common/http';
import {catchError, flatMap, map, mergeMap} from 'rxjs/operators';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {ClaimsResolver} from '../resolvers/claims.resolver';
import {Claim, GeneralConfigResolver, TcCoreCommonFunctions, TcGeneralConfigService, TcSharedStateService} from '@tibco-tcstk/tc-core-lib';
import {Location} from '@angular/common';
import {Roles, RouteAccessControlConfig, RouteAccessDef} from '../models/tc-groups-data';
import {RolesResolver} from '../resolvers/roles.resolver';

@Injectable()
export class RoleGuard implements CanActivate {

  DEFAULT_CONFIG_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/routeAccessControl.json');

  constructor(private liveapps: LiveAppsService, private router: Router, private http: HttpClient, private location: Location, private sharedStateService: TcSharedStateService, private generalConfigService: TcGeneralConfigService) {
  }

  // can be used to load defaultAppConfig from a JSON config
  private getRouteAccessControlConfig = (): Observable<RouteAccessControlConfig> => {
    const headers = new HttpHeaders().set('cacheResponse', 'true');
    return this.http.get(this.DEFAULT_CONFIG_URL, { headers }).pipe(
      map(configContents => new RouteAccessControlConfig().deserialize(configContents))
    );
  }

  private getRouteDef = (routeAccessConfig: RouteAccessControlConfig, route: ActivatedRouteSnapshot): RouteAccessDef => {
    return routeAccessConfig.routes.find(routeRec => {
      return (routeRec.routeUrl === route.routeConfig.path);
    });
  }

  private hasAccess = (config: RouteAccessDef, roles: Roles): boolean => {
    const reqRole = roles.roles.find(role => {
      return (role.id === config.requiredRoleId);
    })
    return reqRole ? true : false;
  }

  canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {
    // get route config
    const routeConfig$ = this.getRouteAccessControlConfig();

    // we will need the roles we currently have
    const currentRolesRes = new RolesResolver(this.sharedStateService, this.generalConfigService, this.http, this.liveapps, this.location)
    const currentRoles$ = currentRolesRes.resolve();

    // run both in parallel then check access
    const decision$ = forkJoin(routeConfig$, currentRoles$).pipe(
      map(([routeConfig, currentRoles]) => {
        const routeConfigRec = this.getRouteDef(routeConfig, route);
        if (this.hasAccess(routeConfigRec, currentRoles)) {
          return true;
        } else {
          console.error('You do not have access to this page: ', route);
          this.router.navigate(['/errorHandler/' + 'NO_ROUTE_ACCESS/' + 'Route <' + route.url + '> requires role <' + routeConfigRec.requiredRoleId + '>' ]);
          return false;
        }
      }));

    return decision$;
  }

}
