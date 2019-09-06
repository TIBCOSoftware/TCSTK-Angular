/* Used to resolve contents of general config file */

/* This resolver will try and read the config from shared state
 * If a shared state entry does NOT exist it will use the defaults from a config file
 * Then update shared state with those contents
 */

import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import { Observable, of } from 'rxjs';
import {UiAppConfig, UiAppIdConfig} from '../models/tc-app-config';
import {catchError, flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
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

  // tslint:disable-next-line:max-line-length
  constructor(private tcSharedState: TcSharedStateService, private generalConfigService: TcGeneralConfigService, private http: HttpClient, private location: Location, private router: Router) {}
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
                        }),
                        catchError(err => {
                          console.error(err);
                          // tslint:disable-next-line:max-line-length
                          let errMessage;
                          const errCode = 'NOT_ADMIN_INIT';
                          if (err.error && err.error.errorMsg) {
                            errMessage = err.error.errorMsg;
                            // tslint:disable-next-line:max-line-length
                            console.error('NOT_ADMIN_INIT: Unable to create new shared state entry. Login as a user with Admin Group access first to initialize shared state: ');
                          } else {
                            errMessage = 'Unknown Error - check console logs';
                            console.error('Unknown error creating shared state');
                          }
                          this.router.navigate(['/errorHandler/' + errCode + '/' + errMessage]);
                          return of(err);
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
