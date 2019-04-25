import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable} from 'rxjs';
import {ApiResponseText, OrgFolder} from 'tc-liveapps-lib';
import {map, tap} from 'rxjs/operators';
import {CaseTypeReportRecord, CaseTypesReport} from '../models/tc-live-apps-reporting';

@Injectable({
  providedIn: 'root'
})
export class TcLiveAppsReportingService {

  constructor(private http: HttpClient) { }

  public getCaseTypesReport(sandboxId: number, appIds: string[]): Observable<CaseTypesReport> {
    const url = '/case/reports/v1/caseTypesReport?$sandbox=' + sandboxId;
    return this.http.get(url).pipe(
      tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
      map(response => {
        const originalResponse = new CaseTypesReport().deserialize(response);
        function includeCaseType(element: CaseTypeReportRecord, index, array ) {
          return (appIds.indexOf(element.applicationId) !== -1);
        }
        const filteredResponse = new CaseTypesReport();
        filteredResponse.caseTypes = originalResponse.caseTypes.filter(includeCaseType);
        return filteredResponse;
      })
    );
  }

}
