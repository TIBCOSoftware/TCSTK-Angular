/**
 * @ngdoc component
 * @name tcGridHelperService
 *
 * @description
 *
 * tcGridHelperService provides services for using ag grid with Tibco Cloud Backend services.
 *
 *
 *
 *
 */

import {Inject, Injectable, Injector} from '@angular/core';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {catchError, flatMap, map, switchMap, tap} from 'rxjs/operators';
// import {error} from 'ng-packagr/lib/util/log';
import {CaseInfo, TcCaseDataService} from '@TIBCOSoftware/tc-liveapps-lib';
import {formatDate, NgLocaleLocalization} from '@angular/common';
import { LOCALE_ID } from '@angular/core';
export let InjectorInstance: Injector;

@Injectable({
  providedIn: 'root'
})

export class TcGridHelperService {

  constructor(private http: HttpClient, private caseDataService: TcCaseDataService, private injector: Injector) {
    InjectorInstance = this.injector;
  }

  public static defaultColumnConfig(results: CaseInfo[]): any[] {
    // {"state":"Created","RiskCaseId_v1":"RM-000020","Channel_v1":"Spotfire"}"
    const columnDefs = [];
    if (results && results.length > 0) {
      // caseRef
      columnDefs.push({
        headerName: 'Case Reference',
        field: 'caseReference',
        sortable: true,
        filter: true,
        resizable: true
      });

      // summary fields
      for (const summaryObjKey in results[0].summaryObj) {
        if (summaryObjKey) {
          const columnDef = {
            headerName: (summaryObjKey === 'state') ? 'State' : TcGridHelperService.unCamelCase(summaryObjKey.replace('_v1', '')),
            field: 'summaryObj.' + summaryObjKey,
            sortable: true,
            filter: true,
            resizable: true
          }
          columnDefs.push(columnDef);
        }
      }

      // createdDate
      columnDefs.push({
        headerName: 'Created',
        field: 'metadata.creationTimestamp',
        sortable: true,
        filter: true,
        resizable: true,
        valueFormatter: TcGridHelperService.dateFormatter
      });

      // last changed
      columnDefs.push({
        headerName: 'Last Modified',
        field: 'metadata.modificationTimestamp',
        sortable: true,
        filter: true,
        resizable: true,
        valueFormatter: TcGridHelperService.dateFormatter
      });
    }
    return columnDefs;
  }

  public static unCamelCase(param) {
    const regEx = { re: '((?<!^)[A-Z](?![A-Z]))(?=\\S)', flags: 'g'};
    const expr = new RegExp(regEx.re, regEx.flags);
    const st1 = param.replace(expr, ' $1');
    const st2 = st1.replace(/^./, s => s.toUpperCase() );
    return st2;
  }

  public static dateFormatter(param) {
    const dateObj = new Date(param.value);
    return formatDate(dateObj, 'medium', InjectorInstance.get(LOCALE_ID));
  }

  public caseDataToRows(caseinfos: CaseInfo[]): any[] {
    const rows = [];
    caseinfos.forEach(caseinfo => {
      rows.push(caseinfo.untaggedCasedataObj);
    });
    return rows;
  }

  public getLiveAppsCases(sandboxId: number, caseRefs: string[]): Observable<any[]> {
    return this.caseDataService.getCaseDataByRefs(sandboxId, caseRefs).pipe(
      map((caseinfos: CaseInfo[]) => {
          return caseinfos;
        }
      )
    );
  }

}
