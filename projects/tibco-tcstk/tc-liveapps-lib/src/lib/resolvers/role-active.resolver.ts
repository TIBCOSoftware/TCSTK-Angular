import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import { LiveAppsService } from '../services/live-apps.service';
import { GeneralConfigResolver, RoleAttribute, TcGeneralConfigService, TcSharedStateService } from '@tibco-tcstk/tc-core-lib';
import { flatMap, map} from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ClaimsResolver } from './claims.resolver';
import { TcRolesService } from '../services/tc-roles-service.ts.service';

@Injectable()
export class RoleActiveResolver implements Resolve<Observable<RoleAttribute>> {

    constructor(
        private rolesService: TcRolesService, 
        private liveAppsService: LiveAppsService, 
        private tcSharedStateService: TcSharedStateService,
        private generalConfigService: TcGeneralConfigService, 
        private httpClient: HttpClient,
        private location: Location,
        private router: Router) {
    }

    resolve(): Observable<RoleAttribute> {

        const currentRole = this.rolesService.getCurrentRole();

        if (currentRole == undefined){
            let generalConfigResolver = new GeneralConfigResolver(this.tcSharedStateService, this.generalConfigService, this.httpClient, this.location, this.router);
            const claimResolver$ = new ClaimsResolver(this.liveAppsService);
            return claimResolver$.resolve().pipe(
                flatMap(claim => {
                    const sandboxId = claim.primaryProductionSandbox.id;
                    generalConfigResolver.setSandbox(Number(sandboxId));

                    return generalConfigResolver.resolve().pipe(
                        map(generalConfig => {
                            const highestRole = generalConfig.roles.reduce(function (prev, current) {
                                return (prev.priority > current.priority) ? prev : current
                            });
                            this.rolesService.setCurrentRole(highestRole);
                            return highestRole;                            
                        })
                    );
                })
            );
         }else {
            return of(currentRole);            
        }
    }
}
