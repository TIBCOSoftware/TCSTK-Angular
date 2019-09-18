import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
declare var eFTL, eFTLMessage: any;

@Injectable({
  providedIn: 'root'
})

export class EFTLService {

  public connection;

  constructor() {
  }

  public connect = (wssUrl: string, apiKey: string, clientId: string): Observable<any> => {
    const sendResult = new Subject<any>();
    eFTL.connect(wssUrl, {
        password: apiKey,
        clientId: clientId,
        onConnect: (connection) => {
          this.connection = connection;
          sendResult.next('Connected');
        },
        onDisconnect: (connection, code, reason) => {
          console.error('eFTL: connection lost, ' + reason);
          this.connection = undefined;
          sendResult.next('Dissconnected');
        }
      }
    );
    return sendResult.asObservable();
  }

  public sendMessage = (message: string, event: string): Observable<any> => {
    const sendResult = new Subject<any>();
    if (this.connection) {
      // setup the message
      const msg = this.connection.createMessage();
      msg.set('event', event);
      msg.set('text', message);

      // publish a message to TIBCO Cloud Messaging
      this.connection.publish(msg, {
        onComplete: (response) => {
          sendResult.next(response);
        },
        onError: (response, code, reason) => {
          sendResult.next(response);
        }
      });
    } else {
      throwError('eFTL: No connection to eFtl');
    }
    return sendResult.asObservable();
  }

  public receiveMessage = (matcher: string, durable: string): Observable<any> => {
    const sendResult = new Subject<any>();
    if (this.connection) {
      this.connection.subscribe({
        matcher: matcher,
        durable: durable,
        onMessage: (message) => {
          sendResult.next(message);
          console.log('eFTL: message received:', message.get('text'));
        },
        onError: (subscription, code, reason) => {
          throwError('eFTL: subscription error', reason);
          console.log('eFTL: subscription error:', subscription, code, reason);
        }
      });
    } else {
      throwError('eFTL: No connection to eFTL');
    }
    return sendResult.asObservable();
  }
}
