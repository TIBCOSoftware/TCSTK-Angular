import { Injectable, NgModule} from '@angular/core';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import { HttpClientModule, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {
  CaseInfo,
  CaseInfoList,
  CaseTypesList,
  CaseTypeStatesList,
  CaseActionsList,
  CaseList,
  UserInfo,
  ApiResponseText,
  NotesList,
  Note,
  ThreadList,
  Thread,
  NoteThread,
  NotificationList,
  CaseType,
  CardConfig,
  IconMap,
  Metadata,
  CaseSearchResults,
  CaseTypeStatesListList,
  UsersInfo
} from '../models/liveappsdata';
import {  DocumentList, Document} from '../models/tc-document';
import {
  AccessToken,
  AuthInfo,
  SharedStateList,
  SharedStateEntry,
  SharedStateContent,
  TcSharedStateService,
  UiAppConfig,
  TcCoreCommonFunctions,
  Group,
  Claim,
  Sandbox,
  SandboxList
} from '@tibco-tcstk/tc-core-lib';
import {Groups} from '../models/tc-groups-data';
import {
  catchError,
  debounceTime,
  distinctUntilChanged,
  map,
  mergeMap,
  share,
  shareReplay,
  switchMap,
  take,
  takeUntil,
  tap
} from 'rxjs/operators';
import { Deserializable} from '@tibco-tcstk/tc-core-lib';
import {split} from 'ts-node';
import {Location} from '@angular/common';
import {StateTrackerData} from '../models/tc-case-states';

@Injectable({
  providedIn: 'root'
})

export class LiveAppsService {
  // these are 'per session' caches. They won't time out unless explicitly cleared or browser is refreshed
  private claimsCacheMap = new Map();
  private userInfoCacheMap = new Map();
  private caseTypesCacheMap = new Map();
  private iconSVGTextCacheMap = new Map();

  constructor(
    private http: HttpClient, private location: Location, private sharedStateService: TcSharedStateService) { }

  public getSandboxes(): Observable<SandboxList> {
    const url = '/organisation/v1/sandboxes';
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map ( sandboxList => new SandboxList().deserialize(sandboxList)));
  }

  public getApplications(sandboxId: number, appIds: string[], top: number, useCache: boolean): Observable<CaseTypesList> {
    const select = 'b';
    let url = '/case/v1/types?$sandbox=' + sandboxId + '&$select=' + select + '&$top=' + top;

    if (appIds && appIds.length > 0) {
      url = url + '&$filter=applicationId in(' + appIds.toString() + ') and isCase eq TRUE';
    }
    // note: since this is cached it will require a reload to see new apps
    let headers;
    if (useCache) {
      headers = new HttpHeaders().set('cacheResponse', 'true');
    } else {
      headers = new HttpHeaders();
    }


    return this.http.get(url, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(casetypes => {
          if (appIds && appIds.length > 0) {
            // This is to workaround a bug where non case type types are returned when > 1 appId
            const tmpCaseTypes = new CaseTypesList().deserialize(casetypes);
            const filteredCaseTypes = new CaseTypesList().deserialize( { casetypes: [] });

            tmpCaseTypes.casetypes.forEach(ctype => {
              if (ctype.id === '1') {
                filteredCaseTypes.casetypes.push(ctype);
              }
            });
            return filteredCaseTypes;
          } else {
            return new CaseTypesList().deserialize(casetypes);
          }
        }));
  }

  public getClaims(disableCache?: boolean): Observable<Claim> {
    const url = '/organisation/v1/claims';
    let headers;
    if (!disableCache) {
      headers = new HttpHeaders().set('cacheResponse', 'true');
    }
    return this.http.get(url, { headers: headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map ( claim => new Claim().deserialize(claim)));
  }

  public getCases(sandboxId: number, appId: string, typeId: string, skip: number, top: number): Observable<CaseInfoList> {
    const url = '/case/v1/cases' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
      + appId + ' and typeId eq ' + typeId + '&$skip=' + skip + '&$top=' + top;
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfos => new CaseInfoList().deserialize(caseinfos)));
  }

  public getCasesCount(sandboxId: number, appId: string, typeId: string): Observable<string> {
    const url = '/case/v1/cases' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
      + appId + ' and typeId eq ' + typeId + '&$count=true';

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(casecount => casecount.toString()));
  }

  public getCaseByRef(sandboxId, caseRef: string): Observable<CaseInfo> {
    const url = '/case/v1/cases/' + caseRef
      + '?$sandbox=' + sandboxId;
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfo => new CaseInfo().deserialize(caseinfo))
      );
  }

  public getCase(caseRef: string, sandboxId: number, appId: string, typeId: string ): Observable<CaseInfo> {
    const url = '/case/v1/cases/' + caseRef + '/' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
      + appId + ' and typeId eq ' + typeId + '&$select=uc, m';
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfo => new CaseInfo().deserialize(caseinfo)));
  }

  public caseSearch(terms: Observable<string>, sandboxId: number, appId: string, typeId: string, skip: number, top: number, stateId: number): Observable<CaseSearchResults> {
    return terms
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(term => this.caseSearchEntries(term, sandboxId, appId, typeId, false, skip, top, stateId))
      );
  }

  public caseSearchEntries(term: string, sandboxId: number, appId: string, typeId: string, force: boolean, skip: number, top: number, stateId: number): Observable<CaseSearchResults> {
      let url = '/case/v1/cases' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
        + appId + ' and typeId eq ' + typeId;;
      if (stateId) {
        url = url + ' and stateId eq ' + stateId;
      }
      url = url + '&$skip=' + skip + '&$top=' + top
        + '&$select=cr';
      if (term || (!term && !force)) {
        url = url + '&$search=' + term;
      }

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

  private combinedSearch = (appId: string[], sandboxId: number, term: string, force: boolean, skip: number, top: number, stateId: number): Observable<CaseSearchResults> => {
    // for each appId create an obervable
    const forkJoinArray$ = [];
    appId.forEach(app => {
      forkJoinArray$.push(this.caseSearchEntries(term, sandboxId, app, '1', force, skip, top, stateId));
    })

    // run all three calls in parallel
    return forkJoin(forkJoinArray$).pipe(
      map(resultArr => {
        const results = new CaseSearchResults();
        results.searchString = term;
        // combine results into a single array
        resultArr.forEach((res: CaseSearchResults) => {
            results.caserefs = results.caserefs.concat(res.caserefs);
        });
        return results;
      })
    );
  }

  public getCaseTypes(sandboxId: number, appId: string, top: number, allData?: boolean): Observable<CaseTypesList> {
    let select = 'b,s,sa,a';
    if (allData) {
      select = 'b,a,sa,s,js,c,ac';
    }
    let url = '/case/v1/types?$sandbox=' + sandboxId + '&$select=' + select + '&$top=' + top;
    if (appId != null) {
      url = url + '&$filter=applicationId eq ' + appId;
    }

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(casetypes => new CaseTypesList().deserialize(casetypes)));
  }

  public getCaseTypeSchema(sandboxId: number, appId: string, top: number): Observable<CaseTypesList> {
    // https://eu.liveapps.cloud.tibco.com/case/v1/types?$sandbox=25&&$filter=applicationName eq 'Customer Complaint'&$select=b,js,c,ac
    const select = 'b,js,c,ac,a';
    let url = '/case/v1/types?$sandbox=' + sandboxId + '&$select=' + select + '&$top=' + top;
    if (appId != null) {
      url = url + '&$filter=applicationId eq ' + appId;
    }
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(casetypes => {
          const ct = new CaseTypesList().deserialize(casetypes);
          ct.casetypes.forEach(ctype => {
            if (ctype.actions) {
              ctype.actions.forEach(action => {
                // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
                action.formTag = ctype.applicationName + '.' + ctype.applicationInternalName + '.action.' + action.name;
                action.processType = 'action';
              });
            }
            if (ctype.creators) {
              ctype.creators.forEach(creator => {
                // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
                creator.formTag = ctype.applicationName + '.' + ctype.applicationInternalName + '.creator.' + creator.name;
                creator.processType = 'creator';
              });
            }
          })
          return ct;
        }
        )
        );
  }

    public getCaseTypeStates(sandboxId: number, appId: string, top: number): Observable<CaseTypeStatesList> {
        const select = 's';
        let url = '/case/v1/types?$sandbox=' + sandboxId + '&$select=' + select  + '&$top=' + top;
        if (appId != null) {
            url = url + '&$filter=applicationId eq ' + appId;
        }
        const headers = new HttpHeaders().set('cacheResponse', 'true');
        return this.http.get(url, { headers: headers })
        // return this.http.get(url)
            .pipe(
                tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
                map(casetypestates => {
                  // const x = new CaseTypeStatesList().deserialize(casetypestates[0].states);
                  // return x;

                  const casetypelist = new CaseTypeStatesListList().deserialize(casetypestates);
                  let states: CaseTypeStatesList;
                  casetypelist.casetypes.forEach((casetype) => {
                    if (casetype.states !== undefined) {
                      states = new CaseTypeStatesList().deserialize(casetype.states);
                    }
                  });
                  return states;
                }
                ));
    }

    public getCaseTypeBasicInfo(sandboxId: number, appId: string, typeId: string, top: number): Observable<CaseType> {
        const select = 'b';
      let url = '/case/v1/types?$sandbox=' + sandboxId + '&$select=' + select + '&$top=' + top;
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
      return this.http.get(url, { headers: headers })
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
      url = url;
      if (!this.iconSVGTextCacheMap.get(url)) {
        // const fixedUrl = window.location.protocol + '//' + window.location.host  + url;
        const cacheEntry$ = this.getIconSVGTextCache(url)
          .pipe(
            shareReplay(1)
          );
        this.iconSVGTextCacheMap.set(url, cacheEntry$);
      }
      return this.iconSVGTextCacheMap.get(url);
    }

    private getIconSVGTextCache(url) {
      const headers = new HttpHeaders().set('cacheResponse', 'true');
      return this.http.get(url, {responseType: 'text', headers: headers })
        .pipe(
          map(val => {
              const svgContents = val.toString();
              return svgContents;
            }
          )
        );
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
    sharedStateContent.json = TcCoreCommonFunctions.escapeString(JSON.stringify(casesRec));
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
    sharedStateContent.json = TcCoreCommonFunctions.escapeString(JSON.stringify(casesRec));
    return sharedStateContent;
  }

  public getRecentCases(uiAppId: string, sandboxId: number): Observable<CaseList> {
    const ssName = uiAppId + '.recentcases.tibcolabs.client.context.PRIVATE';
    return this.getSSCasesList(ssName, sandboxId);
  }

  private getSSCasesList(ssName: string, sandboxId: number): Observable<CaseList> {
    return this.sharedStateService.getSharedState(ssName, 'PRIVATE', false, false)
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

  public unsetRecentCase(caseRef: string, uiAppId: string, sandboxId: number) {
    // NOTE: Use '-1' as caseRef to clear recent cases list
    const ssName = uiAppId + '.recentcases.tibcolabs.client.context.PRIVATE';
    this.setCasesRecord(ssName, caseRef, uiAppId, sandboxId, 10, true);
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
    this.sharedStateService.getSharedState(ssName, 'PRIVATE', false, false)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(sharedStateList => {
            casesEntry = sharedStateList.sharedStateEntries[0] || undefined;
            let content: SharedStateContent;
            if (casesEntry) {
              content = this.updateCasesRecord(casesEntry.content, caseRef, toggle);
              casesEntry.content = content;
              sharedStateList.sharedStateEntries[0] = casesEntry;
              this.sharedStateService.updateSharedState(sharedStateList.sharedStateEntries).subscribe();
            } else {
              content = this.newCasesRecord(caseRef, maxSize);
              this.sharedStateService.createSharedState(ssName, 'PRIVATE', '', sandboxId, undefined, undefined, undefined, content).subscribe();
            }
            return casesEntry;
          }
        )
      ).subscribe(null, error => console.log('Unable to set recent cases: ' + error));
  }

  public getFavoriteCases(uiAppId: string, sandboxId: number): Observable<CaseList> {
    const ssName = uiAppId + '.favoritecases.tibcolabs.client.context.PRIVATE';
    return this.sharedStateService.getSharedState(ssName, 'PRIVATE', false, false)
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
          return caselist.caseRefs ? (caselist.caseRefs.indexOf(caseRef) !== -1) : false;
        })
      );
  }

  public runProcess(sandboxId: number, appId: string, processId: string, caseReference: string, data: any): Observable<any> {
    const url = '/process/v1/processes';
    // convert data to an escaped JSON string
    let dataJson;
    if (data) {
      dataJson = TcCoreCommonFunctions.escapeString(JSON.stringify(data));
    } else {
      dataJson = TcCoreCommonFunctions.escapeString(JSON.stringify({}));
    }
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

  // Since we call get userinfo a lot - and the data doesn't tend to change - I will cache it for the session
  public getUserInfo(userId: string): Observable<UserInfo> {
    let url = '/organisation/v1/users/' + userId;
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
    return this.http.get(url, { headers: headers })
      .pipe(
        map(userinfo => new UserInfo().deserialize(userinfo))
      );
  }

  /* notes service */

  public getThreads(relatedItemType: string, itemTypeId: string, skip: number, top: number): Observable<ThreadList> {
    // https://liveapps.tenant-integration.tcie.pro/collaboration/notes?$relatedItemCollection=CASE_APP_15441&$orderby=createdDate%20ASC
    const url = '/collaboration/v1/notes?$relatedItemCollection=' + relatedItemType + '_' + itemTypeId
      + '&$orderby=createdDate desc'
      + '&$top=' + top + '&$skip=' + skip;
    return this.http.get(url, { withCredentials: true })
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
      return this.http.get(url, { withCredentials: true })
        .pipe(
          map(notes => new NotesList().deserialize(notes))
        );
    }
  }

  public deleteAllNotes() {
  }

  public updateNote(note: Note, noteId: string): Observable<Note> {
    let url = '/collaboration/v1/notes/' + noteId;
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
    let url = '/collaboration/v1/notes';
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
    let url = '/collaboration/v1/notes/' + noteId;
    return this.http.get(url, { withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(note => new Note().deserialize(note)
        )
      );
  }

  public getThread(relatedItemType: string, relatedItemId: string, threadId: number) {
    let url = '/collaboration/v1/notes/?$relatedItemType=' + relatedItemType
      + '&relatedItemId=' + relatedItemId
      + '&filter=threadId=' + threadId
      + '&orderby=createdDate ASC';
      return this.http.get(url, { withCredentials: true })
        .pipe(
          tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
          map(notes => new NotesList().deserialize(notes)
          )
        );
  }

  public createReplyNote(originalNote: Note, reply: string, noteId: string): Observable<number> {
    let url = '/collaboration/v1/notes/' + noteId;
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
    const url = '/collaboration/v1/notifications';
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
    return this.http.post(url, bodyStr, { headers, withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  public unsubscribeToNotes(relatedItemType, relatedTypeId, userId) {
    let url = '/collaboration/v1/notifications?$filter=collectionName=';
    url = url + '\'' + relatedItemType + '_' + relatedTypeId + '\' and entityId=' + userId;
    return this.http.delete(url, { withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  public getNotifications(relatedItemType, relatedTypeId, userId): Observable<NotificationList> {
    let url = '/collaboration/v1/notifications?$filter=collectionName=\'' + relatedItemType + '_' + relatedTypeId
            + '\' and entityId=' + userId;
    return this.http.get(url, { withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(value => new NotificationList().deserialize(value))
      );
  }

  public deleteNote(noteId: number) {
    let url = '/collaboration/v1/notes/' + noteId;
    return this.http.delete(url, { withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  /* end notes service */

  public getGroups(sandboxId: number, top: number, useCache: boolean): Observable<Groups> {
    let url = '/organisation/v1/groups?$sandbox=' + sandboxId + '&$top=' + top;
    let headers;
    if (useCache) {
      headers = new HttpHeaders().set('cacheResponse', 'true');
    } else {
      headers = new HttpHeaders();
    }

    return this.http.get(url, { headers, withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map( groups => new Groups().deserialize({ groups: groups }))
      );
  }

  public getGroupMemberships(sandboxId: number, userId: string, top: number, useCache: boolean): Observable<Groups> {
    const url = '/organisation/v1/users/' + userId + '/groups' + '?$sandbox=' + sandboxId + '&$top=' + top;
    let headers;
    if (useCache) {
      headers = new HttpHeaders().set('cacheResponse', 'true');
    } else {
      headers = new HttpHeaders();
    }

    return this.http.get(url, { headers, withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map( groups => new Groups().deserialize({ groups: groups }))
      );
  }

  public getGroupUsers(sandboxId: number, groupId: string, skip: number, top: number, filter: string, useCache: boolean): Observable<UsersInfo>{
    const url = '/organisation/v1/groups/' + groupId + '/users' + '?$sandbox=' + sandboxId + '&$top=' + top + '&$skip=' + skip + '&$filter=' + filter

    let headers;
    if (useCache) {
      headers = new HttpHeaders().set('cacheResponse', 'true');
    } else {
      headers = new HttpHeaders();
    }

    return this.http.get(url, { headers, withCredentials: true })
      .pipe(
        tap(val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(users => new UsersInfo().deserialize({ usersInfo: users }))
      );
  }
}
