import { Injectable } from '@angular/core';
import {Resolve} from '@angular/router';
import {Observable} from 'rxjs';
import {
  TcCoreCommonFunctions,
} from '@tibco-tcstk/tc-core-lib';
import {map} from 'rxjs/operators';
import {RouteAccessControlConfig} from '../models/tc-groups-data';
import {HttpClient, HttpHeaders} from '@angular/common/http';
import {Location} from '@angular/common';

@Injectable()
export class AccessResolver implements Resolve<Observable<RouteAccessControlConfig>> {

  ACCESS_CONTROL_CONFIG_URL = 'assets/config/routeAccessControl.json';

  constructor(private http: HttpClient, private location: Location) {
  }

  resolve(): Observable<RouteAccessControlConfig> {
    const headers = new HttpHeaders().set('cacheResponse', 'true');
    return this.http.get(TcCoreCommonFunctions.prepareUrlForStaticResource(this.location, this.ACCESS_CONTROL_CONFIG_URL), { headers }).pipe(
      map(accessControl => {
        const routeAccessControlConfig = new RouteAccessControlConfig().deserialize(accessControl);
        return routeAccessControlConfig;
      })
    );
  }

}
