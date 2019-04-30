
import { Injectable } from '@angular/core';
import { Resolve, ActivatedRouteSnapshot } from '@angular/router';
import { forkJoin, Observable, of } from 'rxjs';
import { LiveAppsService } from '../services/live-apps.service';
import { Claim, GeneralConfigResolver, RoleAttribute, TcGeneralConfigService, TcSharedStateService } from '@tibco-tcstk/tc-core-lib';
import { flatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { ClaimsResolver } from './claims.resolver';
import { CaseInfo } from '../models/liveappsdata';

@Injectable()
export class CaseDataResolver implements Resolve<Observable<CaseInfo>> {

    constructor(private liveapps: LiveAppsService) {
    }

    resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<CaseInfo> {

        const claims$ = this.liveapps.getClaims()
            .pipe(
                map(claim => {
                    claim.sandboxes.forEach(sandbox => {
                        if (sandbox.type === 'Production') {
                            claim.primaryProductionSandbox = sandbox;
                        }
                    });
                    return claim;
                })
            );

        return claims$.pipe(
            switchMap(claiminfo => {
                return this.liveapps.getCase(routeSnapshot.params.caseRef, +claiminfo.primaryProductionSandbox.id, routeSnapshot.params.appId, routeSnapshot.params.typeId)
                    .pipe(
                        map(caseInfo => {
                            return caseInfo;
                        })
                    );
            })
        );
    }

}
