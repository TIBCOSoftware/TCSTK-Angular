import { Injectable } from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, throwError} from 'rxjs';
import {catchError, retry} from 'rxjs/operators';

@Injectable({
  providedIn: 'root'
})
export class ServiceHandlerService {

  private headers: HttpHeaders;

  constructor(private http: HttpClient) {
     this.headers = new HttpHeaders();
     this.headers.set('Content-Type', 'application/json');
     this.headers.set( 'Accept', 'application/json');

  }



  postService(apiUrl, data): Observable<any> {
    const headers = this.headers;
    return this.http.post<any>(apiUrl, data, {headers})
      .pipe(
        retry(1),
        catchError(this.handleError)
      );
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
