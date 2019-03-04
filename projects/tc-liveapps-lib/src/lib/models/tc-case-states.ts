import {Deserializable} from 'tc-core-lib';
import {AuditEventList, CaseTypeStatesList} from './liveappsdata';

export class StateTrackerData implements Deserializable {
  possibleStates: CaseTypeStatesList;
  currentState: string;
  caseAudit: AuditEventList;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class StateTracker implements Deserializable {
  stuff: any;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
