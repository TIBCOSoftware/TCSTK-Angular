import {Injectable} from '@angular/core';
import {Observable, Subject} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessageService {

  queues: Array<{ name: string, subject: Subject<any> }> = [
    {name: 'sample.queue', subject: new Subject<any>()}
  ];

  constructor() {
    // console.log('Message service Created...');
  }

  sendMessage(name: string, message: string) {
    this.createQueueIfNotExists(name);
    this.queues.filter(x => x.name === name)[0].subject.next({text: message});
  }

  clearMessages(name: string) {
    this.createQueueIfNotExists(name);
    this.queues.filter(x => x.name === name)[0].subject.next();
  }

  getMessage(name: string): Observable<any> {
    this.createQueueIfNotExists(name);
    return this.queues.filter(x => x.name === name)[0].subject.asObservable();
  }

  createQueueIfNotExists(name: string) {
    let queueExist = false;
    for (const q of this.queues) {
      if (q.name === name) {
        // console.log('Queue Exist: ' + q.name);
        queueExist = true;
      }
    }
    if (!queueExist) {
      console.log('Creating Queue: ' + name);
      const tempQueue = {name: name, subject: new Subject<any>()};
      this.queues.push(tempQueue);
    }
  }
}
