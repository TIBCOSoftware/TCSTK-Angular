import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {Claim} from 'tc-core-lib';
import {flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {Groups} from '../models/tc-groups-data';

@Injectable()
export class GroupsResolver implements Resolve<Observable<Groups>> {

  constructor(public liveapps: LiveAppsService) {
  }

  resolve(): Observable<Groups> {

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
          return this.liveapps.getGroupMemberships(+claiminfo.primaryProductionSandbox.id, claiminfo.id, 1000, true).pipe(
            map(groupinfo => {
              return new Groups().deserialize(groupinfo);
            })
          );
        }
      )
    );
  }
}
