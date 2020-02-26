import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { LiveAppsService } from '../services/live-apps.service';
import { RoleAttribute, TcGeneralConfigService, TcSharedStateService } from '@tibco-tcstk/tc-core-lib';
import { map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { TcRolesService } from '../services/tc-roles-service.ts.service';
import {RolesResolver} from './roles.resolver';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';

@Injectable()
export class RoleActiveResolver implements Resolve<Observable<RoleAttribute>> {

    constructor(
        private rolesService: TcRolesService,
        private liveAppsService: LiveAppsService,
        private tcSharedStateService: TcSharedStateService,
        private generalConfigService: TcGeneralConfigService,
        private appDefinitionService: TcAppDefinitionService,
        private httpClient: HttpClient,
        private location: Location,
        private router: Router) {
    }

    resolve(): Observable<RoleAttribute> {

        const currentRole = this.rolesService.getCurrentRole();

        if (currentRole === undefined) {
          const roleResolver$ = new RolesResolver(this.tcSharedStateService, this.generalConfigService, this.httpClient, this.liveAppsService, this.appDefinitionService, this.location, this.router);
          return roleResolver$.resolve().pipe(
                map(roles => {
                  const highestRole = roles.roles.reduce(function (prev, current) {
                    return (prev.priority > current.priority) ? prev : current;
                  });
                  this.rolesService.setCurrentRole(highestRole);
                  return highestRole;
                })
              );
         } else {
            return of(currentRole);
        }
    }
}
