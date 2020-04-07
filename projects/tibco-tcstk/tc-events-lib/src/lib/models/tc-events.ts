/* Models used to store shared state configuration */

import {Deserializable} from '@tibco-tcstk/tc-core-lib';

export class EventsAttribute {
  Id: string;
  type: string;
}

export class EventsRecordHolder {
  attributes: EventsRecord;
  apiToken: string;
  isDMInstalled: boolean;
  isLockingEnabled: boolean;
  isBPMNInstalled: boolean;
  firstName: string;
  lastName: string;
  email: string;
  userName: string;
  subscriptionId: string;
}

export class EventsRecord {
  attributes: EventsAttribute;
}

export class EventsData {
  attributes: EventsAttribute;
  record: EventsRecordHolder[];
}

export class EventsResponseMessage {
  response: EventsResponse;
}

export class EventsResponse implements Deserializable {
  attributes: EventsAttribute;
  status: string;
  startRow: number;
  endRow: number;
  totalRows: number;
  data: EventsData;
  responseMessage: string;
  errorCode: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

/*
request: {
        data: {
          project: [{
            name: this.beProjectName,
            artifactItem: [{
              artifactPath: this.beRulePath,
              artifactType: 'ruletemplateinstance',
              fileExtension: 'ruletemplateinstance',
              baseArtifactPath: ''
            }]
          }]
        }
      }
 */
export class CheckoutArtifact {
  artifactPath: string;
  artifactType: string;
  fileExtension: string;
  baseArtifactPath: string;
}

export class EventsProject {
  name: string;
  artifactItem: CheckoutArtifact[];
}

export class EventsReqData {
  project: EventsProject;
}

export class EventsRequest {
  data: EventsReqData;
}

export class EventsRequestMessage implements Deserializable {
  request: EventsRequest;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
