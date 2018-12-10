import { Injectable, NgModule} from '@angular/core';
import {Observable, of} from 'rxjs';
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
  Note, ThreadList, Thread, NoteThread, NotificationList
} from '../models/liveappsdata';
import {map, share, tap} from 'rxjs/operators';
import { Deserializable} from '../models/deserializable';
import {split} from 'ts-node';

@Injectable({
  providedIn: 'root'
})

export class LiveAppsService {

  constructor(
    private http: HttpClient
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
    return this.http.get(url)
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

  public getCase(caseRef: string, sandboxId: number, appId: string, typeId: string ): Observable<CaseInfo> {
    const url = '/case/cases/' + caseRef + '/' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
      + appId + ' and typeId eq ' + typeId + '&$select=uc, m';
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfo => new CaseInfo().deserialize(caseinfo)));
  }

    public getCaseWithSummary(caseRef: string, sandboxId: number, appId: string, typeId: string ): Observable<CaseInfo> {
        const url = '/case/cases/' + caseRef + '/' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
            + appId + ' and typeId eq ' + typeId + '&$select=uc, m, s';
        return this.http.get(url)
            .pipe(
                tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
                map(caseinfo => new CaseInfo().deserialize(caseinfo)));
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
        return this.http.get(url)
            .pipe(
                tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
                map(casetypestates => new CaseTypeStatesList().deserialize(casetypestates[0].states)));
    }

    // note this is not a public API
  public getCaseActions(caseRef: string, sandboxId: number, appId: string, typeId: string, caseState: string): Observable<CaseActionsList> {
    // https://eu.liveapps.cloud.tibco.com/pageflow/caseActions?$sandbox=31&
    // $filter=applicationId%20eq%201742%20and%20caseType%20eq%201%20and%20caseState%20eq%20Responded%20and%20caseRef%20eq%20150491
    const select = 's';
    const url = 'pageflow/caseActions?$sandbox=' + sandboxId
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
    const url = 'event/auditEvents?$sandbox=' + sandboxId
      + '&$filter=type eq \'case\''
      + ' and id eq \'' + caseRef + '\'';

    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseaudit => new AuditEventList().deserialize(caseaudit)));
  }

  public getCaseStateAudit(caseRef: string, sandboxId: number): Observable<AuditEventList> {
    const url = 'event/auditEvents?$sandbox=' + sandboxId
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

  private getSharedState(name: string, type: string): Observable<SharedStateList>  {
    const url = 'clientstate/states?$filter=type=' + type
      + ' and name=\'' + name + '\'';

    return this.http.get(url)
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
    return this.getSharedState(ssName, 'PRIVATE')
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
    this.getSharedState(ssName, 'PRIVATE')
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
    return this.getSharedState(ssName, 'PRIVATE')
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
    url = '/webresource/v1/' + folderType + '/' + folderId + '/artifacts/?$sandbox=' + sandboxId;
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
    if (sandboxId) {
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
      + '/artifacts/' + fileName
      + '/upload/?$sandbox=' + sandboxId;
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

  public getUserInfo(userId: string): Observable<UserInfo> {
    const url =  '/organisation/v1/users/' + userId;
    return this.http.get(url)
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
                const noteThread = new NoteThread(note.thread.id, false, false, false, undefined,[], note);
                // get other threads for this id
                returnedNotes.notes.forEach(function (threadNote) {
                  if (threadNote.level > 1 && threadNote.threadId === note.thread.id) {
                    // add to the thread
                    noteThread.thread.push(threadNote);
                  }
                })
                threadList.threads.push(noteThread);
              }
            });
          return threadList;
        })
      );
  }

  public getNotesForCollections(collectionIds): Observable<NotesList> {
    if (collectionIds) {
      const url = 'collaboration/v1/notes?$relatedItemCollection=' + collectionIds +
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
    const url = 'collaboration/v1/notes/' + noteId;
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
    const url = 'collaboration/v1/notes';
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
    const url = 'collaboration/v1/notes/' + noteId;
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(note => new Note().deserialize(note)
        )
      );
  }

  public getThread(relatedItemType: string, relatedItemId: string, threadId: number) {
    const url = 'collaboration/v1/notes/?$relatedItemType=' + relatedItemType
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
    const url = 'collaboration/v1/notes/' + noteId;
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
    const url = 'collaboration/notifications';
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
    let url = 'collaboration/notifications?$filter=collectionName=';
    url = url + '\'' + relatedItemType + '_' + relatedTypeId + '\' and entityId=' + userId;
    return this.http.delete(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  public getNotifications(relatedItemType, relatedTypeId, userId): Observable<NotificationList> {
    const url = 'collaboration/notifications?$filter=collectionName=\'' + relatedItemType + '_' + relatedTypeId
            + '\' and entityId=' + userId;
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(value => new NotificationList().deserialize(value))
      );
  }

  public deleteNote(noteId: number) {
    const url = 'collaboration/v1/notes/' + noteId;
    return this.http.delete(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString()))
      );
  }

  /* end notes service */


  public fileSizeToHuman(size) {
    const e = (Math.log(size) / Math.log(1e3)) | 0;
    return +(size / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B';
  }

  private escapeString(text) {
    return text
      .replace(/"/g, '\"');
  }

}
