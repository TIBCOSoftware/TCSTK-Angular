import {Injectable} from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable, of} from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {Groups} from '../models/tc-groups-data';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';

@Injectable()
export class GroupsResolver implements Resolve<Observable<Groups>> {

  constructor(public liveapps: LiveAppsService, private appDefinitionService: TcAppDefinitionService) {
  }

  resolve(): Observable<Groups> {
    const claims = this.appDefinitionService.claims;
    return of(new Groups().deserialize( { groups: this.appDefinitionService.usersGroups }));
  }
}
