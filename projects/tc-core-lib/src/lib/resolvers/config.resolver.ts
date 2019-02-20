import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import {UiAppConfig} from '../models/tc-app-config';
import {flatMap, map, mergeMap} from 'rxjs/operators';
import {TcSharedStateService} from '../services/tc-shared-state.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConfigResolver implements Resolve<Observable<UiAppConfig>> {

  DEFAULT_CONFIG_URL = '/assets/config/defaultAppConfig.json';

  private sandboxId: number;
  public defaultAppConfig: UiAppConfig;

  constructor(private tcSharedState: TcSharedStateService, private http: HttpClient) {}
  // note appConfigResolver will need sandboxId to create app config state record.
  // So we expect this to have been set by caller (done by tc-liveapps-lib/laConfigResolver).

  public setSandbox = (sandboxId: number) => {
    this.sandboxId = sandboxId;
  }

  // can be used to load defaultAppConfig from a JSON config
  private getDefaultAppConfig = () => {
    return this.http.get(this.DEFAULT_CONFIG_URL);
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<UiAppConfig> {

    // todo: get uiAppId - where from?

    const appConfig = this.tcSharedState.getUiAppConfig('testappjs', true, false)
      .pipe(
        mergeMap(
          uiAppConfig => {
            if (uiAppConfig === undefined) {

              return this.getDefaultAppConfig().pipe(
                flatMap(config => {
                  this.defaultAppConfig = new UiAppConfig().deserialize(config);
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
