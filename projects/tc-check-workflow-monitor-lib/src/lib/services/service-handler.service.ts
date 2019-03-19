import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, map, retry, tap} from 'rxjs/operators';
import {CaseInfoList} from 'tc-liveapps-lib';

@Injectable({
  providedIn: 'root'
})
export class ServiceHandlerService {

  private postHeaders: HttpHeaders;

  constructor(private http: HttpClient) {
     this.postHeaders = new HttpHeaders();
     this.postHeaders.set('Content-Type', 'application/json');
     this.postHeaders.set( 'Accept', 'application/json');

  }



  postService(apiUrl, data): Observable<any> {
    const headers = this.postHeaders;
    return this.http.post<any>(apiUrl, data, {headers})
      .pipe(
        retry(0),
        catchError(this.handleError)
      );
  }




  public getCases(sandboxId: number, appId: string, typeId: string, skip: number, top: number): Observable<CaseInfoList> {
    const url = '/case/v1/cases' + '?$sandbox=' + sandboxId + '&$filter=applicationId eq '
      + appId + ' and typeId eq ' + typeId + '&$skip=' + skip + '&$top=' + top;
    return this.http.get(url)
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map(caseinfos => new CaseInfoList().deserialize(caseinfos)));
  }






  handleError(error) {
    let errorMessage = '';
    if (error.error instanceof ErrorEvent) {
      // client-side error
      errorMessage = `Error: ${error.error.message}`;
    } else {
      // server-side error
      errorMessage = `Error Code: ${error.status}\nMessage: ${error.message}`;
    }
    window.alert(errorMessage);
    return throwError(errorMessage);
  }



}
