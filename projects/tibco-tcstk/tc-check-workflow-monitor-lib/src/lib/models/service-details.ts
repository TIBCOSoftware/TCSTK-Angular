import {Deserializable} from '@tibco-tcstk/tc-core-lib';


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



export class ServiceDetailsConfig implements Deserializable {
  id: string;
  uiAppId: string;
  createService: ServiceDetails;
  updateServiceFromPartner: ServiceDetails;
  updateServiceFromBpm: ServiceDetails;

  initiateService: ServiceDetails;
  setTerminalStateService: ServiceDetails;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}