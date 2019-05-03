import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {forkJoin, Observable} from 'rxjs';
import {flatMap, map, tap} from 'rxjs/operators';
import {CaseTypeReportRecord, CaseTypesReport, CaseTypeStateReport} from '../models/tc-live-apps-reporting';
import {TcCaseCardConfigService} from './tc-case-card-config.service';
import {StateColorMap, StateColorMapRec} from '../models/tc-case-card-config';

@Injectable({
  providedIn: 'root'
})
export class TcLiveAppsReportingService {

  constructor(private http: HttpClient, private caseConfigService: TcCaseCardConfigService) { }

  public parseCaseTypesReport(report: CaseTypesReport, uiAppId: string): Observable<CaseTypesReport> {
    // add state colors for the report entries
    const caseStateColorMaps$: Observable<StateColorMap>[] = [];
    report.caseTypes.forEach((caseType) => {
      caseStateColorMaps$.push(this.caseConfigService.getStateColorInfo(caseType.applicationId, uiAppId).pipe(
        map(stateColMap => {
          return stateColMap;
        })
      ));
    });
    return forkJoin(caseStateColorMaps$).pipe(
      map(resultArr => {
        for (let x = 0; x < report.caseTypes.length; x++) {
          report.caseTypes[x].caseTypeInfo.color = resultArr[x].caseTypeColor ? resultArr[x].caseTypeColor : undefined;
        }
        return report;
      })
    );
  }

  public getCaseTypesReport(sandboxId: number, appIds: string[], uiAppId: string): Observable<CaseTypesReport> {
    const url = '/case/reports/v1/caseTypesReport?$sandbox=' + sandboxId;
    return this.http.get(url).pipe(
      tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
      flatMap(response => {
        const originalResponse = new CaseTypesReport().deserialize(response);
        function includeCaseType(element: CaseTypeReportRecord, index, array ) {
          return (appIds.indexOf(element.applicationId) !== -1);
        }
        const filteredResponse = new CaseTypesReport();
        if (appIds.length > 0) {
          filteredResponse.caseTypes = originalResponse.caseTypes.filter(includeCaseType);
        } else {
          filteredResponse.caseTypes = originalResponse.caseTypes;
        }
        return this.parseCaseTypesReport(filteredResponse, uiAppId);
      })
    );
  }

  public getCaseTypeStateReport(sandboxId: number, appId: string, typeId: string, incTerminal: boolean): Observable<CaseTypeStateReport> {
    const url = '/case/reports/v1/caseStatesReport?$sandbox=' + sandboxId
      + '&$filter=applicationId eq ' + appId
      + ' and typeId eq ' + typeId
      + ' and includeTerminalStates eq ' + String(incTerminal).toUpperCase();
    return this.http.get(url).pipe(
      tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
      map(response => {
        const caseTypeStateReport = new CaseTypeStateReport().deserialize(response);
        return caseTypeStateReport;
      })
    );
  }

}
