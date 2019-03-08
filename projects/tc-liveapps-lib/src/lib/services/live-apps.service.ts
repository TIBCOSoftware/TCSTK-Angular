import { Injectable, NgModule} from '@angular/core';
import {forkJoin, Observable, of, throwError} from 'rxjs';
import { HttpClientModule, HttpErrorResponse, HttpHeaders, HttpParams } from '@angular/common/http';
import { HttpClient } from '@angular/common/http';
import {
  Group,
  Claim,
  Sandbox,
  CaseInfo,
  CaseInfoList,
  CaseTypesList,
  SandboxList,
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
  CaseTypeStatesListList
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
  TcCoreCommonFunctions
} from 'tc-core-lib';
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
import { Deserializable} from 'tc-core-lib';
import {split} from 'ts-node';
import {Location} from '@angular/common';

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

  public getApplications(sandboxId: number, appIds: string[], top: number): Observable<CaseTypesList> {
    const select = 'b';
    let url = '/case/v1/types?$sandbox=' + sandboxId + '&$select=' + select + '&$top=' + top;

    if (appIds && appIds.length > 0) {
      url = url + '&$filter=applicationId in(' + appIds.toString() + ') and isCase eq TRUE';
    }

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(casetypes => new CaseTypesList().deserialize(casetypes)));
  }

  public getClaims(): Observable<Claim> {
    const url = '/organisation/v1/claims';
    const headers = new HttpHeaders().set('cacheResponse', 'true');
    return this.http.get(url, { headers: headers } )
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

  public caseSearch(terms: Observable<string>, sandboxId: number, appId: string, typeId: string, skip: number, top: number): Observable<CaseSearchResults> {
    return terms
      .pipe(
        debounceTime(500),
        distinctUntilChanged(),
        switchMap(term => this.caseSearchEntries(term, sandboxId, appId, typeId, skip, top))
      );
  }

  private caseSearchEntries(term: string, sandboxId: number, appId: string, typeId: string, skip: number, top: number): Observable<CaseSearchResults> {
      const url = '/case/v1/cases' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
        + appId + ' and typeId eq ' + typeId + '&$skip=' + skip + '&$top=' + top
        + '&$select=cr'
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

  public getCaseTypes(sandboxId: number, appId: string, top: number): Observable<CaseTypesList> {
    const select = 'b,s,sa,a';
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
        map(casetypes => new CaseTypesList().deserialize(casetypes)));
  }

    public getCaseTypeStates(sandboxId: number, appId: string, top: number): Observable<CaseTypeStatesList> {
        const select = 's';
        let url = '/case/v1/types?$sandbox=' + sandboxId + '&$select=' + select  + '&$top=' + top;
        if (appId != null) {
            url = url + '&$filter=applicationId eq ' + appId;
        }
        const headers = new HttpHeaders().set('cacheResponse', 'true');
        return this.http.get(url, { headers: headers } )
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
    const dataJson = TcCoreCommonFunctions.escapeString(JSON.stringify(data));
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
    return this.http.post(url, bodyStr, { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  public unsubscribeToNotes(relatedItemType, relatedTypeId, userId) {
    let url = '/collaboration/v1/notifications?$filter=collectionName=';
    url = url + '\'' + relatedItemType + '_' + relatedTypeId + '\' and entityId=' + userId;
    return this.http.delete(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  public getNotifications(relatedItemType, relatedTypeId, userId): Observable<NotificationList> {
    const url = '/collaboration/v1/notifications?$filter=collectionName=\'' + relatedItemType + '_' + relatedTypeId
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


}
