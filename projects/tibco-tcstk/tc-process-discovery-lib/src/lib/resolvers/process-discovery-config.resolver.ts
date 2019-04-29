import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { flatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { UiAppIdConfig, TcCoreCommonFunctions } from '@tibco-tcstk/tc-core-lib';
import { ProcessDiscoveryConfig } from '../models/tc-process-discovery-config';
import { PdProcessDiscoveryConfigService } from '../services/pd-process-discovery-config.service';

@Injectable()
export class ProcessDiscoveryConfigResolver implements Resolve<Observable<ProcessDiscoveryConfig>> {

    DEFAULT_CONFIG_URL = 'assets/config/<uiAppId>/processDiscoveryConfig.json';
    APP_ID_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/uiAppId.json');

    private sandboxId: number;
    public defaultProcessDiscoveryConfig: ProcessDiscoveryConfig;
    private uiAppId: string;

    constructor(
        private processDiscoveryConfigService: PdProcessDiscoveryConfigService, 
        private http: HttpClient, 
        private location: Location
    ) {}

    public setSandbox = (sandboxId: number) => {
        this.sandboxId = sandboxId;
    }

    // can be used to load defaultProcessDiscoveryConfig from a JSON config
    private getDefaultProcessDiscoveryConfig = (uiAppId: string) => {
        return this.http.get(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, this.DEFAULT_CONFIG_URL.replace('<uiAppId>', uiAppId)));
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

    resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<ProcessDiscoveryConfig> {
        const processDiscoveryConfig = this.getAppId().pipe(
            switchMap(uiAppId => this.processDiscoveryConfigService.getProcessDiscoveryConfig(uiAppId.uiAppId, false, false)
            .pipe(
                mergeMap(
                    processDiscoveryConfig => {
                        if (processDiscoveryConfig === undefined) {
                            return this.getDefaultProcessDiscoveryConfig(uiAppId.uiAppId).pipe(
                                flatMap(config => {
                                    this.defaultProcessDiscoveryConfig = new ProcessDiscoveryConfig().deserialize(config);
                                    this.defaultProcessDiscoveryConfig.uiAppId = this.uiAppId;
                                    return this.processDiscoveryConfigService.createProcessDiscoveryConfig(this.sandboxId, this.defaultProcessDiscoveryConfig.uiAppId, this.defaultProcessDiscoveryConfig)
                                    .pipe(
                                    map(
                                        result => {
                                            const newProcessDiscoveryConfig = this.defaultProcessDiscoveryConfig;
                                            newProcessDiscoveryConfig.id = result;
                                            this.processDiscoveryConfigService.updateProcessDiscoveryConfig(this.sandboxId, newProcessDiscoveryConfig.uiAppId, newProcessDiscoveryConfig, result).
                                        subscribe(
                                            // trigger a read to flush the cache since we changed it
                                            updatedConf => {
                                                this.processDiscoveryConfigService.getProcessDiscoveryConfig(this.uiAppId, true, true).subscribe();
                                            }
                                        );
                                            return newProcessDiscoveryConfig;
                                        })
                                    );
                                })
                            );
                        } else {
                            return of(processDiscoveryConfig);
                        }
                    }
                )
            )
            )   
        )
        return processDiscoveryConfig;
    }

}
