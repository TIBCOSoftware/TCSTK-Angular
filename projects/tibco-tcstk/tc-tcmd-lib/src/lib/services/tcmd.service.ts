import { HttpClient, HttpHeaders, HttpParams } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable, of } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TcmdService {

  constructor(private http: HttpClient) {
  }

  public getApplications(context_root: string, region?: string): Observable<any> {
    let url = 'https://';
    if (region && region.toUpperCase() !== 'US') {
      url = url + region.toLowerCase() + '.';
    }
    url = url + 'metadata.cloud.tibco.com/s/';
    url = url + context_root + '/ebx-ca-tabula/rest/v1/application';

    return this.http.get(url, { withCredentials: true });
  }

}

