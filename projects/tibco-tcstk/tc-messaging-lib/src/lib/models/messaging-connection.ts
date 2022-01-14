import {Deserializable} from '@TIBCOSoftware/tc-core-lib';

export class MessagingConnection implements Deserializable {
  id: string;
  name: string;
  wssUrl: string;
  apiKey: string;
  clientIdPrefix: string;
  event: string;
  matcher: string;
  durable: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
