import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import {LiveAppsService} from '../services/live-apps.service';
import {UiAppConfig} from '../models/liveappsdata';
import {map, mergeMap} from 'rxjs/operators';

@Injectable()
export class ConfigResolver implements Resolve<Observable<UiAppConfig>> {

  private defaultAppConfig = new UiAppConfig().deserialize({
    id: undefined,
    userId: '256',
    sandboxId: 31,
    applicationId: '1742',
    typeId: '1',
    uiAppId: 'testappjs',
    caseIconsFolderId: 'ServiceRequest_Icons',
    caseTypeLabel: 'Partner Request'
  });

  constructor(public liveapps: LiveAppsService) {}

  resolve(): Observable<UiAppConfig> {

    const appConfig = this.liveapps.getUiAppConfig('testappjs', true, false)
      .pipe(
        mergeMap(
          uiAppConfig => {
            if (uiAppConfig === undefined) {
              return this.liveapps.createUiAppConfig(
                this.defaultAppConfig.sandboxId,
                this.defaultAppConfig,
                this.defaultAppConfig.uiAppId)
                .pipe(
                  map(
                    result => {
                      const newAppConfig = this.defaultAppConfig;
                      newAppConfig.id = result;
                      this.liveapps.updateUiAppConfig(
                        newAppConfig.sandboxId,
                        newAppConfig,
                        newAppConfig.uiAppId,
                        result).subscribe(
                          // trigger a read to flush the cache since we changed it
                          updatedConf => {
                            this.liveapps.getUiAppConfig('testappjs', true, true).subscribe();
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
