import { Injectable } from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { Observable, of } from 'rxjs';
import {TcCoreCommonFunctions, UiAppConfig, UiAppIdConfig} from '@tibcosoftware/tc-core-lib';
import {flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {TcSharedStateService} from '@tibcosoftware/tc-core-lib';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {TcLiveAppsConfigService} from '../services/tc-live-apps-config.service';
import {LiveAppsConfig} from '../models/tc-liveapps-config';
import {TcCaseCardConfigService} from '../services/tc-case-card-config.service';
import {Location} from '@angular/common';

@Injectable()
export class LiveAppsConfigResolver implements Resolve<Observable<LiveAppsConfig>> {

  DEFAULT_CONFIG_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/liveAppsConfig.json');
  APP_ID_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/uiAppId.json');

  private sandboxId: number;
  public defaultAppConfig: LiveAppsConfig;
  private uiAppId: string;

  constructor(private tcSharedState: TcSharedStateService, private liveAppsConfigService: TcLiveAppsConfigService, private caseCardConfigService: TcCaseCardConfigService, private http: HttpClient, private location: Location) {}
  // note appConfigResolver will need sandboxId to create app config state record.
  // So we expect this to have been set by caller (done by tc-liveapps-lib/laConfigResolver).

  public setSandbox = (sandboxId: number) => {
    this.sandboxId = sandboxId;
  }

  // can be used to load defaultAppConfig from a JSON config
  private getDefaultAppConfig = () => {
    return this.http.get(this.DEFAULT_CONFIG_URL, { withCredentials: true });
  }

  // loads uiAppId from json file in assets (appId.json)
  private getAppId = (): Observable<UiAppIdConfig> => {
    const headers = new HttpHeaders().set('cacheResponse', 'true');
    return this.http.get(this.APP_ID_URL, { headers: headers, withCredentials: true }).pipe(
      map(uiAppId => {
          const uiAppIdConfig = new UiAppIdConfig().deserialize(uiAppId);
          this.uiAppId = uiAppIdConfig.uiAppId;
          return uiAppIdConfig;
        }
      )
    );
  }

  private triggerCardConfigFetch = (liveAppsConfig: LiveAppsConfig) => {
    // optimization: I want to avoid reading the card config when we display a large list of cards in the calling app
    // therefore we can trigger of a read of the card configs for each app in the config to ensure they are cached by
    // http interceptor
    const laConfig = new LiveAppsConfig().deserialize(liveAppsConfig);
    laConfig.applicationIds.forEach(appId => {
      this.caseCardConfigService.getCardConfig(this.uiAppId, appId, true, false).subscribe();
    });
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<LiveAppsConfig> {
    const appConfig = this.getAppId().pipe(
      switchMap(uiAppId => this.liveAppsConfigService.getLiveAppsConfig(uiAppId.uiAppId, true, false)
        .pipe(
          mergeMap(
            liveAppsConfig => {
              if (liveAppsConfig === undefined) {
                return this.getDefaultAppConfig().pipe(
                  flatMap(config => {
                    this.defaultAppConfig = new LiveAppsConfig().deserialize(config);
                    this.defaultAppConfig.caseIconsFolderId = this.uiAppId + '_Icons';
                    return this.liveAppsConfigService.createLiveAppsConfig(
                      this.sandboxId,
                      uiAppId.uiAppId,
                      this.defaultAppConfig)
                      .pipe(
                        flatMap(
                          result => {
                            const newAppConfig = this.defaultAppConfig;
                            newAppConfig.id = result;
                            this.triggerCardConfigFetch(newAppConfig);
                            return this.liveAppsConfigService.updateLiveAppsConfig(
                              this.sandboxId,
                              uiAppId.uiAppId,
                              newAppConfig,
                              result).pipe(
                              // trigger a read to flush the cache since we changed it
                              flatMap(updatedConf => {
                                return this.liveAppsConfigService.getLiveAppsConfig(this.uiAppId, true, true);
                              }
                              )
                            );
                          })
                      );
                  })
                );
              } else {
                this.triggerCardConfigFetch(liveAppsConfig);
                return of(liveAppsConfig);
              }
            }
          )
        )
      )
    )
    return appConfig;
  }

}
