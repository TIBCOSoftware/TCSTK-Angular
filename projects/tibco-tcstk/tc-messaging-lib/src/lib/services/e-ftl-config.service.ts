import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {Location} from '@angular/common';
import {TcSharedStateService, TcCoreCommonFunctions, SharedStateContent, SharedStateEntry, SharedStateList} from '@tibco-tcstk/tc-core-lib';
import {MessagingConfig} from '../models/messaging-config';

@Injectable({
  providedIn: 'root'
})
export class EFTLConfigService {

  constructor(private location: Location, private sharedStateService: TcSharedStateService) {
  }

  public createMessagingConfig(sandboxId: number, uiAppId: string, messagingConfig: MessagingConfig): Observable<MessagingConfig> {
    const ssName = uiAppId + '.messaging.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(messagingConfig));

    return this.sharedStateService.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
      .pipe(
        flatMap(value => {
          return this.getMessagingConfig(uiAppId, false, false);
        })
      );
  }

  public getMessagingConfig(uiAppId: string, useCache: boolean, flushCache: boolean): Observable<MessagingConfig> {
    // if useCache is false this will trigger the service to update the cached version with latest
    const ssName = uiAppId + '.messaging.config.tibcolabs.client.context.PUBLIC';

    return this.sharedStateService.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
      .pipe(
        map(value => {
            if (value.sharedStateEntries.length > 0) {
              const ssresult = new MessagingConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
              ssresult.id = value.sharedStateEntries[0].id;
              return ssresult;
            } else {
              return undefined;
            }
          }
        )
      );
  }

  public updateMessagingConfig(sandboxId: number, uiAppId: string, messagingConfig: MessagingConfig, id: string) {
    const ssName = uiAppId + '.messaging.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(messagingConfig));
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
          // flush the cache and return value
          return this.getMessagingConfig(uiAppId, true, true);
          // return new MessagingConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
        })
      );
  }

  public removeMessagingConfig(id: number): Observable<string> {
    return this.sharedStateService.deleteSharedState(id);
  }
}

