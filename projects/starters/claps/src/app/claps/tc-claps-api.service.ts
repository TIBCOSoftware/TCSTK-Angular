import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

@Injectable({
  providedIn: 'root'
})
export class TcClapsApiService {
  // API_URL = '';
  API_URL = 'https://eu-west-1.integration.cloud.tibcoapps.com:443/qg56zzs644r3lr2t62mbe75xb457rv26';

  constructor(private  httpClient:  HttpClient) { }

  getClaps(clapsurl) {
    // GET /claps/{url}
    let urlparams = new HttpParams().set("id", clapsurl);
    return this.httpClient.get(`${this.API_URL}/claps`, { params: urlparams });
  }

  postClaps(clapsdata) {
    // POST /claps/ Data {"id":"some","tags":"","claps":0}
    return this.httpClient.post(`${this.API_URL}/claps`, clapsdata);
  }

}
