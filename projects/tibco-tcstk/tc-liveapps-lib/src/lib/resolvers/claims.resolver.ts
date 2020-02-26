import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {Claim} from '@tibco-tcstk/tc-core-lib';
import {map, mergeMap, take} from 'rxjs/operators';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';

@Injectable()
export class ClaimsResolver implements Resolve<Observable<Claim>> {

  constructor(public appDefinitionService: TcAppDefinitionService) {}

  resolve(): Observable<Claim> {

    // note claims will be cached at http level
    // logout required to update them anyway
    return this.appDefinitionService.claims$.pipe(
      take(1)
    );
  }

}
