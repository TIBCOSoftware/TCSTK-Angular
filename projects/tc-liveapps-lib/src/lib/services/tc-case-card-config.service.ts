import {Injectable} from '@angular/core';
import {SharedStateContent, SharedStateEntry, SharedStateList, TcCoreCommonFunctions, TcSharedStateService, UiAppConfig} from 'tc-core-lib';
import {forkJoin, Observable, of} from 'rxjs';
import {CardConfig, CaseInfo, CaseTypeState, CaseTypeStatesList, IconMap, UserInfo} from '../models/liveappsdata';
import {LiveAppsService} from '../services/live-apps.service';
import {CaseCardConfig} from '../models/tc-case-card-config';
import {map, mergeMap, tap} from 'rxjs/operators';
import {flush} from '@angular/core/testing';
import {HttpClient} from '@angular/common/http';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TcCaseCardConfigService {

  constructor(private http: HttpClient, private liveAppsService: LiveAppsService, private sharedStateService: TcSharedStateService, private location: Location) {
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
        map(value => {
          return new CardConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
        })
      );
  }

  public createNewCardConfig(states: CaseTypeState[], sandboxId: number, appId: string, uiAppId: string, caseTypeId: string, defaultCaseTypeColor: string, defaultCaseTypeIcon: string, defaultStateColor: string, defaultStateIcon: string): Observable<CaseCardConfig> {
    // create new config and return it
    const newConfig$ = this.createCardConfig(sandboxId, appId, uiAppId);
    const updatedConfig$ = newConfig$.pipe(
      mergeMap(id => {
        const stateMap: IconMap[] = [];
        // one record for the case type icon config
        stateMap.push(new IconMap(true, caseTypeId, defaultCaseTypeColor, defaultCaseTypeIcon));
        states.forEach(state => {
          stateMap.push(new IconMap(false, state.value, defaultStateColor, defaultStateIcon));
        });
        const newCardConfig = new CardConfig().deserialize({ id: id, stateMap: stateMap });
        return this.updateCardConfig(sandboxId, appId, uiAppId, newCardConfig, id).pipe(
          tap(config => {
            // trigger update of the cache
            this.getCardConfig(uiAppId, appId, true, true);
          }),
          map(newcard => {
              return new CaseCardConfig().deserialize(
                { states: states, cardConfig: newcard }
              );
          })
        );
      })
    );
    return updatedConfig$;
  }

  public getCaseCardConfig(sandboxId: number, appId: string, uiAppId: string, caseTypeId: string, defaultCaseTypeColor: string, defaultCaseTypeIcon: string, defaultStateColor: string, defaultStateIcon: string): Observable<CaseCardConfig> {
    const states$ = this.liveAppsService.getCaseTypeStates(sandboxId, appId, 100);
    const cardConfig$ = this.getCardConfig(uiAppId, appId, true, false).pipe(
      map(config => {
          return config;
      })
    );
    return states$.pipe(
      mergeMap(states => {
        return cardConfig$.pipe(
          mergeMap(config => {
            if (config) {
              const cardConfig = new CaseCardConfig().deserialize(
                {states: states.states, cardConfig: config}
              );
              return of(cardConfig);
            } else {
              return this.createNewCardConfig(states.states, sandboxId, appId, uiAppId, caseTypeId, defaultCaseTypeColor, defaultCaseTypeIcon, defaultStateColor, defaultStateIcon).pipe(
                map(newCardConfig => {
                  return newCardConfig;
                })
              );
            }
          }
          )
        );
      })
    );
  }

  public updateCaseCardConfig(sandboxId: number, appId: string, uiAppId: string, updatedConfig: CaseCardConfig): Observable < CaseCardConfig > {
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
            });
          }
          // defaults
          if (!caseinfo.metadata.stateColor) {
            caseinfo.metadata.stateColor = '#8197c0';
          }
          if (!caseinfo.metadata.stateIcon) {
            caseinfo.metadata.stateIcon = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-generic-state.svg');
          }
          if (!caseinfo.metadata.caseTypeColor) {
            caseinfo.metadata.caseTypeColor = '#8197c0';
          }
          if (!caseinfo.metadata.caseTypeIcon) {
            caseinfo.metadata.caseTypeIcon = TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, 'assets/icons/ic-generic-casetype.svg');
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
    const url = '/case/v1/cases/' + caseRef + '/' + '?$sandbox=' + sandboxId + '&$select=uc, m, s';
    return this.http.get(url).pipe(
      mergeMap(caseinfo => {
          const caseinf = new CaseInfo().deserialize(caseinfo);
          return this.parseCaseInfo(caseinf, sandboxId, caseinf.metadata.applicationId, caseinf.metadata.typeId, uiAppId);
        }
      )
    );
  }
}
