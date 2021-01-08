import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable()
export class TcmdAuthResolver implements Resolve<Observable<any>> {

  constructor() {}

  private tcmdAuthResolving: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private refreshCookie = (iframeDoc) => {
    const tcmdAuthDiv = document.getElementById('tcmdAuthIframe');
    tcmdAuthDiv['contentWindow'].postMessage({refreshTcmdToken: 'now'}, window.location.origin);
    console.log('sent refresh');
  }

  public receiveMessage = (event) => {
    if (event.data.tcmdAuth === 'ok') {
      console.log('*** Received tcmdLogin: ', event);

      // setup refresh
      setInterval(this.refreshCookie, 600000);

      this.tcmdAuthResolving.complete();
    }
  }

  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<any> {
    const iframe = document.createElement('iframe');
    iframe.id = 'tcmdAuthIframe';
    iframe['src'] = 'assets/tcmd-authentication-frame.html';
    iframe.style.display = 'none';
    iframe.style.width = '0';
    iframe.style.height = '0';
    iframe.style.border = '0';
    iframe.style.display = 'none';
    // wait for login to complete
    window.addEventListener('message', this.receiveMessage, false);
    document.body.appendChild(iframe);
    return this.tcmdAuthResolving;
  }
}
