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
import {SharedStateContent, SharedStateList} from '../models/tc-shared-state';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TcSharedStateService {

  constructor(private http: HttpClient, private location: Location) { }

  public createSharedState(name: string,
                            type: string,
                            description: string,
                            sandboxId: number,
                            attributes: string[],
                            roles: string[],
                            links: string[],
                            content: SharedStateContent): Observable<string> {
    const url = '/clientstate/states';

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
    return this.http.post(url, bodyStr, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(result => {
          return result.toString();
        })
      );
  }

  public updateSharedState(sharedStateList): Observable<SharedStateList> {
    const url = '/clientstate/states';

    const body = sharedStateList;
    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put(url, bodyStr, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(updatedSharedStateList => new SharedStateList().deserialize(updatedSharedStateList))
      );
  }

  public getSharedState(name: string, type: string, useCache: boolean, flushCache: boolean): Observable<SharedStateList>  {
    const url = '/clientstate/states?$filter=type=' + type
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
    options = { headers: headers };

    return this.http.get(url, options )
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(sharedStateList => new SharedStateList().deserialize(sharedStateList)));
  }
}
