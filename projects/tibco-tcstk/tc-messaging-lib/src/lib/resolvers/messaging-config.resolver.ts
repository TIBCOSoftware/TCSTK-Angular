/* Used to resolve contents of messaging config file */

/* This resolver will try and read the config from shared state
 * If a shared state entry does NOT exist it will use the defaults from a config file
 * If the config does not exist it will use DEFAULT_CONFIG
 */

import { Injectable } from '@angular/core';
import {Resolve, Router} from '@angular/router';
import {Observable, of, throwError} from 'rxjs';
import {catchError, flatMap, map, mergeMap, switchMap} from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '@angular/common';
import {EFTLConfigService} from '../services/e-ftl-config.service';
import {MessagingConfig} from '../models/messaging-config';
import {TcCoreCommonFunctions, TcSharedStateService, UiAppIdConfig} from '@tibco-tcstk/tc-core-lib';

@Injectable()
export class MessagingConfigResolver implements Resolve<Observable<MessagingConfig>> {

  DEFAULT_CONFIG_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/messagingConfig.json');
  APP_ID_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/uiAppId.json');
  DEFAULT_CONFIG = new MessagingConfig().deserialize({ connections: [] });

  private uiAppId: string;

  // tslint:disable-next-line:max-line-length
  constructor(private tcSharedState: TcSharedStateService, private messagingConfigService: EFTLConfigService, private http: HttpClient, private location: Location, private router: Router) {}

  // can be used to load defaultAppConfig from a JSON config
  private getDefaultAppConfigFile = () => {
    return this.http.get(this.DEFAULT_CONFIG_URL, { withCredentials: true }).pipe(
      map((conf: MessagingConfig) => {
        let id = 0;
        conf.connections.forEach(con => {
          con.id = id.toString();
          id++;
        });
        return conf;
      })
    );
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

  resolve(): Observable<MessagingConfig> {
    const appConfig = this.getAppId().pipe(
      switchMap(uiAppId => this.messagingConfigService.getMessagingConfig(uiAppId.uiAppId, true, false)
      .pipe(
        mergeMap(
          messagingConfig => {
            if (messagingConfig !== undefined) {
              return of(messagingConfig);
            } else {
              return this.getDefaultAppConfigFile().pipe(
                map(fileConfig => {
                  return new MessagingConfig().deserialize(fileConfig);
                }),
                catchError(err => {
                  if (err.status === 404) {
                    console.warn('eFTL Resolver: No config file, using defaults');
                    return of(this.DEFAULT_CONFIG);
                  } else {
                    throwError(err);
                  }
                })
              );
             }
          }
        )
      )
      )
    )
    return appConfig;
  }

}
