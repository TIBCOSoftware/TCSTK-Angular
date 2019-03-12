import { Injectable } from '@angular/core';
import {SharedStateContent, SharedStateEntry, SharedStateList} from '../models/tc-shared-state';
import {Observable} from 'rxjs';
import {map} from 'rxjs/operators';
import {Location} from '@angular/common';
import {TcCoreCommonFunctions} from '../common/tc-core-common-functions';
import {GeneralConfig} from '../models/tc-general-config';
import {TcSharedStateService} from './tc-shared-state.service';

@Injectable({
  providedIn: 'root'
})
export class TcGeneralConfigService {

  constructor(private location: Location, private sharedStateService: TcSharedStateService) {
  }

  public createGeneralConfig(sandboxId: number, uiAppId: string, generalConfig: GeneralConfig) {
    const ssName = uiAppId + '.general.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(generalConfig));

    return this.sharedStateService.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
      .pipe(
        map(value => value)
      );
  }

  public getGeneralConfig(uiAppId: string, useCache: boolean, flushCache: boolean): Observable<GeneralConfig> {
    // if useCache is false this will trigger the service to update the cached version with latest
    const ssName = uiAppId + '.general.config.tibcolabs.client.context.PUBLIC';

    return this.sharedStateService.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
      .pipe(
        map(value => {
            if (value.sharedStateEntries.length > 0) {
              const ssresult = new GeneralConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
              ssresult.id = value.sharedStateEntries[0].id;
              return ssresult;
            } else {
              return undefined;
            }
          }
        )
      );
  }

  public updateGeneralConfig(sandboxId: number, uiAppId: string, generalConfig: GeneralConfig, id: string) {
    const ssName = uiAppId + '.general.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(generalConfig));
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
          return new GeneralConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
        })
      );
  }
}
