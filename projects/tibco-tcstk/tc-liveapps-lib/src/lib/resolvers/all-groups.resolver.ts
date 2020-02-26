import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {Claim} from '@tibco-tcstk/tc-core-lib';
import {flatMap, map, mergeMap, switchMap, take} from 'rxjs/operators';
import {Groups} from '../models/tc-groups-data';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';

@Injectable()
export class AllGroupsResolver implements Resolve<Observable<Groups>> {

  constructor(private liveapps: LiveAppsService, private appDefinitionService: TcAppDefinitionService) {
  }

  resolve(): Observable<Groups> {

    const claims$ = this.appDefinitionService.claims$.pipe(
      take(1)
    );

    return claims$.pipe(
      switchMap(claiminfo => {
          return this.liveapps.getGroups(+claiminfo.primaryProductionSandbox.id, 1000, true).pipe(
            map(groupinfo => {
              return new Groups().deserialize(groupinfo);
            })
          );
        }
      )
    );
  }
}
