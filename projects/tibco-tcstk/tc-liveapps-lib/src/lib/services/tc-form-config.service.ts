import { Injectable } from '@angular/core';
import {Observable} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';
import {Location} from '@angular/common';
import {TcSharedStateService, TcCoreCommonFunctions, SharedStateContent, SharedStateEntry, SharedStateList} from '@tibco-tcstk/tc-core-lib';
import {FormConfig} from '../models/tc-liveapps-config';

@Injectable({
  providedIn: 'root'
})
export class TcFormConfigService {

  constructor(private location: Location, private sharedStateService: TcSharedStateService) {
  }

  public getLayoutFromConfig(formTag: string, formConfig: FormConfig): any[] {
    const foundConfigs = formConfig.processFormConfigs.filter(pfc => {
      return pfc.formTag === formTag;
    });
    let layout: any[];
    if (foundConfigs && foundConfigs.length > 0) {
      layout = foundConfigs[0].layout ? JSON.parse(foundConfigs[0].layout) : undefined;
    }
    return layout;
  }

  public createFormConfig(sandboxId: number, uiAppId: string, formConfig: FormConfig) {
    const ssName = uiAppId + '.form.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(formConfig));

    return this.sharedStateService.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
      .pipe(
        map(value => value)
      );
  }

  public getFormConfig(uiAppId: string, useCache: boolean, flushCache: boolean): Observable<FormConfig> {
    // if useCache is false this will trigger the service to update the cached version with latest
    const ssName = uiAppId + '.form.config.tibcolabs.client.context.PUBLIC';

    return this.sharedStateService.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
      .pipe(
        map(value => {
            if (value.sharedStateEntries.length > 0) {
              const ssresult = new FormConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
              ssresult.id = value.sharedStateEntries[0].id;
              return ssresult;
            } else {
              return undefined;
            }
          }
        )
      );
  }

  public updateFormConfig(sandboxId: number, uiAppId: string, formConfig: FormConfig, id: string) {
    const ssName = uiAppId + '.form.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(formConfig));
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
          // flush the cache and return new value
          return this.getFormConfig(uiAppId, true, true);
          // return new FormConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
        })
      );
  }
}

