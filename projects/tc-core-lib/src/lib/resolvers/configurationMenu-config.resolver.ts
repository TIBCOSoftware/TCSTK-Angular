import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable } from 'rxjs';
import { UiAppIdConfig } from '../models/tc-app-config';
import { map, flatMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { ConfigurationMenuConfig } from '../models/tc-configurationMenu-config';
import { Location } from '@angular/common';

@Injectable()
export class ConfigurationMenuConfigResolver implements Resolve<Observable<ConfigurationMenuConfig>> {

    DEFAULT_CONFIG_URL = 'assets/config/<uiAppId>_configurationMenuConfig.json';
    APP_ID_URL = this.location.prepareExternalUrl('assets/config/uiAppId.json');

    constructor(private http: HttpClient, private location: Location) { }

    // can be used to load defaultAppConfig from a JSON config
    private getConfigurationMenuConfig = (uiAppId: string) => {
        return this.http.get(this.location.prepareExternalUrl(this.DEFAULT_CONFIG_URL.replace('<uiAppId>', uiAppId)));
    }

    // loads uiAppId from json file in assets (appId.json)
    private getAppId = (): Observable<UiAppIdConfig> => {
        return this.http.get(this.APP_ID_URL).pipe(
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
