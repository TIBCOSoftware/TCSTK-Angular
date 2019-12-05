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
  public getWorkitems(sandboxId: number, appIds: string[], caseRef: string, skip: number, top: number): Observable<Workitem[]> {
    // https://eu.liveapps.cloud.tibco.com/work/workListItems?$sandbox=31&$skip=0&$top=100
    // https://eu.liveapps.cloud.tibco.com/work/workListItems?$sandbox=31&$skip=0&$top=100&$filter=caseref%20eq%20275481
    let url = '/work/workListItems?$sandbox=' + sandboxId
      + '&$skip=' + skip
      + '&$top=' + top

    let filter: string;
    if (!caseRef) {
      let filterStr;
      if (appIds && appIds.length > 0) {
        // filter using appIds
        filterStr = 'applicationId eq \'<appId>\'';
        appIds.forEach(appId => {
          if (!filter) {
            filter = filterStr.replace('<appId>', appId);
          } else {
            filter = filter + ' or ' + filterStr.replace('<appId>', appId);
          }
        });
      }
    } else {
      // filter using caseRef
      filter = 'caseref eq ' + caseRef;
    }
    if (filter) {
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
