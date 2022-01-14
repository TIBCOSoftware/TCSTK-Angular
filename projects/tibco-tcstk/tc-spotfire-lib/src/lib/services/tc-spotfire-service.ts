import {Injectable} from '@angular/core';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '@angular/common';
import {TcCoreCommonFunctions, TcSharedStateService} from '@tibcosoftware/tc-core-lib';
import {flatMap, map} from 'rxjs/operators';
import {Observable, of} from 'rxjs';
import {SpotfireMarkingCreateCaseConfig} from '../models/tc-spotfire-config';
import {set} from 'lodash';

@Injectable({
  providedIn: 'root'
})

export class TcSpotfireService {

  constructor(
    private http: HttpClient, private location: Location) { }

  private getSpotfireCookieForm = (data) => {
    const form = document.createElement('form');
    const loc = '/idm/v1/cookie';
    form.action = loc;
    form.method = 'POST';
    form.className = 'hidden';

    const location = document.createElement('input');
    location.name = 'location';
    location.value = decodeURIComponent(data.resumeURL);
    form.appendChild(location);

    const token = document.createElement('input');
    token.name = 'token';
    token.value = data.token;
    form.appendChild(token);

    document.body.appendChild(form);
    form.submit();
  }

  public getCookie = (location: string, token: string, resumeURL: string): Observable<any> => {
    // const url = '/idm/v1/cookie';
    const url = location;
    const headers = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded');
    const body = 'token=' + token;
    return this.http.post(url, body, { headers }).pipe(
      map((response: any) => {
        console.log(response);
        return response;
      })
    );

    /*const form = document.createElement('form');
    form.action = location;
    // form.action = '/idm/v1/cookie';
    form.method = 'POST';
    form.className = 'hidden';

    const loc = document.createElement('input');
    loc.name = 'location';
    loc.value = decodeURIComponent('https://liveapps.cloud.tibco.com/webresource/apps/jeztest2/index.html#/starterApp/home');
    form.appendChild(loc);

    const tok = document.createElement('input');
    tok.name = 'token';
    tok.value = token;
    form.appendChild(tok);

    document.body.appendChild(form);
    form.submit();
    return of('done');*/
  }

  public reauthorize = () => {
    const url = '/idm/v1/reauthorize';
    const headers = new HttpHeaders().set('content-type', 'application/x-www-form-urlencoded');
    const body = 'opaque-for-tenant=SPOTFIRE&resumeURL=' + encodeURIComponent(this.location.path());
    return this.http.post(url, body, { headers }).pipe(
      flatMap((response: any) => {
        console.log(response);
        return this.getCookie(response.location, response.token, response.resumeURL);
      })
    );
  }

  public createLiveAppsData(mark:any, config: SpotfireMarkingCreateCaseConfig) {
    let liveAppsData = {};
    if (config.initialValue) {
      liveAppsData = config.initialValue;
    }
    config.attributes.forEach(atr => {
      if (mark && mark[config.markingName] && mark[config.markingName][config.tableName] && mark[config.markingName][config.tableName][atr.sourceAttr]) {
        for (let idx = 0; idx < mark[config.markingName][config.tableName][atr.sourceAttr].length; idx++) {
          const val = mark[config.markingName][config.tableName][atr.sourceAttr][idx];
          set(liveAppsData, config.objectPath + '[' + idx + ']' + atr.targetAttr, val);
        }
      }
    });
    // console.log('Live apps data: ', JSON.stringify(liveAppsData));
    return liveAppsData;
  }
}
