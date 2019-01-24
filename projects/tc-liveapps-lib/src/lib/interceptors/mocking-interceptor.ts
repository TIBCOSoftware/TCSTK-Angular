import {Injectable} from '@angular/core';
import {HttpEvent, HttpRequest, HttpResponse, HttpInterceptor, HttpHandler, HttpClient, HttpHeaders} from '@angular/common/http';
import {Observable, of, onErrorResumeNext} from 'rxjs';
import {map, catchError} from 'rxjs/operators';

@Injectable()
export class MockingInterceptor implements HttpInterceptor {
  MOCK_BASE_PATH = '/assets/mocks';

  constructor(private http: HttpClient) {
  }

  public readMockJSON(url): Observable<any> {
    return this.http.get(url);
  }

  intercept(req: HttpRequest<any>, next: HttpHandler) {

    // save original request
    const originalReq = req.clone();

    // try and find a mock response
    const resource = originalReq.url.split('?')[0];
    const segments: string[] = resource.split('/');
    const seg2: string[] = resource.split('/');
    let path = this.MOCK_BASE_PATH;
    segments.splice(1, segments.length).forEach((seg) => {
      path = path + '/' + seg;
    });
    path = path + '.json';

    const httpRequest = new HttpRequest(
      <any>'GET',
      path
    );
    req = Object.assign(req, httpRequest);
    req = req.clone();
    return next.handle(req).pipe(
      map(
        data => {
          const d = <HttpResponse<any>> data;
          if (d.status === 200) {
            // return the body of the cached response loaded from file
            const mockedResponse = new HttpResponse(d);
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
