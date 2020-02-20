/* Models used to store shared state configuration */

import {Deserializable} from '@tibco-tcstk/tc-core-lib';

/*
{
  "response" : {
    "attributes" : {
      "Id" : 4662893,
      "type" : "www.tibco.com/be/ontology/WebStudio/Core/Concepts/DataSources/WS_C_SuccessResponseDataSource"
    },
    "status" : "0",
    "startRow" : 0,
    "endRow" : 0,
    "totalRows" : 0,
    "data" : {
      "attributes" : {
        "Id" : 4662890,
        "type" : "www.tibco.com/be/ontology/WebStudio/Core/Concepts/DataSources/WS_C_ResponseData"
      },
      "record" : [ {
        "attributes" : {
          "Id" : 4662891,
          "type" : "www.tibco.com/be/ontology/WebStudio/Security/Authn/Concepts/DataSources/Records/WS_C_LoginResponseDataSourceRecord"
        },
        "apiToken" : "8802562f0b6e40d29f075ed5bdd1e2a3",
        "isDMInstalled" : true,
        "isLockingEnabled" : true,
        "isBPMNInstalled" : true,
        "firstName" : "PS",
        "lastName" : "POC",
        "email" : "pspoc@outlook.com",
        "userName" : "d6laag2mgwsy2km3oxgk3pyzonwtiead",
        "subscriptionId" : "01DNGY4DAA1TF6VWYAPJB3TWMV"
      } ]
    }
  }
}
 */

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
