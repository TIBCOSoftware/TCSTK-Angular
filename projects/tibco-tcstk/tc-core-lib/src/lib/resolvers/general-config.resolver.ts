import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import {UiAppConfig, UiAppIdConfig} from '../models/tc-app-config';
import {flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {TcSharedStateService} from '../services/tc-shared-state.service';
import {HttpClient} from '@angular/common/http';
import {TcGeneralConfigService} from '../services/tc-general-config.service';
import {GeneralConfig} from '../models/tc-general-config';
import {Location} from '@angular/common';
import {TcCoreCommonFunctions} from '../common/tc-core-common-functions';

@Injectable()
export class GeneralConfigResolver implements Resolve<Observable<GeneralConfig>> {

  DEFAULT_CONFIG_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/generalAppConfig.json');
  APP_ID_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/uiAppId.json');

  private sandboxId: number;
  public defaultAppConfig: GeneralConfig;
  private uiAppId: string;

  constructor(private tcSharedState: TcSharedStateService, private generalConfigService: TcGeneralConfigService, private http: HttpClient, private location: Location) {}
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

  resolve(): Observable<GeneralConfig> {
    const appConfig = this.getAppId().pipe(
      switchMap(uiAppId => this.generalConfigService.getGeneralConfig(uiAppId.uiAppId, true, false)
      .pipe(
        mergeMap(
          generalConfig => {
            if (generalConfig === undefined) {
              return this.getDefaultAppConfig().pipe(
                flatMap(config => {
                  this.defaultAppConfig = new GeneralConfig().deserialize(config);
                  this.defaultAppConfig.uiAppId = this.uiAppId;
                  return this.generalConfigService.createGeneralConfig(
                    this.sandboxId,
                    this.defaultAppConfig.uiAppId,
                    this.defaultAppConfig)
                    .pipe(
                      flatMap(
                        result => {
                          const newAppConfig = this.defaultAppConfig;
                          newAppConfig.id = result;
                          return this.generalConfigService.updateGeneralConfig(
                            this.sandboxId,
                            newAppConfig.uiAppId,
                            newAppConfig,
                            result).pipe(
                              flatMap(
                                // trigger a read to flush the cache since we changed it
                              updatedConf => {
                                  return this.generalConfigService.getGeneralConfig(this.uiAppId, true, true).pipe(
                                    map(
                                      cachedConfig => {
                                        return cachedConfig;
                                      }
                                    )
                                  );

                              }
                              )
                          );
                         // return newAppConfig;
                        })
                    );
                })
              );
             } else {
              return of(generalConfig);
            }
          }
        )
      )
      )
    )
    return appConfig;
  }

}
