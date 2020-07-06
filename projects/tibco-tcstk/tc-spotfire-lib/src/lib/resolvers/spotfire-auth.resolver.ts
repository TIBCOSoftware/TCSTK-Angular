import {Injectable} from '@angular/core';
import {ActivatedRouteSnapshot, Resolve} from '@angular/router';
import {BehaviorSubject, Observable, fromEvent, never} from 'rxjs';
import {flatMap, map} from 'rxjs/operators';

@Injectable()
export class SpotfireAuthResolver implements Resolve<Observable<any>> {

  private sfAuthResolving: BehaviorSubject<any> = new BehaviorSubject(undefined);

  private refreshCookie = (iframeDoc) => {
    const sfAuthDiv = document.getElementById('spotfireAuthIframe');
    sfAuthDiv['contentWindow'].postMessage({refreshSFToken: 'now'}, window.location.origin);
    console.log('sent refresh');
  };

  public receiveMessage = (event) => {
    if (event.data.sfAuth === 'ok') {
      console.log('*** Received sfLogin: ', event);

      // setup refresh
      setInterval(this.refreshCookie, 600000);

      this.sfAuthResolving.complete();
    }
  };


  resolve(routeSnapshot: ActivatedRouteSnapshot): Observable<any> {
    if (document.getElementById('spotfireAuthIframe') !== undefined) {
      const iframe = document.createElement('iframe');
      iframe.id = 'spotfireAuthIframe';
      iframe['src'] = 'assets/authentication-frame.html';
      iframe.style.display = 'none';
      iframe.style.width = '0';
      iframe.style.height = '0';
      iframe.style.border = '0';
      iframe.style.display = 'none';
      // wait for login to complete
      window.addEventListener('message', this.receiveMessage, false);
      document.body.appendChild(iframe);
    }
    return this.sfAuthResolving;
  }
}
