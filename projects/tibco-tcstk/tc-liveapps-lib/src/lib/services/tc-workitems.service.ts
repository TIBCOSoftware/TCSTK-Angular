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
  public getWorkitems(sandboxId: number, skip: number, top: number): Observable<Workitem[]> {
    // https://eu.liveapps.cloud.tibco.com/work/workListItems?$sandbox=31&$skip=0&$top=100
    const url = '/work/workListItems?$sandbox=' + sandboxId
      + '&$skip=' + skip
      + '&$top=' + top

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map((workitems: Workitem[]) => {
          return workitems;
        })
      );
    }

}
