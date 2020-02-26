// This guard is to check whether the user has appropriate role to access a route based on config settings

import { Injectable } from '@angular/core';
import {CanActivate, ActivatedRouteSnapshot, RouterStateSnapshot, ActivatedRoute, Router} from '@angular/router';
import { LiveAppsService } from '../services/live-apps.service';
import { HttpClient } from '@angular/common/http';
import { map } from 'rxjs/operators';
import { forkJoin, Observable } from 'rxjs';
import { TcCoreCommonFunctions, TcGeneralConfigService, TcSharedStateService } from '@tibco-tcstk/tc-core-lib';
import { Location } from '@angular/common';
import { TcRolesService } from '../services/tc-roles-service.ts.service';
import { TcAccessControlService } from '../services/tc-access-control.service';
import { AccessControlConfigurationResolver } from '../resolvers/accessControlConfiguration.resolver';
import { AccessResolver } from '../resolvers/access.resolver';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';

@Injectable()
export class RoleGuard implements CanActivate {

    DEFAULT_CONFIG_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/routeAccessControl.json');

    constructor(
        private liveapps: LiveAppsService,
        private rolesService: TcRolesService,
        private http: HttpClient,
        private location: Location,
        private route: ActivatedRoute,
        private sharedStateService: TcSharedStateService,
        private generalConfigService: TcGeneralConfigService,
        private accessControlService: TcAccessControlService,
        private appDefinitionService: TcAppDefinitionService,
        private router: Router
    ) {}

    canActivate(route: ActivatedRouteSnapshot, state: RouterStateSnapshot): Observable<boolean> {

        let guardRoute = '';
        route.pathFromRoot.map(element => {
            if (element.url.length === 1) {
                guardRoute += '/' + element.url[0];
            }
        })

        // we will need the active user role
        const activeResolver$ = new AccessResolver(this.location, this.http, this.accessControlService, this.rolesService, this.liveapps, this.appDefinitionService, this.route, this.sharedStateService, this.generalConfigService, this.router).resolve();

        // access control configuration to check current URL is on allowedRoutes
        const accessControlConfig$ = new AccessControlConfigurationResolver(this.location, this.http, this.accessControlService).resolve();

        // run both in parallel then check access
        return forkJoin(activeResolver$, accessControlConfig$).pipe(
            map(([activeResolver, accessControlConfig]) => {

                // if guardRoute is not in allowedRoutes then OK
                if (accessControlConfig.allowedRoutes.indexOf(guardRoute) === -1) {
                    return true;
                }

                // Check guardRoute in active user role routes
                if (activeResolver.routes.indexOf(guardRoute) > -1){
                    return true;
                } else {
                    return false;
                }
            })
        );
    }

}
