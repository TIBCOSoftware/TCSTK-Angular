import {Injectable} from '@angular/core';
import {BehaviorSubject, Observable} from 'rxjs';

@Injectable({providedIn: 'root'})
export class MessageTopicService {

  topics: Array<{ name: string, subject: BehaviorSubject<any> }> = [
    {name: 'sample.topic', subject: new BehaviorSubject<any>('init')}
  ];

  constructor() {
    console.log('Topic Message service Created...');
  }

  sendMessage(name: string, message: string) {
    this.createTopicIfNotExists(name, {text: message});
    this.topics.filter(x => x.name === name)[0].subject.next({text: message});
  }

  clearMessages(name: string) {
    this.createTopicIfNotExists(name, {text: 'init'});
    // this.queues.filter(x => x.name === name)[0].subject.next('init');
  }

  getMessage(name: string): Observable<any> {
    this.createTopicIfNotExists(name, {text: 'init'});
    return this.topics.filter(x => x.name === name)[0].subject.asObservable();
  }

  createTopicIfNotExists(name: string , init) {
    let queueExist = false;
    for (const q of this.topics) {
      if (q.name === name) {
        // console.log('Queue Exist: ' + q.name);
        queueExist = true;
      }
    }
    if (!queueExist) {
      console.log('Creating Topic: ' + name);
      const tempTopic = {name: name, subject: new BehaviorSubject<any>(init)};
      this.topics.push(tempTopic);
    }
  }
}
