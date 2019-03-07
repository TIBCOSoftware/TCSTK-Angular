/**
 * @ngdoc component
 * @name tcLoginService
 *
 * @description
 *
 * tcLoginService provides services for authenticating against Tibco Subscriber cloud and authorizing with the various
 * Tibco Cloud tenants such as liveapps.
 *
 * These services and related components are typically used when the UI is NOT running on Live Apps WRP/Tibco Cloud
 * When deployed to Live Apps WRP authentication is handled by Tibco Cloud when accessing the protected WRP URL
 *
 *
 */


import { Injectable } from '@angular/core';
import {AccessToken, AuthInfo} from '../models/tc-login';
import {Observable} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {map, tap} from 'rxjs/operators';
import {Location} from '@angular/common';

@Injectable({
  providedIn: 'root'
})
export class TcLoginService {

  constructor(private http: HttpClient, private location: Location) { }

  // Provide ability to login to Tibco Subscriber Cloud
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

  // Provide ability to authorize against live apps (note tenantId: bpm)
  public laAuthorize(accessToken: AccessToken, accountId): Observable<AuthInfo> {
    const url = '/idm/v2/login-oauth';
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
}
