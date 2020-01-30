import { Injectable } from '@angular/core';
import { RouteAccessControlConfig } from '../models/tc-groups-data';
import { TcCoreCommonFunctions, TcSharedStateService, SharedStateContent, SharedStateEntry, SharedStateList } from '@tibco-tcstk/tc-core-lib';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import { Location } from '@angular/common';

@Injectable({
    providedIn: 'root'
})
export class TcAccessControlService {

    constructor(
        private http: HttpClient,
        private location: Location,
        private sharedStateService: TcSharedStateService
    ) { }

    public createLAccessControlConfig(sandboxId: number, uiAppId: string, accessControlConfig: RouteAccessControlConfig) {
        const ssName = uiAppId + '.accesscontrol.config.tibcolabs.client.context.PUBLIC';
        const content: SharedStateContent = new SharedStateContent();
        content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(accessControlConfig));

        return this.sharedStateService.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
            .pipe(
                map(value => value)
            );
    }

    public getAccessControlConfig(uiAppId: string, useCache: boolean, flushCache: boolean): Observable<RouteAccessControlConfig> {
        // if useCache is false this will trigger the service to update the cached version with latest
        const ssName = uiAppId + '.accesscontrol.config.tibcolabs.client.context.PUBLIC';

        return this.sharedStateService.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
            .pipe(
                map(value => {
                    if (value.sharedStateEntries.length > 0) {
                        const ssresult = new RouteAccessControlConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
                        ssresult.id = value.sharedStateEntries[0].id;
                        return ssresult;
                    } else {
                        return undefined;
                    }
                }
                )
            );
    }

    public updateAccessControlConfig(sandboxId: number, uiAppId: string, accessControlConfig: RouteAccessControlConfig, id: string) {
        const ssName = uiAppId + '.accesscontrol.config.tibcolabs.client.context.PUBLIC';
        const content: SharedStateContent = new SharedStateContent();
        content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(accessControlConfig));
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
                flatMap(value => {
                    // flush the cache and return value
                    return this.getAccessControlConfig(uiAppId, true, true);
                    // return new RouteAccessControlConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
                })
            );
    }
}

