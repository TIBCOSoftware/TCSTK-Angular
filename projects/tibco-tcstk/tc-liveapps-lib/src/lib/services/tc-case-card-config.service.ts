import {Injectable} from '@angular/core';
import {
  SharedStateContent,
  SharedStateEntry,
  SharedStateList,
  TcCoreCommonFunctions,
  TcSharedStateService,
  UiAppConfig
} from '@tibco-tcstk/tc-core-lib';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import {ApiResponseError, CardConfig, CaseInfo, CaseTypeState, CaseTypeStatesList, IconMap, UserInfo} from '../models/liveappsdata';
import {LiveAppsService} from './live-apps.service';
import {CaseCardConfig, StateColorMap, StateColorMapRec} from '../models/tc-case-card-config';
import {catchError, flatMap, map, mergeMap, tap} from 'rxjs/operators';
import {flush} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';
import {TcAppDefinitionService} from './tc-app-definition.service';

export const DEFAULT_COLORS: string[] = [
  '#3E94C0', '#49B3D3', '#76C6CF', '#A9DACD', '#DCECC9',
  '#FFAB40', '#FFD180', '#FFE0B2', '#FFF3E0', '#81D4FA',
  '#B3E5FC', '#8AF2F2', '#91A3AE', '#CED8DD', '#EBEFF1',
  '#6A1B9A', '#AD1457', '#EC407A', '#C4469E', '#BA68C8',
  '#8C9EFF', '#FF8A80', '#546F7A', '#263237'
];

export const DEFAULT_TYPE_COLOR = '#8197c0';

export const DEFAULT_STATE_COLOR = '#8197c0';

export const GENERIC_STATE_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 14 14">\n' +
  '    <path fill="<DYNAMICFILL>" fill-rule="nonzero" d="M.045 1.154h13.91v2.133H.045V1.154zM.8 4.75h12.364v8.19c0 .596-.487 1.083-1.082 1.083h-10.2A1.085 1.085 0 0 1 .8 12.94V4.75zm7.978 2.447V5.776H5.222v1.421h3.556z"/>\n' +
  '</svg>\n';

export const GENERIC_CASETYPE_ICON_SVG = '<svg xmlns="http://www.w3.org/2000/svg" width="14" height="14" viewBox="0 0 48 48">\n' +
  '    <path fill="<DYNAMICFILL>" fill-rule="evenodd" d="M42 42H6c-1.103 0-2-.898-2-2V26.61c4.43 2.623 10.208 3.96 15.729 4.422v1.504c0 1.326.948 2.4 2.118 2.4h4.764c1.17 0 2.118-1.074 2.118-2.4V31.04c6.16-.503 11.505-2.008 15.271-4.264v13.223c0 1.103-.897 2-2 2zM6 15.995h36c1.103 0 2 .898 2 2v3.583c-2.798 2.727-8.447 4.664-15.271 5.268v-1.511c0-1.326-.948-2.4-2.117-2.4h-4.765c-1.17 0-2.118 1.074-2.118 2.4v1.51c-6.651-.6-12.41-2.518-15.729-5.348v-3.501c0-1.103.897-2 2-2zm10.655-8.89c0-.063.023-.098.016-.106l14.944-.011s.04.033.04.117v4.89h-15v-4.89zM42 11.996h-6.345v-4.89C35.655 4.842 33.861 3 31.657 3H16.653c-2.204 0-3.998 1.842-3.998 4.106v4.89H6c-3.308 0-6 2.692-6 6V40c0 3.31 2.692 6 6 6h36c3.309 0 6-2.69 6-6V17.997c0-3.31-2.691-6.001-6-6.001z"/>\n' +
  '</svg>\n';

@Injectable({
  providedIn: 'root'
})
export class TcCaseCardConfigService {

  constructor(private http: HttpClient, private liveAppsService: LiveAppsService, private sharedStateService: TcSharedStateService, private appDefinitionService: TcAppDefinitionService, private location: Location) {
  }

  public createCardConfig(sandboxId: number, appId: string, uiAppId: string): Observable<string> {
    const ssName = uiAppId + '.' + appId + '.stateconfig.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify({}));
    return this.sharedStateService.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
      .pipe(
        map(value => {
            return value;
          }
        )
      );
  }

  public updateCardConfig(sandboxId: number, appId: string, uiAppId: string, config: CardConfig, id: string): Observable<CardConfig> {
    const ssName = uiAppId + '.' + appId + '.stateconfig.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = TcCoreCommonFunctions.escapeString(JSON.stringify(config));
    const entry: SharedStateEntry = new SharedStateEntry();
    entry.content = content;
    entry.sandboxId = sandboxId;
    entry.name = ssName;
    entry.type = 'PUBLIC';
    entry.id = id;
    const ssList: SharedStateList = new SharedStateList();
    ssList.sharedStateEntries = [];
    ssList.sharedStateEntries.push(entry);
    return this.sharedStateService.updateSharedState(ssList.sharedStateEntries)
      .pipe(
        flatMap(value => {
          // flush the cache and return new value
          // return new CardConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
          return this.getCardConfig(uiAppId, appId, true, true);
        })
      );
  }

  public createNewCardConfig(states: CaseTypeState[], sandboxId: number, appId: string, uiAppId: string, caseTypeId: string, defaultCaseTypeColor: string, defaultCaseTypeIcon: string, defaultStateColor: string, defaultStateIcon: string): Observable<CaseCardConfig> {
    // create new config and return it
    const newConfig$ = this.createCardConfig(sandboxId, appId, uiAppId);
    const updatedConfig$ = newConfig$.pipe(
      flatMap(id => {
        const stateMap: IconMap[] = [];
        // one record for the case type icon config
        stateMap.push(new IconMap(true, caseTypeId, defaultCaseTypeColor, defaultCaseTypeIcon));
        states.forEach(state => {
          stateMap.push(new IconMap(false, state.value, defaultStateColor, defaultStateIcon));
        });
        const newCardConfig = new CardConfig().deserialize({id: id, useCaseTypeColor: true, stateMap: stateMap});
        return this.updateCardConfig(sandboxId, appId, uiAppId, newCardConfig, id).pipe(
          tap(config => {
            // trigger update of the cache
            this.getCardConfig(uiAppId, appId, true, true);
          }),
          map(newcard => {
            return new CaseCardConfig().deserialize(
              {states: states, cardConfig: newcard}
            );
          })
        );
      })
    );
    return updatedConfig$;
  }

  public getCaseCardConfig(sandboxId: number, appId: string, uiAppId: string, caseTypeId: string, defaultCaseTypeColor: string, defaultCaseTypeIcon: string, defaultStateColor: string, defaultStateIcon: string): Observable<CaseCardConfig> {

    const states = this.appDefinitionService.getCaseTypeByAppId(appId).states;
    const cardConfig$ = this.getCardConfig(uiAppId, appId, true, false);
    return cardConfig$.pipe(
      flatMap((config: CardConfig) => {
          if (config) {
            const cardConfig = new CaseCardConfig().deserialize(
              {states: states, cardConfig: config}
            );
            return of(cardConfig);
          } else {
            // create new one
            return this.createNewCardConfig(states, sandboxId, appId, uiAppId, caseTypeId, defaultCaseTypeColor, defaultCaseTypeIcon, defaultStateColor, defaultStateIcon).pipe(
              map((newCardConfig: CaseCardConfig) => {
                return newCardConfig;
              })
            );
          }
        }
      )
    );
  }

  public updateCaseCardConfig(sandboxId: number, appId: string, uiAppId: string, updatedConfig: CaseCardConfig): Observable<CaseCardConfig> {
    return this.updateCardConfig(sandboxId, appId, uiAppId, updatedConfig.cardConfig, updatedConfig.cardConfig.id).pipe(
      map(cardconfig => {
        updatedConfig.cardConfig = cardconfig;
        // remember to flush cache
        this.getCardConfig(uiAppId, appId, true, true).subscribe();
        return updatedConfig;
      })
    );
  }

  public getCardConfig(uiAppId: string, appId: string, useCache: boolean, flushCache: boolean): Observable<CardConfig> {
    const ssName = uiAppId + '.' + appId + '.stateconfig.tibcolabs.client.context.PUBLIC';
    return this.sharedStateService.getSharedState(ssName, 'PUBLIC', useCache, flushCache).pipe(
      map(value => {
          if (value.sharedStateEntries.length > 0) {
            const ssresult = new CardConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
            ssresult.id = value.sharedStateEntries[0].id;
            return ssresult;
          } else {
            return undefined;
          }
        }
      )
    );
  }

  public getStateColorInfo(appId: string, uiAppId: string): Observable<StateColorMap> {
    return this.getCardConfig(uiAppId, appId, true, false).pipe(
      map(val => {
        if (val) {
          const config: CardConfig = val;
          const stateColorMap = new StateColorMap();
          stateColorMap.stateColorRecs = [];
          config.stateMap.forEach((stateMapRec) => {
            const stateColorMapRec = new StateColorMapRec().deserialize({state: stateMapRec.state, color: stateMapRec.fill});
            if (stateMapRec.isCaseType) {
              stateColorMap.caseTypeColor = stateMapRec.fill;
            }
            stateColorMap.stateColorRecs.push(stateColorMapRec);
          });
          return stateColorMap;
        } else {
          return new StateColorMap();
        }
      })
    );
  }

  public getColorForState(appId: string, uiAppId: string, state: string): Observable<string> {
    return this.getCardConfig(uiAppId, appId, true, false).pipe(
      map(val => {
        const stateMap = val.stateMap.find((stateRec) => {
          return stateRec.state === state;
        });
        return (stateMap ? stateMap.fill : undefined);
      })
    );
  }

  public parseCaseInfo(caseinfo: CaseInfo, sandboxId: number, appId: string, typeId: string, uiAppId): Observable<CaseInfo> {
    // in order to get all the info we need we actually need to call up to 4 observables in parallel
    const caseInfo$ = this.liveAppsService.getCaseTypeBasicInfo(sandboxId, appId, typeId, 100).pipe(
      map(val => caseinfo.metadata.applicationLabel = val.label)
    );
    const cardConfig$ = this.getCardConfig(uiAppId, appId, true, false).pipe(
      map(val => {
          const stateId = caseinfo.summaryObj.state;
          let stateConfig: IconMap;
          if (val !== undefined && val.stateMap) {
            val.stateMap.forEach((state) => {
              if (state.state === stateId) {
                stateConfig = state;
                caseinfo.metadata.stateColor = stateConfig.fill;
                caseinfo.metadata.stateIcon = stateConfig.icon;
              }
              if (state.isCaseType) {
                stateConfig = state;
                caseinfo.metadata.caseTypeColor = stateConfig.fill;
                caseinfo.metadata.caseTypeIcon = stateConfig.icon;
              }
              caseinfo.metadata.useCaseTypeColor = val.useCaseTypeColor ? val.useCaseTypeColor : false;
            });
          }
          // defaults
          if (!caseinfo.metadata.stateColor) {
            caseinfo.metadata.stateColor = DEFAULT_STATE_COLOR;
          }
          if (!caseinfo.metadata.stateIcon) {
            caseinfo.metadata.stateIcon = 'assets/icons/ic-generic-state.svg';
          }
          if (!caseinfo.metadata.caseTypeColor) {
            caseinfo.metadata.caseTypeColor = DEFAULT_TYPE_COLOR;
          }
          if (!caseinfo.metadata.caseTypeIcon) {
            caseinfo.metadata.caseTypeIcon = 'assets/icons/ic-generic-casetype.svg';
          }
        }
      ));
    const forkJoinArray = [caseInfo$, cardConfig$];
    let creatorInfo$;
    let modifiedInfo$;
    if (caseinfo.metadata.createdBy) {
      creatorInfo$ = this.liveAppsService.getUserInfo(caseinfo.metadata.createdBy).pipe(
        map(val => caseinfo.metadata.createdByDetails = val ? val : new UserInfo())
      );
      forkJoinArray.push(creatorInfo$);
    } else {
      caseinfo.metadata.createdByDetails = new UserInfo();
    }
    if (caseinfo.metadata.modifiedBy) {
      modifiedInfo$ = this.liveAppsService.getUserInfo(caseinfo.metadata.modifiedBy).pipe(
        map(val => caseinfo.metadata.modifiedByDetails = val ? val : new UserInfo())
      );
      forkJoinArray.push(modifiedInfo$);
    } else {
      caseinfo.metadata.modifiedByDetails = new UserInfo();
    }

    // call all the observables at once and return the Observable to the parsed CaseInfo
    return forkJoin(forkJoinArray).pipe(
      map(resultArr => {
        return caseinfo;
      })
    );
  }

  public getCaseWithSummary(caseRef: string, sandboxId: number, uiAppId: string): Observable<CaseInfo> {
    // get the base caseinfo from the API, then call parseCaseInfo to create an Observable with all the extra data we need
    const url = '/case/v1/cases/' + caseRef + '/' + '?$sandbox=' + sandboxId + '&$select=cr, uc, m, s';

    return this.http.get(url).pipe(
      mergeMap(caseinfo => {
          const caseinf = new CaseInfo().deserialize(caseinfo);
          if (caseinf.caseReference === undefined) {
            // case is likely no longer visible to this user so handle as deleted
            return of(new CaseInfo().deserialize({deleted: true}));
          }
          return this.parseCaseInfo(caseinf, sandboxId, caseinf.metadata.applicationId, caseinf.metadata.typeId, uiAppId);
        }
      ),
      catchError(err => {
        if (err.error.errorCode === 'CM_CASEREF_NOTEXIST') {
          // case deleted
          return of(new CaseInfo().deserialize({deleted: true}));
        }
        return throwError(err);
      })
    );
  }
}
