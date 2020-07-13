/**
 * @ngdoc component
 * @name mockingInterceptor
 *
 * @description
 * This interceptor attempts to use local json files from the assets directory to mock Tibco Cloud API calls
 *
 * Each mock file can contain either a single response or a "mockedResponses" object that contains specific URLs and responses
 *
 * @usage
 *
 *
 *
 */

import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, onErrorResumeNext, throwError} from 'rxjs';
import {map, catchError, delay} from 'rxjs/operators';

@Injectable()
export class MockingInterceptor implements HttpInterceptor {
  MOCK_BASE_PATH = '/assets/mocks';

  constructor(private http: HttpClient) {
  }

  public readMockJSON(url): Observable<any> {
    return this.http.get(url, { withCredentials: true });
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // save original request
    const originalReq = req.clone();

    // dont mock anything from assets folder
    const urlparts = req.url.split('.');
    const pathparts = urlparts[0].split('/');

    if (pathparts[1] === 'assets') {
      return this.sendRequest(originalReq, next);
    }


    // try and find a mock response
    const resource = originalReq.url.split('?')[0];
    const segments: string[] = resource.split('/');
    const seg2: string[] = resource.split('/');
    let path = this.MOCK_BASE_PATH;
    // ignore the http/url parts if present
    let responseType = 'json';
    if (segments[0] === 'http:' || segments[0] === 'https:') {
      segments.splice(0, 3);
      // we are getting a webresource (will only work for text based resources like svg)
      // @ts-ignore
      if (segments[0] === 'webresource') {
        responseType = 'text';
      }
    } else {
      // just remove the blank part
      segments.splice(0, 1);
    }
    segments.splice(0, segments.length).forEach((seg) => {
      path = path + '/' + seg;
    });
    if (responseType !== 'text') {
      path = path + '.json';
    } else {
      path = path + '.txt';
    }

    let options = {};
    if (responseType === 'text') {
      options = { responseType: 'text' };
    }
    const httpRequest = new HttpRequest(
      <any>'GET',
      path,
      options
    );
    req = Object.assign(req, httpRequest);
    req = req.clone();
    return next.handle(req).pipe(
      delay(100),
      map(
        data => {
          let d = <HttpResponse<any>> data;
          if (d.status === 200) {
            // return the body of the cached response loaded from file
            console.log(originalReq.url);
            let mockedResponse: HttpResponse<any>;
            if (data['body']['mockedResponses']) {
              // multi mocked response file
              if (data['body']['mockedResponses'][originalReq.url]) {
                data['body'] = data['body']['mockedResponses'][originalReq.url];
                d = <HttpResponse<any>> data;
                mockedResponse = new HttpResponse(d);
              } else {
                // no mock for this URL
                // todo: there is a bug here that this does not trigger the real call
                throwError('no mock for this url - no response sent');
              }
            } else {
              // single mocked response file
              mockedResponse = new HttpResponse(d);
            }
            return mockedResponse;
          } else {
            return data;
          }
        }
      ),
      catchError(
        error => {
          // no mock file so make real request
          return this.sendRequest(originalReq, next);
        }
      )
    );
  }

  sendRequest = (
    req: HttpRequest<any>,
    next: HttpHandler): Observable<HttpEvent<any>> => {
    return next.handle(req);
  }
}
