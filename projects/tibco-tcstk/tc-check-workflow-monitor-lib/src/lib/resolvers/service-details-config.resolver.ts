import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { flatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';

import { Location } from '@angular/common';
import {TcCoreCommonFunctions, TcSharedStateService, UiAppIdConfig} from '@tibco-tcstk/tc-core-lib';
import {ServiceDetailsConfig} from '../models/service-details';
import {CwmSettingsConfigServiceService} from '../services/cwm-settings-config-service.service';

@Injectable()
export class ServiceDetailsConfigResolver implements Resolve<Observable<ServiceDetailsConfig>> {

    DEFAULT_CONFIG_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/cwmServiceDetailsConfig.json');
    APP_ID_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/uiAppId.json');

    private sandboxId: number;
    public defaultServiceDetailsConfig: ServiceDetailsConfig;
    private uiAppId: string;

    constructor(
        private tcSharedState: TcSharedStateService,
        private cwmSettingsConfigServiceService: CwmSettingsConfigServiceService,
        private http: HttpClient,
        private location: Location
    ) {}

    public setSandbox = (sandboxId: number) => {
        this.sandboxId = sandboxId;
    }

    // can be used to load defaultSpotfireConfig from a JSON config
    private getDefaultSpotfireConfig = () => {
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

    resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<ServiceDetailsConfig> {
        const serviceDetailsConfig = this.getAppId().pipe(
            switchMap(uiAppId => this.cwmSettingsConfigServiceService.getServiceSettingConfig(uiAppId.uiAppId, false, false)
            .pipe(
                mergeMap(
                    serviceDetailsConfig => {
                        if (serviceDetailsConfig === undefined) {
                            return this.getDefaultSpotfireConfig().pipe(
                                flatMap(config => {
                                this.defaultServiceDetailsConfig = new ServiceDetailsConfig().deserialize(config);
                                this.defaultServiceDetailsConfig.uiAppId = this.uiAppId;
                                return this.cwmSettingsConfigServiceService.createServiceSettingConfig(this.sandboxId, this.defaultServiceDetailsConfig.uiAppId, this.defaultServiceDetailsConfig)
                                    .pipe(
                                    map(
                                        result => {
                                        const newsServiceDetailsConfig = this.defaultServiceDetailsConfig;
                                        newsServiceDetailsConfig.id = result;
                                        this.cwmSettingsConfigServiceService.updateServiceSettingConfig(this.sandboxId, newsServiceDetailsConfig.uiAppId, newsServiceDetailsConfig, result).
                                        subscribe(
                                            // trigger a read to flush the cache since we changed it
                                            updatedConf => {
                                                this.cwmSettingsConfigServiceService.getServiceSettingConfig(this.uiAppId, true, true).subscribe();
                                            }
                                        );
                                        return newsServiceDetailsConfig;
                                        })
                                    );
                                })
                            );
                        } else {
                            return of(serviceDetailsConfig);
                        }
                    }
                )
            )
            )   
        )
        return serviceDetailsConfig;
    }

}
