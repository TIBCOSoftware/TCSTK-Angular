import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class ScribeAuthResolver implements Resolve<Observable<any>> {

  private scribeAuthResolving: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private refreshCookie = (iframeDoc) => {
    const scribeAuthDiv = document.getElementById('scribeAuthIframe');
    scribeAuthDiv['contentWindow'].postMessage({refreshScribeToken: 'now'}, window.location.origin);
    console.log('sent refresh');
  }

  public receiveMessage = (event) => {
    if (event.data.scribeAuth === 'ok') {
      console.log('*** Received scribeLogin: ', event);

      // setup refresh
      setInterval(this.refreshCookie, 600000);

      this.scribeAuthResolving.complete();
    }
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<any> {
    const iframe = document.createElement('iframe');
    iframe.id = 'scribeAuthIframe';
    iframe['src'] = 'assets/scribe-authentication-frame.html';
    iframe.style.display = 'none';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.display = 'none';
    // wait for login to complete
    window.addEventListener('message', this.receiveMessage, false);
    document.body.appendChild(iframe);
    return this.scribeAuthResolving;
  }
}
