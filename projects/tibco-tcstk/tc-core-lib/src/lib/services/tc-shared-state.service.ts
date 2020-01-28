/**
 * @ngdoc component
 * @name tcSharedStateService
 *
 * @description
 *
 * tcSharedStateService provides services for managing stored client config using the Tibco Live Apps shared state service.
 *
 * Although this is a live apps service rather than a Tibco Subscriber Cloud Service it is inside the core project since it will
 * be used for all applications to store configuration information.
 *
 * By hosting this service in the core we can avoid a circular dependency to the live apps library.
 *
 * Note: This service will use the http caching interceptor for 'GET' calls based on passed parameters.
 *
 *
 */

import { Injectable } from '@angular/core';
import {SharedStateContent, SharedStateEntry, SharedStateList} from '../models/tc-shared-state';
import {Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {UiAppConfig} from '../models/tc-app-config';
import {TcCoreCommonFunctions} from '../common/tc-core-common-functions';

@Injectable({
  providedIn: 'root'
})
export class TcSharedStateService {

  constructor(private http: HttpClient, private location: Location) {
  }

  public createSharedState(name: string,
                           type: string,
                           description: string,
                           sandboxId: number,
                           attributes: string[],
                           roles: string[],
                           links: string[],
                           content: SharedStateContent): Observable<string> {
    const url = '/clientstate/v1/states';

    const body = {
      'name': name,
      'type': type,
      'description': description,
      'sandboxId': sandboxId,
      'attributes': attributes,
      'roles': roles,
      'links': links,
      content: content
    };
    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(url, bodyStr, {headers })
      .pipe(
        tap(val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(result => {
          return result.toString();
        })
      );
  }

  public updateSharedState(sharedStateList): Observable<SharedStateList> {
    const url = '/clientstate/v1/states';

    const body = sharedStateList;
    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put(url, bodyStr, {headers })
      .pipe(
        tap(val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(updatedSharedStateList => new SharedStateList().deserialize(updatedSharedStateList))
      );
  }

  public getSharedState(name: string, type: string, useCache: boolean, flushCache: boolean): Observable<SharedStateList> {
    const url = '/clientstate/v1/states?$filter=type=' + type
    // const url = '/clientstate/v1/states?$filter=type=' + type
      + ' and name=\'' + name + '\'';
    let options = {}
    // set headers when caching required
    let headers: HttpHeaders = new HttpHeaders();
    if (useCache) {
      headers = headers.set('cacheResponse', 'true');
    }
    if (flushCache) {
      headers = headers.set('flushCache', 'true');
    }
    options = {headers: headers };

    return this.http.get(url, options)
      .pipe(
        tap(val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(sharedStateList => new SharedStateList().deserialize(sharedStateList)));
  }

  /* Ui App Config */

  public getUiAppConfig(uiAppId: string, useCache: boolean, flushCache: boolean): Observable<UiAppConfig> {
    // if useCache is false this will trigger the service to update the cached version with latest
    const ssName = uiAppId + '.config.tibcolabs.client.context.PUBLIC';

    return this.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
      .pipe(
        map(value => {
            if (value.sharedStateEntries.length > 0) {
              const ssresult = new UiAppConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
              ssresult.id = value.sharedStateEntries[0].id;
              return ssresult;
            } else {
              return undefined;
            }
          }
        )
      );
  }

  public createUiAppConfig(sandboxId: number, uiAppConfig: UiAppConfig, uiAppId: string): Observable<string> {
    const ssName = uiAppId + '.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(uiAppConfig));
    return this.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
      .pipe(
        map(value => value)
      );
  }

  public updateUiAppConfig(sandboxId: number, uiAppConfig: UiAppConfig, uiAppId: string, id: string): Observable<UiAppConfig> {
    const ssName = uiAppId + '.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(uiAppConfig));
    const entry: SharedStateEntry = new SharedStateEntry();
    entry.content = content;
    entry.sandboxId = sandboxId;
    entry.name = ssName;
    entry.type = 'PUBLIC';
    entry.id = id;
    const ssList: SharedStateList = new SharedStateList();
    ssList.sharedStateEntries = [];
    ssList.sharedStateEntries.push(entry);
    return this.updateSharedState(ssList.sharedStateEntries)
      .pipe(
        map(value => {
          return new UiAppConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
        })
      );
  }

  public deleteSharedState(id: number): Observable<string> {
    const url = '/clientstate/v1/states' + id;

    return this.http.delete(url )
      .pipe(
        tap(val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(result => 'success')
      );
  }

}
