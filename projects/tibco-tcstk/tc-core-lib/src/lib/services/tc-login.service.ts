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
import {forkJoin, Observable, of} from 'rxjs';
import {HttpClient, HttpHeaders, HttpParams} from '@angular/common/http';
import {flatMap, map, switchMap, tap} from 'rxjs/operators';
import {Location} from '@angular/common';
import {EMAIL_ID_KEY, CLIENT_ID_KEY} from '../resolvers/login-prefill.resolver';
import {TcCoreConfigService} from './tc-core-config-service';

@Injectable({
  providedIn: 'root'
})


export class TcLoginService {
  constructor(private http: HttpClient, private location: Location, private tcCoreConfiguration: TcCoreConfigService) { }

  // Provide ability to login to Tibco Subscriber Cloud
  public login(username, password, clientID): Observable<AuthInfo> {
    if (username) {
      localStorage.setItem(EMAIL_ID_KEY, username);
    }
    if (password) {
      localStorage.setItem(CLIENT_ID_KEY, clientID);
    }
    let body;
    let url;
      url = '/idm/v3/login-oauth';
      body = new HttpParams()
        .set('Email', username)
        .set('Password', password)
        .set('TenantId', 'bpm')
        .set('ClientID', clientID);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded');

    const reAuths = [];
    const tcConfig = this.tcCoreConfiguration.getConfig();
    if (tcConfig.proxy_url && tcConfig.proxy_url !== '') {
      if (tcConfig.proxy_tce_path && tcConfig.proxy_tce_path !== '' && tcConfig.enable_tce) {
        // reauth with tce if we are using proxy
        reAuths.push(this.reAuthorize('tce'));
      }
    }
    // when no reAuths just return empty array
    if (reAuths.length <= 0) {
      reAuths.push(of([]));
    }

    return this.http.post(url, body.toString(), { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        /*map((authInfo: AuthInfo) => {
            return authInfo;
          }
        ));*/
        flatMap((authInfo: any) => {
            return forkJoin(reAuths).pipe(
              map(results => {
                console.log(results);
                return authInfo;
              })
            );
          }));
  }

  public loginV2(username, password): Observable<AccessToken> {
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

  public reAuthorize(tenant: string): Observable<any> {
    // this gets the access token for the tenant that we need to request a cookie
    const url = '/idm/v1/reauthorize';
    const body = new HttpParams()
        .set('opaque-for-tenant', tenant);
    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
    return this.http.post(url, body.toString(), { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        flatMap( result => {
            console.log(result);
            return this.getToken(result['token'], tenant).pipe(
              map(tokenRes => {
                return tokenRes;
              })
            );
          }
        ));
  }

  public getToken(token: string, tenant: string): Observable<any> {
    // this will set the domain cookie for the tenant
    const url = '/getToken';
    const body = new HttpParams()
        .set('token', token);

    const headers = new HttpHeaders()
      .set('Content-Type', 'application/x-www-form-urlencoded')
      .set('Target-Tenant', tenant);
    return this.http.post(url, body.toString(), { headers })
      .pipe(
        tap( val => sessionStorage.setItem('tcsTimestamp', Date.now().toString())),
        map( result => {
            console.log(result);
            return result;
          }
        ));
  }
}
