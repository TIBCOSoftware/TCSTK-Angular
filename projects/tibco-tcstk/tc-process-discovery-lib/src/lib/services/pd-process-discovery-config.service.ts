import { Injectable } from '@angular/core';
import { SharedStateContent, SharedStateEntry, SharedStateList, TcCoreCommonFunctions, TcSharedStateService } from '@tibco-tcstk/tc-core-lib';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';
import { Location } from '@angular/common';
import { ProcessDiscoveryConfig } from '../models/tc-process-discovery-config';
// import { SpotfireConfig } from '../models/tc-spotfire-config';

@Injectable({
  providedIn: 'root'
})
export class PdProcessDiscoveryConfigService {

    DEFAULT_PREFIX = '.processdiscovery.config.tibcolabs.client.context.PUBLIC';

    constructor(
        private location: Location,
        private sharedStateService: TcSharedStateService
    ) { }

    public createProcessDiscoveryConfig(sandboxId: number, uiAppId: string, processDiscoveryConfig: ProcessDiscoveryConfig) {
        const ssName = uiAppId + this.DEFAULT_PREFIX;
        const content: SharedStateContent = new SharedStateContent();
        content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(processDiscoveryConfig));

        return this.sharedStateService.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
            .pipe(
                map(value => value)
            );
    }

    public getProcessDiscoveryConfig(uiAppId: string, useCache: boolean, flushCache: boolean): Observable<ProcessDiscoveryConfig> {
        // if useCache is false this will trigger the service to update the cached version with latest
        const ssName = uiAppId + this.DEFAULT_PREFIX;

        return this.sharedStateService.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
            .pipe(
                map(value => {
                    if (value.sharedStateEntries.length > 0) {
                        const ssresult = new ProcessDiscoveryConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
                        ssresult.id = value.sharedStateEntries[0].id;
                        return ssresult;
                    } else {
                        return undefined;
                    }
                }
                )
            );
    }

    public updateProcessDiscoveryConfig(sandboxId: number, uiAppId: string, processDiscoveryConfig: ProcessDiscoveryConfig, id: string) {
        const ssName = uiAppId + this.DEFAULT_PREFIX;
        const content: SharedStateContent = new SharedStateContent();
        content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(processDiscoveryConfig));
        const entry: SharedStateEntry = new SharedStateEntry();
        entry.content = content;
        entry.sandboxId = sandboxId;
        entry.name = ssName;
        entry.type = 'PUBLIC';
        entry.id = id;
        const ssList: SharedStateList = new SharedStateList();
        ssList.sharedStateEntries = [];
        ssList.sharedStateEntries.push(entry);

        return this.sharedStateService.updateSharedState(ssList.sharedStateEntries)
            .pipe(
                map(value => {
                    // Flush the cache
                    this.getProcessDiscoveryConfig(uiAppId, true, true).subscribe();
                    return new ProcessDiscoveryConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
                })
            );
    }
}
