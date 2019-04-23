import { Injectable } from '@angular/core';
import { ActivatedRouteSnapshot, Resolve } from '@angular/router';
import { Observable, of } from 'rxjs';
import { flatMap, map, mergeMap, switchMap } from 'rxjs/operators';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';
import { UiAppIdConfig } from 'tc-core-lib';
import { ProcessDiscoveryUserConfig } from '../models/tc-process-discovery';
import { PdProcessDiscoveryService } from '../services/pd-process-discovery.service';
import { TcCoreCommonFunctions} from 'tc-core-lib';

@Injectable()
export class ProcessDiscoveryUserConfigResolver implements Resolve<Observable<ProcessDiscoveryUserConfig>> {

    DEFAULT_CONFIG_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/processDiscoveryConfig_private.json');
    APP_ID_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/uiAppId.json');

    private sandboxId: number;
    public defaultProcessDiscoveryUserConfig: ProcessDiscoveryUserConfig;
    private uiAppId: string;

    constructor(
        private processDiscoveryService: PdProcessDiscoveryService, 
        private http: HttpClient, 
        private location: Location
    ) {}

    public setSandbox = (sandboxId: number) => {
        this.sandboxId = sandboxId;
    }

    // can be used to load defaultProcessDiscoveryConfig from a JSON config
    private getDefaultProcessDiscoveryUserConfig = () => {
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

    resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<ProcessDiscoveryUserConfig> {
        const processDiscoveryUserConfig = this.getAppId().pipe(
            switchMap(uiAppId => this.processDiscoveryService.getUserConfig(uiAppId.uiAppId, 'PRIVATE', false, false)
            .pipe(
                mergeMap(
                    processDiscoveryConfig => {
                        if (processDiscoveryConfig === undefined) {
                            return this.getDefaultProcessDiscoveryUserConfig().pipe(
                                flatMap(config => {
                                    this.defaultProcessDiscoveryUserConfig = new ProcessDiscoveryUserConfig().deserialize(config);
                                    this.defaultProcessDiscoveryUserConfig.uiAppId = this.uiAppId;
                                    return this.processDiscoveryService.createUserConfig(this.sandboxId, this.defaultProcessDiscoveryUserConfig.uiAppId, 'PRIVATE', this.defaultProcessDiscoveryUserConfig)
                                    .pipe(
                                    map(
                                        result => {
                                            const newProcessDiscoveryUserConfig = this.defaultProcessDiscoveryUserConfig;
                                            newProcessDiscoveryUserConfig.id = result;
                                            this.processDiscoveryService.updateUserConfig(this.sandboxId, newProcessDiscoveryUserConfig.uiAppId, 'PRIVATE', newProcessDiscoveryUserConfig, result).
                                        subscribe(
                                            // trigger a read to flush the cache since we changed it
                                            updatedConf => {
                                                this.processDiscoveryService.getUserConfig(this.uiAppId, 'PRIVATE', true, true).subscribe();
                                            }
                                        );
                                            return newProcessDiscoveryUserConfig;
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
        return processDiscoveryUserConfig;
    }
}
