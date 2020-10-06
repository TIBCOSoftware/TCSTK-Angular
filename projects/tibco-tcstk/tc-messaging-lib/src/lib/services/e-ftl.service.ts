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
          throwError({ connection: connection, code: code, reason: reason });
          this.connection = undefined;
        }
      }
    );
    return sendResult.asObservable();
  }

  public sendMessage = (message: string, event: string, dest?: string): Observable<any> => {
    const sendResult = new Subject<any>();
    if (this.connection) {
      // setup the message
      const msg = this.connection.createMessage();
      if (dest) {
        msg.set('_dest', dest);
      }
      msg.set('event', event);
      msg.set('text', message);

      // publish a message to TIBCO Cloud Messaging
      this.connection.publish(msg, {
        onComplete: (response) => {
          sendResult.next(response);
        },
        onError: (response, code, reason) => {
          console.error('eFTL: unable to send message:', response);
          throwError({ response: response, code: code, reason: reason });
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
        },
        onError: (subscription, code, reason) => {
          console.error('eFTL: subscription error:', subscription, code, reason);
          throwError({ subscription: subscription, code: code, reason: reason });
        }
      });
    } else {
      throwError('eFTL: No connection to eFTL');
    }
    return sendResult.asObservable();
  }
}
