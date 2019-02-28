import { Injectable } from '@angular/core';
import {forkJoin, Observable, of, zip} from 'rxjs';
import {CaseInfo, CaseType, JsonSchema} from '../models/liveappsdata';
import {LiveAppsService} from '../services/live-apps.service';
import {HttpClient} from '@angular/common/http';
import {CaseInfoWithSchema} from '../models/tc-case-data';
import {map, mergeMap, tap} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class TcCaseDataService {

  constructor(private http: HttpClient, private liveAppsService: LiveAppsService) { }

  public getCaseState(caseRef: string, sandboxId: number): Observable<string> {
    const url = '/case/cases/' + caseRef + '/' + '?$sandbox=' + sandboxId + '&$select=s';
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfo => {
          const caseinf = new CaseInfo().deserialize(caseinfo);
          const state: string = caseinf.summaryObj.state;
          return state;
        })
      );
  }

  public getCaseWithSchema(
    caseRef: string, sandboxId: number, appId: string, typeId: string, uiAppId: string): Observable<CaseInfoWithSchema> {
    const url = '/case/cases/' + caseRef + '/' + '?$sandbox=' + sandboxId + '&$select=uc, m, s';

    // Make the two required API calls

    const caseSchema = this.liveAppsService.getCaseTypeSchema(sandboxId, appId, 100).pipe(
      tap(val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
      map(typesList => {
        // get schema for case type
        let requestedType: CaseType;
        typesList.casetypes.forEach((cType) => {
          if (cType.id === typeId) {
            requestedType = cType;
          }
        });
        return requestedType.jsonSchema;
      })
    );

    const caseData = this.http.get(url)
      .pipe(
        tap(val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfo => {
          let caseinf = new CaseInfo().deserialize(caseinfo);
          caseinf = this.liveAppsService.parseCaseInfo(
            caseinf,
            sandboxId,
            caseinf.metadata.applicationId,
            caseinf.metadata.typeId,
            uiAppId
          );
          return caseinf;
        })
      );

    // Combine the results of both calls into a single response
    const test1 = zip(caseSchema, caseData).pipe(
      map(caseInfoArray => {
        return new CaseInfoWithSchema().deserialize({ caseInfo: caseInfoArray[1], caseSchema: caseInfoArray[0] });
      })
    );
    return test1;
  }
}
