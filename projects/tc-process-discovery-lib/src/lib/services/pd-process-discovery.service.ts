import { Injectable, EventEmitter } from '@angular/core';
import { TcSharedStateService, SharedStateContent, TcCoreCommonFunctions, SharedStateEntry, SharedStateList } from 'tc-core-lib';
import { Observable, Subject } from 'rxjs';
import { map } from 'rxjs/operators';
import { ProcessDiscoveryUserConfig, UserPredefinedDatasource } from '../models/tc-process-discovery';
import { LiveAppsService, CaseInfoList } from 'tc-liveapps-lib';

@Injectable({
    providedIn: 'root'
})
export class PdProcessDiscoveryService {

    DEFAULT_PREFIX = '.processdiscovery.config.tibcolabs.client.context.';


    constructor(private sharedStateService: TcSharedStateService, private liveappsService: LiveAppsService) { }

    public createProcessDiscoveryUserConfig(sandboxId: number, uiAppId: string, ssType: string, processDiscoveryConfig: ProcessDiscoveryUserConfig) {

        const ssName = uiAppId + this.DEFAULT_PREFIX + ssType;
        const content: SharedStateContent = new SharedStateContent();
        content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(processDiscoveryConfig));

        return this.sharedStateService.createSharedState(ssName, ssType, '', sandboxId, undefined, undefined, undefined, content)
            .pipe(
                map(value => value)
            );
    }

    public getProcessDiscoveryUserConfig(uiAppId: string, ssType: string, useCache: boolean, flushCache: boolean): Observable<ProcessDiscoveryUserConfig> {
        // if useCache is false this will trigger the service to update the cached version with latest
        const ssName = uiAppId + this.DEFAULT_PREFIX + ssType;

        return this.sharedStateService.getSharedState(ssName, ssType, useCache, flushCache)
            .pipe(
                map(value => {
                    if (value.sharedStateEntries.length > 0) {
                        const ssresult = new ProcessDiscoveryUserConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
                        ssresult.id = value.sharedStateEntries[0].id;
                        return ssresult;
                    } else {
                        return undefined;
                    }
                })
            );
    }

    public updateProcessDiscoveryUserConfig(sandboxId: number, uiAppId: string, ssType: string, processDiscoveryUserConfig: ProcessDiscoveryUserConfig, id: string) {
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
                    this.getProcessDiscoveryUserConfig(uiAppId, ssType, true, true).subscribe();
                    return new ProcessDiscoveryUserConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
                })
            );
    }

    public getUserPredefinedDatasource = (sandboxId: any, caseRef: string): Observable<UserPredefinedDatasource> => {

        return this.liveappsService.getCaseByRef(sandboxId,caseRef)
            .pipe(
                map(value => {
                    const userPredefinedDatasource = new UserPredefinedDatasource().deserialize({
                        "datasourceId": value.summaryObj.AnalysisID,
                        "description": value.summaryObj.AnalysisName,
                        "caseRef": value.caseReference
                    });
                    return userPredefinedDatasource;
                })
            );
    }

    public getDatasources = (sandboxId: number, appId: string, filterStates: string[]): Observable<UserPredefinedDatasource[]> => {

        return this.liveappsService.getCases(sandboxId, appId, '1', 0, 100)
            .pipe(
                map(value => {
                    let datasourceList: UserPredefinedDatasource[] = [];
                    value.caseinfos.forEach(element => {
                        const summary = JSON.parse(element.summary);
                        if (filterStates.indexOf(summary.state) > -1 ){
                            const datasource = new UserPredefinedDatasource().deserialize({
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
       
    dataStr = new EventEmitter();
    public sendMessage = (comment: string, cases: string): void => {
        this.dataStr.emit({comment: comment, cases: cases});
    }
    
}
