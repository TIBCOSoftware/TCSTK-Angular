import { Injectable } from '@angular/core';
import {Resolve, ActivatedRoute, Router} from '@angular/router';
import { Observable, forkJoin } from 'rxjs';
import { RouteAccessControlConfigurationElement } from '../models/tc-groups-data';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { TcAccessControlService } from '../services/tc-access-control.service';
import { AccessControlConfigurationResolver } from './accessControlConfiguration.resolver';
import { map } from 'rxjs/operators';
import { TcRolesService } from '../services/tc-roles-service.ts.service';
import { TcSharedStateService, TcGeneralConfigService } from '@tibcosoftware/tc-core-lib';
import { LiveAppsService } from '../services/live-apps.service';
import { RoleActiveResolver } from './role-active.resolver';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';

@Injectable()
export class AccessResolver implements Resolve<Observable<RouteAccessControlConfigurationElement>> {

    constructor(
        private location: Location,
        private http: HttpClient,
        private accessControlService: TcAccessControlService,
        private rolesService: TcRolesService,
        private liveapps: LiveAppsService,
        private appDefinitionService: TcAppDefinitionService,
        private route: ActivatedRoute,
        private sharedStateService: TcSharedStateService,
        private generalConfigService: TcGeneralConfigService,
        private router: Router
    ) { }

    resolve(): Observable<RouteAccessControlConfigurationElement> {

        const accessControlConfiguration$ = new AccessControlConfigurationResolver(this.location, this.http, this.accessControlService).resolve();

        // we will need the active user role
        const activeRoleRes = new RoleActiveResolver(this.rolesService, this.liveapps, this.sharedStateService, this.generalConfigService, this.appDefinitionService, this.http, this.location, this.router);
        const activeRole$ = activeRoleRes.resolve();

        // run both in parallel then check access
        const accessControl$ = forkJoin(accessControlConfiguration$, activeRole$).pipe(
            map(([accessConfig, activeRole]) => {
                return accessConfig.configuration.find(element => element.roleId === activeRole.id);
            })
        );

        return accessControl$;
    }

}
