import {Injectable} from '@angular/core';
import {Resolve, ActivatedRouteSnapshot} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {Claim, GeneralConfigResolver, RoleAttribute, TcGeneralConfigService, TcSharedStateService} from '@tibco-tcstk/tc-core-lib';
import {flatMap, map, mergeMap, switchMap, take} from 'rxjs/operators';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {ClaimsResolver} from './claims.resolver';
import {CaseInfo} from '../models/liveappsdata';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';

@Injectable()
export class CaseDataResolver implements Resolve<Observable<CaseInfo>> {

  constructor(private liveapps: LiveAppsService, private appDefinitionService: TcAppDefinitionService) {
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<CaseInfo> {

    const sandboxId = this.appDefinitionService.sandboxId;
    return this.liveapps.getCase(routeSnapshot.params.caseRef, Number(sandboxId), routeSnapshot.params.appId, routeSnapshot.params.typeId)
      .pipe(
        map(caseInfo => {
          return caseInfo;
        })
      );
  }
}
