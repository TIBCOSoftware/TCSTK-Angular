import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import {UiAppConfig} from '../models/tc-app-config';
import {map, mergeMap} from 'rxjs/operators';
import {TcSharedStateService} from '../services/tc-shared-state.service';

@Injectable()
export class ConfigResolver implements Resolve<Observable<UiAppConfig>> {

  private sandboxId: number;
  // todo: Move to JSON file?
  private defaultAppConfig = new UiAppConfig().deserialize({
    id: undefined,
    userId: '256',
    applicationId: '1742',
    typeId: '1',
    uiAppId: 'testappjs',
    caseIconsFolderId: 'ServiceRequest_Icons',
    caseTypeLabel: 'Partner Request'
  });

  constructor(private tcSharedState: TcSharedStateService) {}

  public setSandbox = (sandboxId: number) => {
    this.sandboxId = sandboxId;
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<UiAppConfig> {

    // todo: get uiAppId - where from?

    const appConfig = this.tcSharedState.getUiAppConfig('testappjs', true, false)
      .pipe(
        mergeMap(
          uiAppConfig => {
            if (uiAppConfig === undefined) {
              return this.tcSharedState.createUiAppConfig(
                this.defaultAppConfig.sandboxId,
                this.defaultAppConfig,
                this.defaultAppConfig.uiAppId)
                .pipe(
                  map(
                    result => {
                      const newAppConfig = this.defaultAppConfig;
                      newAppConfig.id = result;
                      newAppConfig.sandboxId = this.sandboxId;
                      this.tcSharedState.updateUiAppConfig(
                        newAppConfig.sandboxId,
                        newAppConfig,
                        newAppConfig.uiAppId,
                        result).subscribe(
                          // trigger a read to flush the cache since we changed it
                          updatedConf => {
                            this.tcSharedState.getUiAppConfig('testappjs', true, true).subscribe();
                          }
                      );
                      return newAppConfig;
                    })
                );
             } else {
              return of(uiAppConfig);
            }
          }
        )
      );

    return appConfig;
  }

}
