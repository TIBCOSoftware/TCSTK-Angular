import {Inject, Injectable} from '@angular/core';
import {Observable, throwError} from 'rxjs';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {ApiResponseError, ApiResponseText} from '../models/liveappsdata';
import {LiveAppsService} from './live-apps.service';
import {Document, DocumentList, OrgFolder} from '../models/tc-document';
import {catchError, flatMap, map, tap} from 'rxjs/operators';
import {TcCoreCommonFunctions, TcCoreConfigService} from '@tibco-tcstk/tc-core-lib';

@Injectable({
  providedIn: 'root'
})
export class TcDocumentService {

  constructor(private http: HttpClient, private liveapps: LiveAppsService, @Inject(TcCoreConfigService) private tcCoreConfig: TcCoreConfigService ) {
  }

  public createOrgFolder(name: string): Observable<ApiResponseText> {
    const url = '/webresource/v1/orgFolders/';
    const body = new OrgFolder().deserialize({ name: name });
    const bodyStr = JSON.stringify(body);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.post(url, bodyStr, { headers }).pipe(
      tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
      map(response => new ApiResponseText().deserialize(response))
    );
  }

  public getOrgFolder(name: string, useCache: boolean, flushCache: boolean): Observable<OrgFolder> {
    const url = '/webresource/v1/orgFolders/' + name + '/';
    let headers: HttpHeaders = new HttpHeaders();
    if (useCache) {
      headers = headers.set('cacheResponse', 'true');
    }
    if (flushCache) {
      headers = headers.set('flushCache', 'true');
    }
    const options = {headers: headers };
    return this.http.get(url, options).pipe(
      map(response => {
        return new OrgFolder().deserialize(response);
      }),
      catchError(error => {
        const apiError = new ApiResponseError().deserialize(error.error);
        if (apiError.errorCode === 'WR_FOLDER_DOES_NOT_EXIST') {
          return this.createOrgFolder(name).pipe(
            flatMap(newOrgFolder => {
              // trigger cache flush
              return this.getOrgFolder(name, true, true);
            })
          );
        } else {
          throwError(error);
        }
      })
    );
  }

  public deleteOrgFolder(name: string): Observable<ApiResponseText> {
    const url = '/webresource/v1/orgFolders/' + name;
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/json');
    return this.http.delete(url, { headers }).pipe(
      tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
      map(response => new ApiResponseText().deserialize(response))
    );
  }

  public initOrgFolder(name: string): Observable<ApiResponseText> {
    const orgFolder$ = this.getOrgFolder(name, true, false).pipe(
      map(orgFolderResp => {
        return new ApiResponseText().deserialize({ message: 'orgFolder ok'});
      }),
      catchError(error => {
        const apiError = new ApiResponseError().deserialize(error.error);
        if (apiError.errorCode === 'WR_FOLDER_DOES_NOT_EXIST') {
          return this.createOrgFolder(name).pipe(
            map(newOrgFolder => {
              // trigger cache flush
              this.getOrgFolder(name, true, true).subscribe();
              return newOrgFolder;
            })
          );
        } else {
          throwError(error);
        }
      })
    );
    return orgFolder$;
  }

  public listDocuments(folderType: string, folderId: string, sandboxId: number, filter: string): Observable<DocumentList> {
    let url = '/webresource/v1/' + folderType + '/' + folderId + '/artifacts/';
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
    document.fileSize = TcCoreCommonFunctions.fileSizeToHuman(Number(document.size));
    this.liveapps.getUserInfo(document.author).subscribe(val => {
      document.authorDetails = val;
      return document;
    }, error => { console.log('Unable to retrieve user details for user: ' + error.errorMsg); });
    this.liveapps.getUserInfo(document.lastModifiedBy).subscribe(val => {
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

  public getUrlForDocument(folderType: string, folderId: string, docId: string, docVersion: string, sandboxId: number, checkProxy?: boolean): string {
    let url = '/webresource/';
    if (folderType === 'orgFolders') {
      url = url + 'orgFolders/' + folderId;
    } else {
      url = url + 'folders/' + folderId;
    }
    if (sandboxId && folderType !== 'orgFolders') {
      url = url + '/' + sandboxId;
    }
    url = url + '/' + docId;
    if (docVersion) {
      url = url + '?$version=' + docVersion;
    }

    // need to check for proxy since this wont be intercepted (used on HTML template)
    if (checkProxy && this.tcCoreConfig) {
      const tcCoreConfig = this.tcCoreConfig.getConfig();
      const tenantPath = tcCoreConfig.proxy_liveapps_path;
      if (tcCoreConfig.proxy_url && tcCoreConfig.proxy_url !== '') {
        if (tenantPath && tenantPath !== '') {
          url = tcCoreConfig.proxy_url + '/' + tenantPath + url;
        } else {
          url = tcCoreConfig.proxy_url + url;
        }

        if (docVersion) {
          url = url + '&' + tcCoreConfig.api_key_param + '=' + tcCoreConfig.api_key;
        } else {
          url = url + '?' + tcCoreConfig.api_key_param + '=' + tcCoreConfig.api_key;
        }
      }
    }
    return url;
  }

  public downloadDocument(folderType: string, folderId: string, docId: string, docVersion: string, sandboxId: number, disableCache?: boolean): Observable<any> {
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
    
    let headers = new HttpHeaders({
      'Content-Type': 'application/octet-stream',
    });
    if (disableCache) {
      headers = headers.append('Cache-Control',  'no-cache, no-store, must-revalidate, post-check=0, pre-check=0')
                       .append('Pragma', 'no-cache')
                       .append('Expires', '0');
    }
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
    return this.http.post(url, formData, { headers: headers, reportProgress: true, observe: 'events' });
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

}
