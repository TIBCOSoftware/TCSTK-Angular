import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve, Router} from '@angular/router';
import {forkJoin, Observable, of} from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {Claim, GeneralConfigResolver, RoleAttribute, TcGeneralConfigService, TcSharedStateService} from '@tibco-tcstk/tc-core-lib';
import {flatMap, map, mergeMap, switchMap, take} from 'rxjs/operators';
import {Group, Groups, Roles} from '../models/tc-groups-data';
import {HttpClient} from '@angular/common/http';
import {TcCaseCardConfigService} from '../services/tc-case-card-config.service';
import {Location} from '@angular/common';
import {ClaimsResolver} from './claims.resolver';
import {group} from '@angular/animations';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';

@Injectable()
export class AllRolesResolver implements Resolve<Observable<Roles>> {

  constructor(private sharedStateService: TcSharedStateService, private generalConfigService: TcGeneralConfigService, private appDefinitionService: TcAppDefinitionService, private http: HttpClient, private liveapps: LiveAppsService, private location: Location, private router: Router) {
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<Roles> {
    const sandboxId = this.appDefinitionService.sandboxId;

    const generalConfigResolver = new GeneralConfigResolver(this.sharedStateService, this.generalConfigService, this.http, this.location, this.router);
    generalConfigResolver.setSandbox(sandboxId);
    return generalConfigResolver.resolve().pipe(
      map(generalConfig => {
        return new Roles().deserialize({roles: generalConfig.roles});
      })
    );
  }
}
