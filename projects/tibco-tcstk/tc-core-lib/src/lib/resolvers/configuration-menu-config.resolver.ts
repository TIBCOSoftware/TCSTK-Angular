/* Used to resolve contents of configuration menu config file */

import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UiAppIdConfig } from '../models/tc-app-config';
import { map, flatMap } from 'rxjs/operators';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import { ConfigurationMenuConfig } from '../models/tc-configuration-menu-config';
import { Location } from '@angular/common';
import {TcCoreCommonFunctions} from '../common/tc-core-common-functions';

@Injectable()
export class ConfigurationMenuConfigResolver implements Resolve<Observable<ConfigurationMenuConfig>> {

    // DEFAULT_CONFIG_URL = 'assets/config/<uiAppId>/configurationMenuConfig.json';
    // JS: Changed since we will use different GIT repo for different templates from now on
    DEFAULT_CONFIG_URL = 'assets/config/configurationMenuConfig.json';
    APP_ID_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/uiAppId.json');

    constructor(private http: HttpClient, private location: Location) { }

    // can be used to load defaultAppConfig from a JSON config
    private getConfigurationMenuConfig = (uiAppId: string) => {
        return this.http.get(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, this.DEFAULT_CONFIG_URL.replace('<uiAppId>', uiAppId)));
    }

    // loads uiAppId from json file in assets (appId.json)
    private getAppId = (): Observable<UiAppIdConfig> => {
      const headers = new HttpHeaders().set('cacheResponse', 'true');
      return this.http.get(this.APP_ID_URL, { headers: headers }).pipe(
            map(uiAppId => {
                const uiAppIdConfig = new UiAppIdConfig().deserialize(uiAppId);
                return uiAppIdConfig;
            })
        );
    }

    resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<ConfigurationMenuConfig> {
        const configurationMenuConfig$ =
            this.getAppId().pipe(
                flatMap(uiAppId => {
                    return this.getConfigurationMenuConfig(uiAppId.uiAppId).pipe(
                        map(config => {
                            return new ConfigurationMenuConfig().deserialize(config);
                        })
                    );
                })
            )
        return configurationMenuConfig$;
    }

}
