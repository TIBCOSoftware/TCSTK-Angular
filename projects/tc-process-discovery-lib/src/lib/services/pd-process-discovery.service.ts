import { Injectable, EventEmitter } from '@angular/core';
import { TcSharedStateService, SharedStateContent, TcCoreCommonFunctions, SharedStateEntry, SharedStateList } from 'tc-core-lib';
import { Observable, Subject, of, throwError } from 'rxjs';
import { map, mergeMap, flatMap } from 'rxjs/operators';
import { ProcessDiscoveryUserConfig, Datasource } from '../models/tc-process-discovery';
import { LiveAppsService, CaseInfoList } from 'tc-liveapps-lib';
import { HttpClient } from '@angular/common/http';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class PdProcessDiscoveryService {

    DEFAULT_PREFIX = '.processdiscovery.config.tibcolabs.client.context.';

    constructor(
        private sharedStateService: TcSharedStateService, 
        private liveappsService: LiveAppsService,
        private http: HttpClient,
        private location: Location
    ) { }

    public createUserConfig(sandboxId: number, uiAppId: string, ssType: string, processDiscoveryConfig: ProcessDiscoveryUserConfig) {

        const ssName = uiAppId + this.DEFAULT_PREFIX + ssType;
        const content: SharedStateContent = new SharedStateContent();
        content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(processDiscoveryConfig));

        return this.sharedStateService.createSharedState(ssName, ssType, '', sandboxId, undefined, undefined, undefined, content)
            .pipe(
                map(value => value)
            );
    }

    public getUserConfig(uiAppId: string, ssType: string, useCache: boolean, flushCache: boolean): Observable<ProcessDiscoveryUserConfig> {
        // if useCache is false this will trigger the service to update the cached version with latest
        const ssName = uiAppId + this.DEFAULT_PREFIX + ssType;

        return this.sharedStateService.getSharedState(ssName, ssType, useCache, flushCache)
            .pipe(
                map(value => {
                    if (value.sharedStateEntries.length > 0) {
                        const ssresult = new ProcessDiscoveryUserConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
                        // ssresult.id = value.sharedStateEntries[0].id;
                        return ssresult;
                    } else {
                        return undefined;
                    }
                })
            );
    }

    public updateUserConfig(sandboxId: number, uiAppId: string, ssType: string, processDiscoveryUserConfig: ProcessDiscoveryUserConfig, id: string) {
        const ssName = uiAppId + this.DEFAULT_PREFIX + ssType;
        const content: SharedStateContent = new SharedStateContent();
        content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(processDiscoveryUserConfig));
        const entry: SharedStateEntry = new SharedStateEntry();
        entry.content = content;
        entry.sandboxId = sandboxId;
        entry.name = ssName;
        entry.type = ssType;
        entry.id = id;
        const ssList: SharedStateList = new SharedStateList();
        ssList.sharedStateEntries = [];
        ssList.sharedStateEntries.push(entry);

        return this.sharedStateService.updateSharedState(ssList.sharedStateEntries)
            .pipe(
                map(value => {
                    // Flush the cache
                    this.getUserConfig(uiAppId, ssType, true, true).subscribe();
                    return new ProcessDiscoveryUserConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
                })
            );
    }

    DEFAULT_CONFIG_URL = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/config/processDiscoveryConfig_private.json');
    private getDefaultUserConfig = () => {
        return this.http.get(this.DEFAULT_CONFIG_URL);
    }

    public getDefaultDatasource = (sandboxId: number, uiAppId:string): Observable<Datasource> => {
        return this.getUserConfig(uiAppId, 'PRIVATE', false, false).pipe(
            flatMap(userConfig => {
                if (userConfig === undefined){
                    // Private shared state is not initiated. Read it from the DEFAULT_CONFIG_URL and store in private share state
                    return this.getDefaultUserConfig().pipe(
                        flatMap(fileUserConfig => {
                            const defaultUserConfig = new ProcessDiscoveryUserConfig().deserialize(fileUserConfig);
                            return this.createUserConfig(sandboxId, uiAppId, 'PRIVATE', defaultUserConfig).pipe(
                                flatMap(id => {
                                    this.updateUserConfig(sandboxId, uiAppId, 'PRIVATE', defaultUserConfig, id).
                                        subscribe(
                                            // trigger a read to flush the cache since we changed it
                                            updatedConf => {
                                                this.getUserConfig(uiAppId, 'PRIVATE', true, true).subscribe();
                                            }
                                        );
                                    if (defaultUserConfig.datasourceCaseRef != ""){
                                        return this.getDatasourceDetails(sandboxId, defaultUserConfig.datasourceCaseRef).pipe(
                                            map(detailedDatasource => {
                                                detailedDatasource.idDefinition = id;
                                                return detailedDatasource;
                                            })
                                        );
                                    } else {
                                        return of(undefined);
                                    }
                                })
                            )
                        })
                    )
                } else {
                    if (userConfig.datasourceCaseRef != ""){
                        return this.getDatasourceDetails(sandboxId, userConfig.datasourceCaseRef).pipe(
                            map(detailedDatasource => {
                                return detailedDatasource;
                            })
                        );
                    } else {
                        return of(undefined);
                    }
                }
            })
        );
    }

    public getDatasourceDetails = (sandboxId: any, caseRef: string): Observable<Datasource> => {
        return this.liveappsService.getCaseByRef(sandboxId,caseRef)
            .pipe(
                map(value => {
                    const datasource = new Datasource().deserialize({
                        "datasourceId": value.summaryObj.AnalysisID,
                        "description": value.summaryObj.AnalysisName,
                        "caseRef": value.caseReference
                    });
                    return datasource;
                })
            );
    }

    public getDatasources = (sandboxId: number, appId: string, filterStates: string[]): Observable<Datasource[]> => {

        return this.liveappsService.getCases(sandboxId, appId, '1', 0, 100)
            .pipe(
                map(value => {
                    let datasourceList: Datasource[] = [];
                    value.caseinfos.forEach(element => {
                        const summary = JSON.parse(element.summary);
                        if (filterStates.indexOf(summary.state) > -1 ){
                            const datasource = new Datasource().deserialize({
                                "datasourceId": summary.AnalysisID,
                                "description": summary.AnalysisName,
                                "caseRef": element.caseReference
                            });
                            datasourceList.push(datasource);
                        }
                    });
                    return datasourceList;
                })
            )
    }

    private currentDatasource: Datasource;
    public getCurrentDatasource = (): Observable<Datasource> => {
        return of(this.currentDatasource)
    }

    public setCurrentDatasource = (datasource: Datasource): Observable<Datasource> => {
        this.currentDatasource = datasource;
        return of(this.currentDatasource);
    }

    public getJezDatasource = (sandboxId: number, uiAppId: string): Observable<Datasource> => {
        if (this.currentDatasource) {
            return of(this.currentDatasource);
        } else {
            return this.getDefaultDatasource(sandboxId, uiAppId).pipe(
                flatMap(defaultDatasource => {
                    if (defaultDatasource == undefined) {
                        return throwError('Not datasource defined');
                    } else {
                        const datasource = new Datasource().deserialize(defaultDatasource);
                        return of(datasource);
                    }
                })
            );
        }
    }
    
    dataStr = new EventEmitter();
    public sendMessage = (comment: string, cases: string): void => {
        this.dataStr.emit({comment: comment, cases: cases});
    }    
}
