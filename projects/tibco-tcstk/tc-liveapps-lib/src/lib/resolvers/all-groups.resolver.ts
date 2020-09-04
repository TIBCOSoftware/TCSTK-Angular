import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {Groups} from '../models/tc-groups-data';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';

@Injectable()
export class AllGroupsResolver implements Resolve<Observable<Groups>> {

  constructor(private liveapps: LiveAppsService, private appDefinitionService: TcAppDefinitionService) {
  }

  resolve(): Observable<Groups> {
    const claims = this.appDefinitionService.claims;
    return of(new Groups().deserialize( { groups: this.appDefinitionService.groups }));
  }
}
