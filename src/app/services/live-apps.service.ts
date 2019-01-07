import { Injectable, NgModule} from '@angular/core';
import {Observable, of, throwError} from 'rxjs';
import { HttpClientModule, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {
  Group,
  Claim,
  Sandbox,
  AccessToken,
  AuthInfo,
  CaseInfo,
  CaseInfoList,
  CaseTypesList,
  SandboxList,
  CaseTypeStatesList,
  CaseActionsList,
  AuditEventList,
  CaseList,
  SharedStateList,
  SharedStateEntry,
  SharedStateContent,
  DocumentList,
  Document,
  UserInfo,
  ApiResponseText,
  NotesList,
  Note, ThreadList, Thread, NoteThread, NotificationList, CaseType, AppConfig, IconMap, Metadata, UiAppConfig, CaseSearchResults
} from '../models/liveappsdata';
import {catchError, debounceTime, distinctUntilChanged, map, share, shareReplay, switchMap, take, takeUntil, tap} from 'rxjs/operators';
import { Deserializable} from '../models/deserializable';
import {split} from 'ts-node';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})

export class LiveAppsService {
  // these are 'per session' caches. They won't time out unless explicitly cleared or browser is refreshed
  private userInfoCacheMap = new Map();
  private caseTypesCacheMap = new Map();
  private iconSVGTextCacheMap = new Map();

  constructor(
    private http: HttpClient, private location: Location
  ) { }

  public login(username, password): Observable<AccessToken> {
    const url = '/as/token.oauth2';
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('client_id', 'ropc_ipass')
      .set('grant_type', 'password');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, body.toString(), { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map( accessToken => new AccessToken().deserialize(accessToken)));
  }

  public authorize(accessToken: AccessToken, accountId): Observable<AuthInfo> {
    const url = '/idm/v1/login-oauth';
    const body = new HttpParams()
      .set('AccessToken', accessToken.access_token)
      .set('TenantId', 'bpm')
      .set('AccountId', accountId);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, body.toString(), { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map( authInfo => new AuthInfo().deserialize(authInfo)));
  }

  public getSandboxes(): Observable<SandboxList> {
    const url = '/organisation/sandboxes';
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map ( sandboxList => new SandboxList().deserialize(sandboxList)));
  }

  public getApplications(sandboxId: number): Observable<CaseTypesList> {
    const select = 'b';
    const url = '/case/types?$sandbox=' + sandboxId + '&$select=' + select;

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(casetypes => new CaseTypesList().deserialize(casetypes)));
  }

  public getClaims(): Observable<Claim> {
    const url = '/organisation/claims';
    const headers = new HttpHeaders().set('cacheResponse', 'true');
    return this.http.get(url, { headers: headers } )
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map ( claim => new Claim().deserialize(claim)));
  }

  public getCases(sandboxId: number, appId: string, typeId: string, skip: number, top: number): Observable<CaseInfoList> {
    const url = '/case/cases' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
      + appId + ' and typeId eq ' + typeId + '&$skip=' + skip + '&$top=' + top;
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfos => new CaseInfoList().deserialize(caseinfos)));
  }

  public getCasesCount(sandboxId: number, appId: string, typeId: string): Observable<string> {
    const url = '/case/cases' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
      + appId + ' and typeId eq ' + typeId + '&$count=true';

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(casecount => casecount.toString()));
  }

  public getCaseByRef(sandboxId, caseRef: string): Observable<CaseInfo> {
    const url = '/case/cases/' + caseRef
      + '?$sandbox=' + sandboxId;
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfo => new CaseInfo().deserialize(caseinfo))
      );

  }

  public getCase(caseRef: string, sandboxId: number, appId: string, typeId: string ): Observable<CaseInfo> {
    const url = '/case/cases/' + caseRef + '/' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
      + appId + ' and typeId eq ' + typeId + '&$select=uc, m';
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfo => new CaseInfo().deserialize(caseinfo)));
  }

  public caseSearch(terms: Observable<string>, sandboxId: number, appId: string, typeId: string, skip: number, top: number): Observable<CaseSearchResults> {
    return terms
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(term => this.caseSearchEntries(term, sandboxId, appId, typeId, skip, top))
      );
  }

  private caseSearchEntries(term: string, sandboxId: number, appId: string, typeId: string, skip: number, top: number): Observable<CaseSearchResults> {
      const url = '/case/cases' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
        + appId + ' and typeId eq ' + typeId + '&$skip=' + skip + '&$top=' + top
        + '&$search=' + term;
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfos => {
          const caserefs: string[] = [];
            const caseinfolist = new CaseInfoList().deserialize(caseinfos);
            caseinfolist.caseinfos.forEach(caseinfo => {
              caserefs.push(caseinfo.caseReference);
            })
            return new CaseSearchResults().deserialize({ caserefs: caserefs, searchString: term });
          }
        )
      );
  }

  private parseCaseInfo(caseinfo: CaseInfo, sandboxId: number, appId: string, typeId: string, uiAppId): CaseInfo {
    this.getCaseTypeBasicInfo(sandboxId, appId, typeId).subscribe(val => {
      caseinfo.metadata.applicationLabel = val.label;
      return caseinfo;
    }, error => { console.log('Unable to retrieve application details for casetype: ' + error.errorMsg); });
    if (caseinfo.metadata.createdBy) {
      this.getUserInfo(caseinfo.metadata.createdBy).subscribe(val => {
        caseinfo.metadata.createdByDetails = val;
        return caseinfo;
      }, error => { console.log('Unable to retrieve user details for user: ' + error.errorMsg); });
    } else {
      caseinfo.metadata.modifiedByDetails = new UserInfo();
    }
    if (caseinfo.metadata.modifiedBy) {
      this.getUserInfo(caseinfo.metadata.modifiedBy).subscribe(val => {
        caseinfo.metadata.modifiedByDetails = val;
        return caseinfo;
      }, error => { console.log('Unable to retrieve user details for user: ' + error.errorMsg); });
    } else {
      caseinfo.metadata.createdByDetails = new UserInfo();
    }
    this.getAppConfig(appId, uiAppId, true, false).subscribe(val => {
      // state attribute is first in summary
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
        caseinfo.metadata.stateIcon = this.location.prepareExternalUrl('/assets/icons/ic-generic-state.svg');
      }
      if (!caseinfo.metadata.caseTypeColor) {
        caseinfo.metadata.caseTypeColor = '#8197c0';
      }
      if (!caseinfo.metadata.caseTypeIcon) {
        caseinfo.metadata.caseTypeIcon = this.location.prepareExternalUrl('/assets/icons/ic-generic-casetype.svg');
      }


      return caseinfo;
    }, error => { console.log('Unable to retrieve case type config for app: ' + error.errorMsg); });
    return caseinfo;
  }

    public getCaseWithSummary(caseRef: string, sandboxId: number, uiAppId: string): Observable<CaseInfo> {
        const url = '/case/cases/' + caseRef + '/' + '?$sandbox=' + sandboxId + '&$select=uc, m, s';
        return this.http.get(url)
            .pipe(
                tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
                map(caseinfo => {
                  let caseinf = new CaseInfo().deserialize(caseinfo);
                  caseinf = this.parseCaseInfo(caseinf, sandboxId, caseinf.metadata.applicationId, caseinf.metadata.typeId, uiAppId);
                  return caseinf;
                })
            );
    }

  public getCaseTypes(sandboxId: number, appId: string): Observable<CaseTypesList> {
    const select = 'b,s,sa,a';
    let url = '/case/types?$sandbox=' + sandboxId + '&$select=' + select;
    if (appId != null) {
      url = url + '&$filter=applicationId eq ' + appId;
    }

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(casetypes => new CaseTypesList().deserialize(casetypes)));
  }

  public getCaseTypeSchema(sandboxId: number, appId: string): Observable<CaseTypesList> {
    // https://eu.liveapps.cloud.tibco.com/case/v1/types?$sandbox=25&&$filter=applicationName eq 'Customer Complaint'&$select=b,js,c,ac
    const select = 'b,js,c,ac,a';
    let url = '/case/types?$sandbox=' + sandboxId + '&$select=' + select;
    if (appId != null) {
      url = url + '&$filter=applicationId eq ' + appId;
    }
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(casetypes => new CaseTypesList().deserialize(casetypes)));
  }

    public getCaseTypeStates(sandboxId: number, appId: string): Observable<CaseTypeStatesList> {
        const select = 's';
        let url = '/case/types?$sandbox=' + sandboxId + '&$select=' + select;
        if (appId != null) {
            url = url + '&$filter=applicationId eq ' + appId;
        }
        const headers = new HttpHeaders().set('cacheResponse', 'true');
        return this.http.get(url, { headers: headers } )
        // return this.http.get(url)
            .pipe(
                tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
                map(casetypestates => new CaseTypeStatesList().deserialize(casetypestates[0].states)));
    }

    public getCaseTypeBasicInfo(sandboxId: number, appId: string, typeId: string): Observable<CaseType> {
        const select = 'b';
      let url = '/case/types?$sandbox=' + sandboxId + '&$select=' + select;
      if (appId != null) {
        url = url + '&$filter=applicationId eq ' + appId;
      }

      if (!this.caseTypesCacheMap.get(url)) {
        const cacheEntry$ = this.getCaseTypeBasicInfoCached(url, typeId)
          .pipe(
            shareReplay(1)
          );
        this.caseTypesCacheMap.set(url, cacheEntry$);
      }
      return this.caseTypesCacheMap.get(url);
    }

    private getCaseTypeBasicInfoCached(url, typeId) {
      const headers = new HttpHeaders().set('cacheResponse', 'true');
      return this.http.get(url, { headers: headers } )
        .pipe(
          tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
          map(casetypes => {
            const caseTypesList: CaseTypesList = new CaseTypesList().deserialize(casetypes);
            let requestedType: CaseType;
            caseTypesList.casetypes.forEach((casetype) => {
              if (casetype.id === typeId) {
                requestedType = casetype;
              }
            });
            return requestedType;
          })
        );
    }

    public clearFromIconSVGTextCache(url) {
      if (this.iconSVGTextCacheMap.get(url)) {
        this.iconSVGTextCacheMap.delete(url);
      }
    }

    public getIconSVGText(url: string): Observable<string> {
      // todo: revisit the base href issue
      if (url.substr(0, 2) === '//') {
        url = url.substr(1, url.length - 1);
      }
      if (!this.iconSVGTextCacheMap.get(url)) {
        const fixedUrl = window.location.protocol + '//' + window.location.host  + url;
        const cacheEntry$ = this.getIconSVGTextCache(fixedUrl)
          .pipe(
            shareReplay(1)
          );
        this.iconSVGTextCacheMap.set(url, cacheEntry$);
      }
      return this.iconSVGTextCacheMap.get(url);
    }

    private getIconSVGTextCache(url) {
      const headers = new HttpHeaders().set('cacheResponse', 'true');
      return this.http.get(url, {responseType: 'text', headers: headers } )
        .pipe(
          map(val => {
              const svgContents = val.toString();
              return svgContents;
            }
          )
        );
    }

    // note this is not a public API
  public getCaseActions(caseRef: string, sandboxId: number, appId: string, typeId: string, caseState: string): Observable<CaseActionsList> {
    // https://eu.liveapps.cloud.tibco.com/pageflow/caseActions?$sandbox=31&
    // $filter=applicationId%20eq%201742%20and%20caseType%20eq%201%20and%20caseState%20eq%20Responded%20and%20caseRef%20eq%20150491
    const select = 's';
    const url = '/pageflow/caseActions?$sandbox=' + sandboxId
      + '&$filter=applicationId eq ' + appId
      + ' and caseType eq ' + typeId
      + ' and caseState eq ' + caseState
      + ' and caseRef eq ' + caseRef;

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseactions => new CaseActionsList().deserialize(caseactions)));
  }

  public getCaseAudit(caseRef: string, sandboxId: number): Observable<AuditEventList> {
    const select = 's';
    const url = '/event/auditEvents?$sandbox=' + sandboxId
      + '&$filter=type eq \'case\''
      + ' and id eq \'' + caseRef + '\'';

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseaudit => new AuditEventList().deserialize(caseaudit)));
  }

  public getCaseStateAudit(caseRef: string, sandboxId: number): Observable<AuditEventList> {
    const url = '/event/auditEvents?$sandbox=' + sandboxId
      + '&$filter=type eq \'casestate\''
      + ' and id eq \'' + caseRef + '\'';

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseaudit => new AuditEventList().deserialize(caseaudit)));
  }

  private createSharedState(name: string,
                        type: string,
                        description: string,
                        sandboxId: number,
                        attributes: string[],
                        roles: string[],
                        links: string[],
                        content: SharedStateContent): Observable<string> {
    const url = '/clientstate/states';

    const body = {
        'name': name,
        'type': type,
        'description': description,
        'sandboxId': sandboxId,
        'attributes': attributes,
        'roles': roles,
        'links': links,
        content: content
      };
    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(url, bodyStr, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(result => {
          return result.toString();
        })
      );
  }

  private updateSharedState(sharedStateList): Observable<SharedStateList> {
    const url = '/clientstate/states';

    const body = sharedStateList;
    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put(url, bodyStr, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(updatedSharedStateList => new SharedStateList().deserialize(updatedSharedStateList))
      );
  }

  private getSharedState(name: string, type: string, useCache: boolean, flushCache: boolean): Observable<SharedStateList>  {
    const url = '/clientstate/states?$filter=type=' + type
      + ' and name=\'' + name + '\'';
    let options = {};
      let headers: HttpHeaders = new HttpHeaders();
      if (useCache) {
        headers = headers.set('cacheResponse', 'true');
      }
      if (flushCache) {
        headers = headers.set('flushCache', 'true');
      }
      options = { headers: headers };

    /*if (useCache) {
      headers.set('cacheResponse', 'true');
    }*/
     return this.http.get(url, options )
    // return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(sharedStateList => new SharedStateList().deserialize(sharedStateList)));
  }

  private updateCasesRecord(casesContent: SharedStateContent, caseRef: string, toggle: Boolean): SharedStateContent {
    const sharedStateContent: SharedStateContent = new SharedStateContent().deserialize(casesContent);
    const casesRec: CaseList = JSON.parse(sharedStateContent.json);
    let existing = false;
      // check if already exists

    if (caseRef === '-1') {
      // clear list
        casesRec.caseRefs.length = 0;
    } else {
      if (casesRec.caseRefs.indexOf(caseRef) !== -1) {
        // remove it if it is already in the array
        casesRec.caseRefs.splice(casesRec.caseRefs.indexOf(caseRef), 1);
        existing = true;
      }
      if (!toggle || existing === false) {
        // only add it if we are not in toggle mode (favorites) or if the caseRef didnt already exist in the list
        // now add case to front of array
        casesRec.caseRefs.unshift(caseRef);
        // check if we are > max size
        if (casesRec.maxSize !== -1 && casesRec.caseRefs.length > casesRec.maxSize) {
          // remove oldest entry
          casesRec.caseRefs.pop();
        }
      }
    }
    sharedStateContent.json = this.escapeString(JSON.stringify(casesRec));
    return sharedStateContent;
  }

  private newCasesRecord(caseRef: string, maxSize: number): SharedStateContent {
    const casesRec: CaseList = new CaseList();
    casesRec.maxSize = maxSize;
    if (caseRef === '-1') {
      casesRec.caseRefs = [ ];
    } else {
      casesRec.caseRefs = [caseRef];
    }
    casesRec.uniqueKey = 'caseReference';
    const sharedStateContent: SharedStateContent = new SharedStateContent();
    sharedStateContent.json = this.escapeString(JSON.stringify(casesRec));
    return sharedStateContent;
  }

  public getRecentCases(uiAppId: string, sandboxId: number): Observable<CaseList> {
    const ssName = uiAppId + '.recentcases.tibcolabs.client.context.PRIVATE';
    return this.getSSCasesList(ssName, sandboxId);
  }

  private getSSCasesList(ssName: string, sandboxId: number): Observable<CaseList> {
    return this.getSharedState(ssName, 'PRIVATE', false, false)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(sharedStateList => {
          if (sharedStateList.sharedStateEntries.length > 0) {
            return new CaseList().deserialize(JSON.parse(sharedStateList.sharedStateEntries[0].content.json));
          } else {
            return new CaseList();
          }
        }
        )
      );
  }

  public setRecentCase(caseRef: string, uiAppId: string, sandboxId: number) {
    // NOTE: Use '-1' as caseRef to clear recent cases list
    const ssName = uiAppId + '.recentcases.tibcolabs.client.context.PRIVATE';
    this.setCasesRecord(ssName, caseRef, uiAppId, sandboxId, 10, false);
  }

  private setCasesRecord(ssName: string, caseRef: string, uiAppId: string, sandboxId: number, maxSize: number, toggle: boolean) {
    // get cases list from shared state if any
    // update cases data removing oldest if > maxsize
    // set shared state
    let casesEntry: SharedStateEntry;
    this.getSharedState(ssName, 'PRIVATE', false, false)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(sharedStateList => {
            casesEntry = sharedStateList.sharedStateEntries[0] || undefined;
            let content: SharedStateContent;
            if (casesEntry) {
              content = this.updateCasesRecord(casesEntry.content, caseRef, toggle);
              casesEntry.content = content;
              sharedStateList.sharedStateEntries[0] = casesEntry;
              this.updateSharedState(sharedStateList.sharedStateEntries).subscribe();
            } else {
              content = this.newCasesRecord(caseRef, maxSize);
              this.createSharedState(ssName, 'PRIVATE', '', sandboxId, undefined, undefined, undefined, content).subscribe();
            }

            return casesEntry;
          }

        )
      ).subscribe(null, error => console.log('Unable to set recent cases: ' + error));
  }

  public getFavoriteCases(uiAppId: string, sandboxId: number): Observable<CaseList> {
    const ssName = uiAppId + '.favoritecases.tibcolabs.client.context.PRIVATE';
    return this.getSharedState(ssName, 'PRIVATE', false, false)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(sharedStateList => {
          if (sharedStateList.sharedStateEntries.length > 0) {
            return new CaseList().deserialize(JSON.parse(sharedStateList.sharedStateEntries[0].content.json));
          } else {
            return new CaseList();
          }
        }
        )
      );
  }

  public setFavoriteCase(caseRef: string, uiAppId: string, sandboxId: number) {
    // NOTE: Use '-1' as caseRef to clear recent cases list
    const ssName = uiAppId + '.favoritecases.tibcolabs.client.context.PRIVATE';
    this.setCasesRecord(ssName, caseRef, uiAppId, sandboxId, -1, true);
  }

  public isFavoriteCase(caseRef: string, uiAppId: string, sandboxId: number): Observable<boolean> {
    const ssName = uiAppId + '.favoritecases.tibcolabs.client.context.PRIVATE';
    return this.getSSCasesList(ssName, sandboxId)
      .pipe(
        map(caselist => {
          return (caselist.caseRefs.indexOf(caseRef) !== -1);
        })
      );
  }

  public runProcess(sandboxId: number, appId: string, processId: string, caseReference: string, data: any): Observable<any> {
    const url = '/process/processes';
    // convert data to an escaped JSON string
    const dataJson = this.escapeString(JSON.stringify(data));
    const body = {
      'id': processId,
      'sandboxId': sandboxId,
      'applicationId': appId,
      'data': dataJson
    };

    if (caseReference) {
      body['caseReference'] = caseReference;
    }


    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(url, bodyStr, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(response => response)
      );
  }

  public listDocuments(folderType: string, folderId: string, sandboxId: number, filter: string): Observable<DocumentList> {
    let url: string;
    url = '/webresource/v1/' + folderType + '/' + folderId + '/artifacts/';
    if (sandboxId) {
      url = url + '?$sandbox=' + sandboxId;
    }
    if (filter) {
      url = url + '&$filter=contains(name,\'' + filter + '\')';
    }
    return this.http.get(url)
      .pipe(
        map(docs => {
          const docList = new DocumentList().deserialize(docs);
          for (let x = 0; x < docList.documents.length; x++) {
              docList.documents[x] = this.parseDocument(docList.documents[x]);
          }
          return docList;
        }
        )
      );
  }

  private parseDocument(document): Document {
    const splitDocName = document.name.split('.');
    if (splitDocName.length > 1) {
      document.extension = splitDocName[splitDocName.length - 1];
    } else {
      document.extension = '';
    }
    document.fileIcon = this.getIcon(document.extension);
    document.fileSize = this.fileSizeToHuman(Number(document.size));
    this.getUserInfo(document.author).subscribe(val => {
      document.authorDetails = val;
      return document;
    }, error => { console.log('Unable to retrieve user details for user: ' + error.errorMsg); });
    this.getUserInfo(document.lastModifiedBy).subscribe(val => {
      document.lastModifiedByDetails = val;
      return document;
    }, error => { console.log('Unable to retrieve user details for user: ' + error.errorMsg); });
    return document;
  }


  public deleteDocument(folderType: string, folderId: string, documentName: string, sandboxId: number): Observable<ApiResponseText> {
    const url = '/webresource/v1/' + folderType + '/' + folderId + '/artifacts/' + documentName + '?$sandbox=' + sandboxId;
    return this.http.delete(url)
      .pipe(
        map( val => new ApiResponseText().deserialize(val))
      );
  }

  public downloadDocument(folderType: string, folderId: string, docId: string, docVersion: string, sandboxId: number): Observable<any> {
    let url = '/webresource/';
    if (folderType === 'orgFolders') {
      url = url + 'orgFolders/' + folderId;
    } else {
      url = url + 'folders/' + folderId;
    }
    if (sandboxId && folderType !== 'orgFolders') {
      url = url + '/' + sandboxId;
    }
    url = url + '/' + docId + '?$download=true';
    if (docVersion) {
      url = url + '&$version=' + docVersion;
    }
    // todo: Check whether application/octet-stream is ok or whether we should change it
    const headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
    });
    return this.http.get(url, { headers, responseType: 'blob' as 'json' });
  }

  public uploadDocument(folderType: string, folderId: string, sandboxId: number,
                        fileToUpload: File, fileName: string, description: string): Observable<any> {
    let url = '/webresource/v1/' + folderType
      + '/' + folderId
      + '/artifacts/' + fileName + '/upload/';

    if (sandboxId) {
      url = url + '?$sandbox=' + sandboxId;
    }

    if (description) {
      url = url + '&description=' + description;
    }
    const headers = new HttpHeaders({
      'accept': 'application/json',
      'Content-Type': 'multipart/form-data',
      'filename': fileName,
      'enctype': 'multipart/form-data'
    });
    const formData: FormData = new FormData();
    formData.append('artifactContents', fileToUpload);
    return this.http.post(url, formData, { headers: headers, reportProgress: true });
  }

  private getIcon(extension: string): string {
    if (extension === 'txt') {
      return('doc');
    } else if (extension === 'css') {
      return('doc');
    } else if (extension === 'js') {
      return('doc');
    } else if (extension === 'pdf') {
      return('doc');
    } else if (extension === 'xml') {
      return('doc');
    } else if (extension === 'doc') {
      return('doc');
    } else if (extension === 'zip') {
      return('zip');
    } else if (extension === 'ppt') {
      return('doc');
    } else if (extension === 'png') {
      return('image');
    } else {
      return('doc');
    }
  }

  // Since we call get userinfo a lot - and the data doesn't tend to change - I will cache it for the session
  public getUserInfo(userId: string): Observable<UserInfo> {
    const url =  '/organisation/v1/users/' + userId;
    if (!this.userInfoCacheMap.get(userId)) {
      const cacheEntry$ = this.getUserCached(url)
        .pipe(
          shareReplay(1)
        );
      this.userInfoCacheMap.set(userId, cacheEntry$);
    }
      return this.userInfoCacheMap.get(userId);
  }

  private getUserCached(url) {
    const headers = new HttpHeaders().set('cacheResponse', 'true');
    return this.http.get(url, { headers: headers } )
      .pipe(
        map(userinfo => new UserInfo().deserialize(userinfo))
      );
  }

  /* notes service */

  public getThreads(relatedItemType: string, itemTypeId: string): Observable<ThreadList> {
    // https://liveapps.tenant-integration.tcie.pro/collaboration/notes?$relatedItemCollection=CASE_APP_15441&$orderby=createdDate%20ASC
    const url =  '/collaboration/v1/notes?$relatedItemCollection=' + relatedItemType + '_' + itemTypeId
      + '&$orderBy=createdDate ASC';
    return this.http.get(url)
      .pipe(
        map(notes => {
          const returnedNotes = new NotesList().deserialize(notes);
          const threadList: ThreadList = new ThreadList();
          threadList.threads = [];
          // create threads
          returnedNotes.notes.forEach(function(note) {
              if (note.level === 1) {
                const noteThread = new NoteThread(note.thread.id, false, false, false, undefined, [], note);
                // get other threads for this id
                returnedNotes.notes.forEach(function (threadNote) {
                  if (threadNote.level > 1 && threadNote.threadId === note.thread.id) {
                    // add to the thread
                    noteThread.thread.push(threadNote);
                  }
                });
                threadList.threads.push(noteThread);
              }
            });
          return threadList;
        })
      );
  }

  public getNotesForCollections(collectionIds): Observable<NotesList> {
    if (collectionIds) {
      const url = '/collaboration/v1/notes?$relatedItemCollection=' + collectionIds +
        '&$orderby=createdDate ASC';
      return this.http.get(url)
        .pipe(
          map(notes => new NotesList().deserialize(notes))
        );
    }
  }

  public deleteAllNotes() {
  }

  public updateNote(note: Note, noteId: string): Observable<Note> {
    const url = '/collaboration/v1/notes/' + noteId;
    const body = note;
    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.put(url, bodyStr, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map( result => new Note().deserialize(result))
      );
  }

  public createNote(relatedItemType: string,
                    uiAppSource: string,
                    relatedItemId: string,
                    notificationLabel: string,
                    notificationUrl: string,
                    title: string,
                    noteText: string): Observable<number> {
    const url = '/collaboration/v1/notes';
    const note = new Note().deserialize(
      {
        attributes: [],
        notificationLabel: notificationLabel,
        notificationUrl: notificationUrl,
        text: noteText,
        title: title
      }
    );
    const body = {
      note: note,
      relatedItemCollection: [
        (relatedItemType + '_' + relatedItemId)
      ],
      relatedItemId: relatedItemId,
      relatedItemType: uiAppSource,
      roles: undefined
    };
    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(url, bodyStr, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(result => Number(result))
      );
  }

  public getNote(noteId: number): Observable<Note> {
    const url = '/collaboration/v1/notes/' + noteId;
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(note => new Note().deserialize(note)
        )
      );
  }

  public getThread(relatedItemType: string, relatedItemId: string, threadId: number) {
    const url = '/collaboration/v1/notes/?$relatedItemType=' + relatedItemType
      + '&relatedItemId=' + relatedItemId
      + '&filter=threadId=' + threadId
      + '&orderby=createdDate ASC';
      return this.http.get(url)
        .pipe(
          tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
          map(notes => new NotesList().deserialize(notes)
          )
        );
  }

  public createReplyNote(originalNote: Note, reply: string, noteId: string): Observable<number> {
    const url = '/collaboration/v1/notes/' + noteId;
    const body = {
      notificationLabel: originalNote.notificationLabel,
      notificationUrl: originalNote.notificationUrl,
      text: reply
    };
    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(url, bodyStr, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(value => Number(value))
      );
  }

  public subscribeToNotes(relatedItemType, relatedTypeId) {
    const url = '/collaboration/notifications';
    const body = {
      topicId: undefined,
      threadId: undefined,
      notifyCollection: {
        collectionName: relatedItemType + '_' + relatedTypeId,
        lifecycledWithType: 'RT_CASE',
        lifecycledWithId: true
      }
    };
    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(url, bodyStr, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  public unsubscribeToNotes(relatedItemType, relatedTypeId, userId) {
    let url = '/collaboration/notifications?$filter=collectionName=';
    url = url + '\'' + relatedItemType + '_' + relatedTypeId + '\' and entityId=' + userId;
    return this.http.delete(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  public getNotifications(relatedItemType, relatedTypeId, userId): Observable<NotificationList> {
    const url = '/collaboration/notifications?$filter=collectionName=\'' + relatedItemType + '_' + relatedTypeId
            + '\' and entityId=' + userId;
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(value => new NotificationList().deserialize(value))
      );
  }

  public deleteNote(noteId: number) {
    const url = '/collaboration/v1/notes/' + noteId;
    return this.http.delete(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  /* end notes service */

  /* app state config */

  public getAppConfig(appId: string, uiAppId: string, useCache: boolean, flushCache: boolean): Observable<AppConfig> {
    // if useCache is false this will trigger the service to update the cached version with latest
    const ssName = uiAppId + '.' + appId + '.stateconfig.tibcolabs.client.context.PUBLIC';
    // const url = 'assets/config/statemaps/'
    //  + appId + '.json';
    /* const headers = new HttpHeaders().set('cacheResponse', 'true');
      return this.http.get(url, { headers: headers })
      .pipe(
        map(value => new AppConfig().deserialize(value))
      );*/

    return this.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
      .pipe(
        map( value => {
          if (value.sharedStateEntries.length > 0) {
            const ssresult = new AppConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
            ssresult.id = value.sharedStateEntries[0].id;
            return ssresult;
          } else {
            return undefined;
          }
        }
      )
      );
  }

  public createAppConfig(sandboxId: number, appId: string, uiAppId: string): Observable<string> {
    const ssName = uiAppId + '.' + appId + '.stateconfig.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = this.escapeString(JSON.stringify([]));
    return this.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
      .pipe(
        map(value => value)
      );
  }

  public updateAppConfig(sandboxId: number, appId: string, uiAppId: string, config: AppConfig, id: string): Observable<AppConfig> {
    const ssName = uiAppId + '.' + appId + '.stateconfig.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = this.escapeString(JSON.stringify(config));
    const entry: SharedStateEntry = new SharedStateEntry();
    entry.content = content;
    entry.sandboxId = sandboxId;
    entry.name = ssName;
    entry.type = 'PUBLIC';
    entry.id = id;
    const ssList: SharedStateList = new SharedStateList();
    ssList.sharedStateEntries = [];
    ssList.sharedStateEntries.push(entry);
    return this.updateSharedState(ssList.sharedStateEntries)
      .pipe(
        map(value => {
          return new AppConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
        })
      );
  }

  /* app state config */

  /* Ui App Config */

  public getUiAppConfig(uiAppId: string, useCache: boolean, flushCache: boolean): Observable<UiAppConfig> {
    // if useCache is false this will trigger the service to update the cached version with latest
    const ssName = uiAppId + '.config.tibcolabs.client.context.PUBLIC';

    return this.getSharedState(ssName, 'PUBLIC', useCache, flushCache)
      .pipe(
        map( value => {
            if (value.sharedStateEntries.length > 0) {
              const ssresult = new UiAppConfig().deserialize(JSON.parse(value.sharedStateEntries[0].content.json));
              ssresult.id = value.sharedStateEntries[0].id;
              return ssresult;
            } else {
              return undefined;
            }
          }
        )
      );
  }

  public createUiAppConfig(sandboxId: number, uiAppConfig: UiAppConfig, uiAppId: string): Observable<string> {
    const ssName = uiAppId + '.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = this.escapeString(JSON.stringify(uiAppConfig));
    return this.createSharedState(ssName, 'PUBLIC', '', sandboxId, undefined, undefined, undefined, content)
      .pipe(
        map(value => value)
      );
  }

  public updateUiAppConfig(sandboxId: number, uiAppConfig: UiAppConfig, uiAppId: string, id: string): Observable<UiAppConfig> {
    const ssName = uiAppId + '.config.tibcolabs.client.context.PUBLIC';
    const content: SharedStateContent = new SharedStateContent();
    content.json = this.escapeString(JSON.stringify(uiAppConfig));
    const entry: SharedStateEntry = new SharedStateEntry();
    entry.content = content;
    entry.sandboxId = sandboxId;
    entry.name = ssName;
    entry.type = 'PUBLIC';
    entry.id = id;
    const ssList: SharedStateList = new SharedStateList();
    ssList.sharedStateEntries = [];
    ssList.sharedStateEntries.push(entry);
    return this.updateSharedState(ssList.sharedStateEntries)
      .pipe(
        map(value => {
          return new UiAppConfig().deserialize((JSON.parse(value.sharedStateEntries[0].content.json)));
        })
      );
  }

  /* UI App Config */


  public fileSizeToHuman(size) {
    const e = (Math.log(size) / Math.log(1e3)) | 0;
    return +(size / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B';
  }

  private escapeString(text) {
    return text
      .replace(/"/g, '\"');
  }

}
