import {Deserializable} from 'tc-core-lib';
import {CaseInfo, JsonSchema} from './liveappsdata';

export class CaseInfoWithSchema implements Deserializable {
  caseInfo: CaseInfo;
  caseSchema: JsonSchema;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
