/**
 * @ngdoc component
 * @name LegacyIframeService
 *
 * @description
 *
 * Used to handle synchronization and loading of legacy form iframe
 *
 * Will emit false until the iFrame has posted it's ready message
 *
 *
 */

import { Injectable } from '@angular/core';
import {BehaviorSubject} from 'rxjs';

@Injectable({
  providedIn: 'root'
})

export class LegacyIframeService {

  private iFrameReady = new BehaviorSubject(false);
  public data = this.iFrameReady.asObservable();

  constructor() {
    console.log('*** service waiting for message');
    window.addEventListener('message', this.receiveMessage, false);
  }

  private receiveMessage = (event) => {
    if (event.data.action === 'workitemAppReady') {
      this.iFrameReady.next(true);
      console.log('*** service iframe ready');
    }
  }

}
