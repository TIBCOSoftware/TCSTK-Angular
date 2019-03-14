import {Deserializable} from 'tc-core-lib';


export class ServiceDetails implements Deserializable {
  label: string;
  fileLabel: string;
  rootObjectName: string;
  operation: string;
  apiUrl: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
