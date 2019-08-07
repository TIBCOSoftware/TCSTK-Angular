import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {Observable} from 'rxjs';
import {flatMap, map, tap} from 'rxjs/operators';
import {Workitem} from '../models/tc-workitems';

@Injectable({
  providedIn: 'root'
})
export class TcWorkitemsService {

  constructor(private http: HttpClient) { }

// todo: Note this is not a public API - update when Public API available
  public getWorkitems(sandboxId: number, appIds: string[], skip: number, top: number): Observable<Workitem[]> {
    // https://eu.liveapps.cloud.tibco.com/work/workListItems?$sandbox=31&$skip=0&$top=100
    let url = '/work/workListItems?$sandbox=' + sandboxId
      + '&$skip=' + skip
      + '&$top=' + top
    const filterStr = 'applicationId eq \'<appId>\'';
    let filter: string;

    if (appIds && appIds.length > 0) {
      appIds.forEach(appId => {
        if (!filter) {
          filter = filterStr.replace('<appId>', appId);
        } else {
          filter = filter + ' or ' + filterStr.replace('<appId>', appId);
        }
      });
      url = url + '&$filter=' + filter;
    }

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map((workitems: Workitem[]) => {
          return workitems;
        })
      );
    }

}
