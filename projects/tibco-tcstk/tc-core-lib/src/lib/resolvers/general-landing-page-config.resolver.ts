/* Used to resolve contents of landing page config file */

/* This resolver will try and read the config from shared state
 * If a shared state entry does NOT exist it will use the defaults from a config file
 * Then update shared state with those contents
 */

import { Injectable } from '@angular/core';
import { Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { UiAppIdConfig } from '../models/tc-app-config';
import { flatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { TcSharedStateService } from '../services/tc-shared-state.service';
import { HttpClient } from '@angular/common/http';
import { GeneralConfig } from '../models/tc-general-config';
import { Location } from '@angular/common';
import { TcCoreCommonFunctions } from '../common/tc-core-common-functions';
import { TcGeneralLandingPageConfigService } from '../services/tc-general-landing-page-config.service';
import { GeneralLandingPageConfig } from '../models/tc-general-landing-page-config';

@Injectable()
export class GeneralLandingPageConfigResolver implements Resolve<Observable<GeneralLandingPageConfig>> {

    DEFAULT_CONFIG_URL = 'assets/config/landingPages.json';
    APP_ID_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/uiAppId.json');

    private sandboxId: number;
    public defaultLandingPageConfig: GeneralLandingPageConfig;
    private uiAppId: string;

    constructor(
        private tcSharedState: TcSharedStateService,
        private generalLandingPageConfigService: TcGeneralLandingPageConfigService,
        private http: HttpClient,
        private location: Location) { }
    // note appConfigResolver will need sandboxId to create app config state record.
    // So we expect this to have been set by caller (done by tc-liveapps-lib/laConfigResolver).

    public setSandbox = (sandboxId: number) => {
        this.sandboxId = sandboxId;
    }

    // can be used to load defaultAppConfig from a JSON config
    private getDefaultAppConfig = () => {
        return this.http.get(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, this.DEFAULT_CONFIG_URL));
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

    resolve(): Observable<GeneralLandingPageConfig> {
        const appConfig = this.getAppId().pipe(
            switchMap(uiAppId => this.generalLandingPageConfigService.getGeneralLandingPageConfig(uiAppId.uiAppId, true, false)
                .pipe(
                    mergeMap(
                        generalConfig => {
                            if (generalConfig === undefined) {
                                return this.getDefaultAppConfig().pipe(
                                    flatMap(config => {
                                        this.defaultLandingPageConfig = new GeneralLandingPageConfig().deserialize(config);
                                        this.defaultLandingPageConfig.uiAppId = this.uiAppId;
                                        return this.generalLandingPageConfigService.createGeneralLandingPageConfig(
                                            this.sandboxId,
                                            this.uiAppId,
                                            this.defaultLandingPageConfig)
                                            .pipe(
                                                flatMap(
                                                    result => {
                                                        const newAppConfig = this.defaultLandingPageConfig;
                                                        newAppConfig.id = result;
                                                        return this.generalLandingPageConfigService.updateGeneralLandingPageConfig(
                                                            this.sandboxId,
                                                            this.uiAppId,
                                                            newAppConfig,
                                                            result).pipe(
                                                                flatMap(
                                                                    // trigger a read to flush the cache since we changed it
                                                                    updatedConf => {
                                                                        return this.generalLandingPageConfigService.getGeneralLandingPageConfig(this.uiAppId, true, true).pipe(
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
