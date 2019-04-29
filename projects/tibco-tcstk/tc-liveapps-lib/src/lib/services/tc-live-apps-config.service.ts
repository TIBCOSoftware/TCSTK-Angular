import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Location} from '@angular/common';
import {TcSharedStateService, TcCoreCommonFunctions, SharedStateContent, SharedStateEntry, SharedStateList} from '@tibco-tcstk/tc-core-lib';
import {LiveAppsConfig} from '../models/tc-liveapps-config';

@Injectable({
  providedIn: 'root'
})
export class TcLiveAppsConfigService {

  constructor(private location: Location, private sharedStateService: TcSharedStateService) {
  }

  public createLiveAppsConfig(sandboxId: number, uiAppId: string, liveappsConfig: LiveAppsConfig) {
    const ssName = uiAppId + '.liveapps.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(liveappsConfig));

    return this.sharedStateService.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
      .pipe(
        map(value => value)
      );
  }

  public getLiveAppsConfig(uiAppId: string, useCache: boolean, flushCache: boolean): Observable<LiveAppsConfig> {
    // if useCache is false this will trigger the service to update the cached version with latest
    const ssName = uiAppId + '.liveapps.config.tibcolabs.client.context.PUBLIC';

    return this.sharedStateService.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
      .pipe(
        map(value => {
            if (value.sharedStateEntries.length > 0) {
              const ssresult = new LiveAppsConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
              ssresult.id = value.sharedStateEntries[0].id;
              return ssresult;
            } else {
              return undefined;
            }
          }
        )
      );
  }

  public updateLiveAppsConfig(sandboxId: number, uiAppId: string, liveappsConfig: LiveAppsConfig, id: string) {
    const ssName = uiAppId + '.liveapps.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(liveappsConfig));
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
          // flush the cache
          this.getLiveAppsConfig(uiAppId, true, true).subscribe();
          return new LiveAppsConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
        })
      );
  }
}

