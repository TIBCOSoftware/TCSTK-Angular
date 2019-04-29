import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {Claim, GeneralConfigResolver, RoleAttribute, TcGeneralConfigService, TcSharedStateService} from '@tibco-tcstk/tc-core-lib';
import {flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {Group, Groups, Roles} from '../models/tc-groups-data';
import {HttpClient} from '@angular/common/http';
import {TcCaseCardConfigService} from '../services/tc-case-card-config.service';
import {Location} from '@angular/common';
import {ClaimsResolver} from './claims.resolver';
import {group} from '@angular/animations';

@Injectable()
export class AllRolesResolver implements Resolve<Observable<Roles>> {

  constructor(private sharedStateService: TcSharedStateService, private generalConfigService: TcGeneralConfigService, private http: HttpClient, private liveapps: LiveAppsService, private location: Location) {
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<Roles> {

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

    const generalConfigResolver = new GeneralConfigResolver(this.sharedStateService, this.generalConfigService, this.http, this.location);

    return claims$.pipe(
      switchMap(claiminfo => {
          generalConfigResolver.setSandbox(Number(claiminfo.primaryProductionSandbox.id));
          const generalConfig$ = generalConfigResolver.resolve().pipe(
            map(generalConfig => {
              return new Roles().deserialize({ roles: generalConfig.roles });
            })
          );
          return generalConfig$;
        }
      )
    );

  }

}
