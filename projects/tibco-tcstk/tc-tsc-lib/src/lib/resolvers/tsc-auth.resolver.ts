import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import { TSCOauthService } from '../services/tsc-oauth.service';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class TscAuthResolver implements Resolve<Observable<any>> {

  constructor(private tscOauthService: TSCOauthService) {}

  private tscAuthResolving: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private refreshCookie = (iframeDoc) => {
    const scribeAuthDiv = document.getElementById('tscAuthIframe');
    scribeAuthDiv['contentWindow'].postMessage({refreshTscToken: 'now'}, window.location.origin);
    console.log('sent refresh');
  }

  public receiveMessage = (event) => {
    if (event.data.scribeAuth === 'ok') {
      console.log('*** Received tscLogin: ', event);

      // setup refresh
      setInterval(this.refreshCookie, 600000);

      // retrieve oauth tokens
      /*this.tscOauthService.generateOauthTokens('TSC BPM SPOTFIRE TCI TCM TCMD').subscribe(
        next => {
          this.tscAuthResolving.complete();
        }
      )*/
      this.tscAuthResolving.complete();
    }
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<any> {
    const iframe = document.createElement('iframe');
    iframe.id = 'tscAuthIframe';
    iframe['src'] = 'assets/tsc-authentication-frame.html';
    iframe.style.display = 'none';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.display = 'none';
    // wait for login to complete
    window.addEventListener('message', this.receiveMessage, false);
    document.body.appendChild(iframe);
    return this.tscAuthResolving;
  }
}
