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

  private iWorkitemFrameReady = new BehaviorSubject(false);
  private iProcessFrameReady = new BehaviorSubject(false);
  public workitemStatus = this.iWorkitemFrameReady.asObservable();
  public processStatus = this.iProcessFrameReady.asObservable();

  constructor() {
    console.log('*** service waiting for message');
    window.addEventListener('message', this.receiveMessage, false);
  }

  private receiveMessage = (event) => {
    if (event.data.action === 'workitemAppReady') {
      this.iWorkitemFrameReady.next(true);
      console.log('*** workitems iframe ready');
    } else if (event.data.action === 'processAppReady') {
      this.iProcessFrameReady.next(true);
      console.log('*** process iframe ready');
    }
  }

}
