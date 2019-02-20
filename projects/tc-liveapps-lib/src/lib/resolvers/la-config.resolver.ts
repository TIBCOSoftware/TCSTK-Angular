// this resolver wraps claims and appConfig resolvers because we need claims to get and set AppConfig to default values.
// we actually cache the claims call using a HTTP interceptor to avoid making multiple REST calls
// note: claims only changes on logout/login so no point making lots of calls to claims

import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import {ConfigResolver, UiAppConfig} from 'tc-core-lib';
import {flatMap, map, mergeMap} from 'rxjs/operators';
import {TcSharedStateService} from 'tc-core-lib';
import {Claim, ClaimsResolver, LiveAppsService} from 'tc-liveapps-lib';

@Injectable()
export class LaConfigResolver implements Resolve<Observable<UiAppConfig>> {

  constructor(private tcSharedState: TcSharedStateService, private liveAppsService: LiveAppsService) {}

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<UiAppConfig> {

    const configResolver = new ConfigResolver(this.tcSharedState);
    const claimResolver = new ClaimsResolver(this.liveAppsService).resolve().pipe(
      flatMap(value => {
          const sandboxId = value.primaryProductionSandbox.id;
          configResolver.setSandbox(Number(sandboxId));
          const config = configResolver.resolve(routeSnapshot);
          return config;
        }
        )
    );

    return claimResolver;
  }

}
