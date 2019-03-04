import { Injectable } from '@angular/core';
import {HttpClient} from '@angular/common/http';
import {CaseAction, CaseActionsList, CaseType, CaseTypesList} from '../models/liveappsdata';
import {LaProcessSelection} from '../models/tc-case-processes';
import {LiveAppsService} from '../services/live-apps.service';
import {Observable} from 'rxjs';
import {flatMap, map, tap} from 'rxjs/operators';
import {TcCaseDataService} from '../services/tc-case-data.service';

@Injectable({
  providedIn: 'root'
})
export class TcCaseProcessesService {

  constructor(private http: HttpClient, private liveAppsService: LiveAppsService, private caseDataService: TcCaseDataService) { }

  //  This service gets the case state then uses that and the caseRef to get the available actions.
  public getCaseActionsForCaseRef(caseRef: string, sandboxId: number, appId: string, typeId: string): Observable<CaseActionsList> {
    const caseState$ = this.caseDataService.getCaseState(caseRef, sandboxId);
    const caseActions$ = caseState$.pipe(
      flatMap(caseState => {
        return this.getCaseActions(caseRef, sandboxId, appId, typeId, caseState);
      })
    );
    return caseActions$;
  }


// todo: Note this is not a public API - update when Public API available
  public getCaseActions(caseRef: string, sandboxId: number, appId: string, typeId: string, caseState: string): Observable<CaseActionsList> {
    // https://eu.liveapps.cloud.tibco.com/pageflow/caseActions?$sandbox=31&
    // $filter=applicationId%20eq%201742%20and%20caseType%20eq%201%20and%20caseState%20eq%20Responded%20and%20caseRef%20eq%20150491
    const select = 's';
    const url = '/pageflow/v1/caseActions?$sandbox=' + sandboxId
      + '&$filter=applicationId eq ' + appId
      + ' and caseType eq ' + typeId
      + ' and caseState eq ' + caseState
      + ' and caseRef eq ' + caseRef;

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseactions => new CaseActionsList().deserialize(caseactions)));
    }

  private getCaseIDAttributeName = (caseType: CaseType) => {
    let caseIdAttrib: any;
    caseType.attributes.forEach((attribute) => {
      if (attribute.isIdentifier) {
        caseIdAttrib = attribute;
      }
    });
    return caseIdAttrib;
  }

  // this is a helper function that given a case type 'schema' for the whole application will create an LaProcessSelection object
  // containing both the appSchema and particular details for this action
  // this object is required to submit the process later.
  private createLaProcessSelection = (
    schema: CaseTypesList,
    appId: string,
    typeId: string,
    action: CaseAction,
    caseRef: string): LaProcessSelection => {
      let processSelection: LaProcessSelection;
      schema.casetypes.forEach((casetype) => {
          // the schema will contain definitions for both the 'case' and any defined types in that case.
          // We want the schema for this 'case'.
          if (casetype.applicationId === appId && casetype.id === typeId) {
            if (casetype.jsonSchema !== undefined) {
              const caseActionList = casetype.actions ? casetype.actions : [];
              // now find the selected action
              caseActionList.forEach((actionDef) => {
                if (action.id === Number(actionDef.id)) {
                  processSelection = new LaProcessSelection(
                    'action', schema, this.getCaseIDAttributeName(casetype), actionDef,
                    // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
                    (casetype.applicationName + '.' + casetype.applicationInternalName + '.' + 'action' + '.' + actionDef.name),
                    caseRef
                  );
                }
              });
            }
          }
        }
      );
      return processSelection;
  }

    public getProcessDetails(
      caseRef: string,
      appId: string,
      typeId: string,
      sandboxId: number,
      action: CaseAction,
      top: number): Observable<LaProcessSelection> {
        return this.liveAppsService.getCaseTypeSchema(sandboxId, appId, top).pipe(
          map(schema => {
            return this.createLaProcessSelection(schema, appId, typeId, action, caseRef);
            }
          )
        );
    }
}