import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import {UiAppConfig, UiAppIdConfig} from '../models/tc-app-config';
import {flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {TcSharedStateService} from '../services/tc-shared-state.service';
import {HttpClient} from '@angular/common/http';

@Injectable()
export class ConfigResolver implements Resolve<Observable<UiAppConfig>> {

  DEFAULT_CONFIG_URL = '/assets/config/defaultAppConfig.json';
  APP_ID_URL = '/assets/config/appId.json';

  private sandboxId: number;
  public defaultAppConfig: UiAppConfig;
  private uiAppId: string;

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

  // loads uiAppId from json file in assets (appId.json)
  private getAppId = (): Observable<UiAppIdConfig> => {
    return this.http.get(this.APP_ID_URL).pipe(
      map(uiAppId => {
        const uiAppIdConfig = new UiAppIdConfig().deserialize(uiAppId);
        this.uiAppId = uiAppIdConfig.uiAppId;
        return uiAppIdConfig;
        }
      )
    );
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<UiAppConfig> {
    const appConfig = this.getAppId().pipe(
      switchMap(uiAppId => this.tcSharedState.getUiAppConfig(uiAppId.uiAppId, true, false)
      .pipe(
        mergeMap(
          uiAppConfig => {
            if (uiAppConfig === undefined) {
              return this.getDefaultAppConfig().pipe(
                flatMap(config => {
                  this.defaultAppConfig = new UiAppConfig().deserialize(config);
                  this.defaultAppConfig.uiAppId = this.uiAppId;
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
                              this.tcSharedState.getUiAppConfig(this.uiAppId, true, true).subscribe();
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
      )
      )
    )
    return appConfig;
  }

}
