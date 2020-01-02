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
import {EMAIL_ID_KEY, CLIENT_ID_KEY} from '../resolvers/login-prefill.resolver';
import {TC_API_KEY, TC_BASE_URL} from '../common/tc-base-url';

@Injectable({
  providedIn: 'root'
})


export class TcLoginService {
  constructor(private http: HttpClient, private location: Location) { }

  // Provide ability to login to Tibco Subscriber Cloud
  public login(username, password, clientID): Observable<AuthInfo> {
    localStorage.setItem(EMAIL_ID_KEY, username);
    localStorage.setItem(CLIENT_ID_KEY, clientID);

    let url = TC_BASE_URL + '/idm/v3/login-oauth';
    if (TC_API_KEY) {
      url = url + '?' + TC_API_KEY;
    }
    const body = new HttpParams()
      .set('Email', username)
      .set('Password', password)
      .set('TenantId', 'bpm')
      .set('ClientID', clientID);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, body.toString(), { headers, withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map( authInfo => new AuthInfo().deserialize(authInfo)));
  }

  public loginV2(username, password): Observable<AccessToken> {
    let url = TC_BASE_URL + '/as/token.oauth2';
    if (TC_API_KEY) {
      url = url + '?' + TC_API_KEY;
    }
    const body = new HttpParams()
      .set('username', username)
      .set('password', password)
      .set('client_id', 'ropc_ipass')
      .set('grant_type', 'password');
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, body.toString(), { headers, withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map( accessToken => new AccessToken().deserialize(accessToken)));
  }


  // Provide ability to authorize against live apps (note tenantId: bpm)
  public laAuthorize(accessToken: AccessToken, accountId): Observable<AuthInfo> {
    let url = TC_BASE_URL + '/idm/v2/login-oauth';
    if (TC_API_KEY) {
      url = url + '?' + TC_API_KEY;
    }
    const body = new HttpParams()
      .set('AccessToken', accessToken.access_token)
      .set('TenantId', 'bpm')
      .set('AccountId', accountId);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    return this.http.post(url, body.toString(), { headers, withCredentials: true })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map( authInfo => new AuthInfo().deserialize(authInfo)));
  }
}
