import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TSCOauthService {

  constructor(private http: HttpClient) {
  }

  public generateOauthTokens(scope: string): Observable<any> {
    const url = 'https://eu.account.cloud.tibco.com/idm/v1/oauth2/tokens/operations/generate';
    const body = new HttpParams()
        .set('scope', scope)
        .set('maximum_validity', '60000')
        .set('name', 'TCSTK_' + new Date().getTime());

    const headers = new HttpHeaders({
        'Content-Type': 'application/x-www-form-urlencoded'
    });
    return this.http.post(url, body.toString(), { headers, withCredentials: true });
  }

}

