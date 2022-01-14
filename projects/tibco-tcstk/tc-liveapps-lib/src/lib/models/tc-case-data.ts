import {Deserializable} from '@TIBCOSoftware/tc-core-lib';
import {CaseInfo, JsonSchema} from './liveappsdata';

export class CaseInfoWithSchema implements Deserializable {
  caseInfo: CaseInfo;
  caseSchema: JsonSchema;
  applicationName: string;
  applicationInternalName: string;
  name: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class PurgeResult implements Deserializable {
  mfpCount: number;

  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

