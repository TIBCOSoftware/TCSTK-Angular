import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, forkJoin, of } from 'rxjs';
import {
    TcSharedStateService, TcGeneralConfigService, TcCoreCommonFunctions, UiAppIdConfig,
} from '@tibco-tcstk/tc-core-lib';
import { map, switchMap, mergeMap, flatMap } from 'rxjs/operators';
import { RouteAccessControlConfig } from '../models/tc-groups-data';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Location } from '@angular/common';
import { RoleActiveResolver } from './role-active.resolver';
import { TcAccessControlService } from '../services/tc-access-control.service';
import { LiveAppsService } from '../services/live-apps.service';
import { TcRolesService } from '../services/tc-roles-service.ts.service';

@Injectable()
export class AccessControlConfigurationResolver implements Resolve<Observable<RouteAccessControlConfig>> {

    DEFAULT_CONFIG_URL = 'assets/config/routeAccessControl.json';
    APP_ID_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/uiAppId.json');

    private sandboxId: number;
    public defaultAccessControlConfig: RouteAccessControlConfig;
    private uiAppId: string;

    constructor(
        private location: Location,
        private http: HttpClient,
        private accessControlService: TcAccessControlService
    ) { }

    // can be used to load defaultAppConfig from a JSON config
    private getDefaultAppConfig = () => {
        return this.http.get(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, this.DEFAULT_CONFIG_URL));
    }

    // loads uiAppId from json file in assets (appId.json)
    private getAppId = (): Observable<UiAppIdConfig> => {
        const headers = new HttpHeaders().set('cacheResponse', 'true');
        return this.http.get(this.APP_ID_URL, { headers: headers }).pipe(
            map(uiAppId => {
                const uiAppIdConfig = new UiAppIdConfig().deserialize(uiAppId);
                this.uiAppId = uiAppIdConfig.uiAppId;
                return uiAppIdConfig;
            }
            )
        );
    }

    resolve(): Observable<RouteAccessControlConfig> {
        const accessConfig$ = this.getAppId().pipe(
            switchMap(uiAppId => this.accessControlService.getAccessControlConfig(uiAppId.uiAppId, true, false)
                .pipe(
                    mergeMap(
                        accessControlConfig => {
                            if (accessControlConfig === undefined) {
                                return this.getDefaultAppConfig().pipe(
                                    flatMap(config => {
                                        this.defaultAccessControlConfig = new RouteAccessControlConfig().deserialize(config);
                                        this.defaultAccessControlConfig.uiAppId = this.uiAppId;
                                        return this.accessControlService.createLAccessControlConfig(
                                            this.sandboxId,
                                            this.uiAppId,
                                            this.defaultAccessControlConfig)
                                            .pipe(
                                                flatMap(
                                                    result => {
                                                        const newAppConfig = this.defaultAccessControlConfig;
                                                        newAppConfig.id = result;
                                                        return this.accessControlService.updateAccessControlConfig(
                                                            this.sandboxId,
                                                            this.uiAppId,
                                                            newAppConfig,
                                                            result).pipe(
                                                                flatMap(
                                                                    // trigger a read to flush the cache since we changed it
                                                                    updatedConf => {
                                                                        return this.accessControlService.getAccessControlConfig(this.uiAppId, true, true).pipe(
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
                                return of(accessControlConfig);
                            }
                        }
                    )
                )
            )
        )
        return accessConfig$;
    }

}
