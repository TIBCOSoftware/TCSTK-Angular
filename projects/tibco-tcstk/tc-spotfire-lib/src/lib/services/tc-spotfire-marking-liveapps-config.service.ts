import { Injectable } from '@angular/core';
import {SharedStateContent, SharedStateEntry, SharedStateList, TcCoreCommonFunctions, TcSharedStateService} from '@tibco-tcstk/tc-core-lib';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Location} from '@angular/common';
import {SpotfireMarkingCreateCaseConfig} from '../models/tc-spotfire-config';

@Injectable({
  providedIn: 'root'
})
export class TcSpotfireMarkingLiveappsConfigService {

    DEFAULT_PREFIX = '.sf.marking.la.config.tibcolabs.client.context.PUBLIC';

    constructor(
        private location: Location,
        private sharedStateService: TcSharedStateService
    ) {}

  public createSpotfireConfig(sandboxId: number, uiAppId: string, spotfireConfig: SpotfireMarkingCreateCaseConfig) {
    const ssName = uiAppId + this.DEFAULT_PREFIX;
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(spotfireConfig));

    return this.sharedStateService.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content);
  }

  public getSpotfireConfig(uiAppId: string, useCache: boolean, flushCache: boolean): Observable<SpotfireMarkingCreateCaseConfig> {
    // if useCache is false this will trigger the service to update the cached version with latest
    const ssName = uiAppId + this.DEFAULT_PREFIX;

    return this.sharedStateService.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
      .pipe(
        map(value => {
            if (value.sharedStateEntries.length > 0) {
              const ssresult = new SpotfireMarkingCreateCaseConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
              ssresult.id = value.sharedStateEntries[0].id;
              return ssresult;
            } else {
              return undefined;
            }
          }
        )
      );
  }

  public updateSpotfireConfig(sandboxId: number, uiAppId: string, spotfireConfig: SpotfireMarkingCreateCaseConfig, id: string) {
    const ssName = uiAppId + this.DEFAULT_PREFIX;
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(spotfireConfig));
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
            this.getSpotfireConfig(uiAppId, true, true).subscribe();
            return new SpotfireMarkingCreateCaseConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
        })
      );
  }
}
