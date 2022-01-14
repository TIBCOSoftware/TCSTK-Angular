import {Deserializable} from '@TIBCOSoftware/tc-core-lib';
import {MessagingConnection} from './messaging-connection';

export class MessagingConfig implements Deserializable {
  id: string;
  connections: MessagingConnection[];
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
