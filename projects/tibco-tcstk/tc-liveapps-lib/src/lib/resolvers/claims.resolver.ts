import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {Claim} from '@TIBCOSoftware/tc-core-lib';
import {map, mergeMap, take} from 'rxjs/operators';
import {TcAppDefinitionService} from '../services/tc-app-definition.service';

@Injectable()
export class ClaimsResolver implements Resolve<Observable<Claim>> {

  constructor(public appDefinitionService: TcAppDefinitionService) {}

  resolve(): Observable<Claim> {

    return of(this.appDefinitionService.claims);
  }

}
