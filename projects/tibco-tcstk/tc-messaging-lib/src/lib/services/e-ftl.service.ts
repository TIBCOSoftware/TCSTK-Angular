import { Injectable } from '@angular/core';
import {Observable, Subject, throwError} from 'rxjs';
import {MessagingAttribute} from '../models/messaging-data';
declare var eFTL, eFTLMessage: any;

@Injectable({
  providedIn: 'root'
})

export class EFTLService {

  public connection;

  constructor() {
  }

  public connect = (wssUrl: string, apiKey: string, clientId: string): Observable<any> => {
    const sendResult = new Observable<any>((observer) => {
      eFTL.connect(wssUrl, {
          password: apiKey,
          clientId: clientId,
          onConnect: (connection) => {
            this.connection = connection;
            observer.next('Connected');
          },
          onDisconnect: (connection, code, reason) => {
            console.error('eFTL: connection lost, ' + reason);
            observer.error({connection: connection, code: code, reason: reason});
          }
        }
      );
    });
    return sendResult;
  }

  public sendMessage = (attributes: MessagingAttribute[], event?: string): Observable<any> => {
    const sendResult = new Observable<any>((observer) => {
      if (this.connection) {
        // setup the message
        const msg = this.connection.createMessage();
        attributes.forEach(attr => {
          msg.set(attr.name, attr.value);
        });

        if (event) {
          msg.set('event', event);
        }

        // publish a message to TIBCO Cloud Messaging
        this.connection.publish(msg, {
          onComplete: (response) => {
            observer.next(response);
          },
          onError: (response, code, reason) => {
            console.error('eFTL: unable to send message:', response);
            observer.error({ response: response, code: code, reason: reason });
          }
        });
      } else {
        throwError('eFTL: No connection to eFtl');
      }
    });
    return sendResult;
  }

  public receiveMessage = (matcher: string, durable: string): Observable<any> => {
    const sendResult = new Observable<any>((observer) => {
      if (this.connection) {
        this.connection.subscribe({
          matcher: matcher,
          durable: durable,
          onMessage: (message) => {
            observer.next(message);
          },
          onError: (subscription, code, reason) => {
            console.error('eFTL: subscription error:', subscription, code, reason);
            observer.error({subscription: subscription, code: code, reason: reason});
          }
        });
      } else {
        throwError('eFTL: No connection to eFTL');
      }
    });
    return sendResult;
  }
}
