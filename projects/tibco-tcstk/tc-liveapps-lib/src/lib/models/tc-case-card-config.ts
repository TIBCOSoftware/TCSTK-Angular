import {Deserializable} from '@tibco-tcstk/tc-core-lib';
import {CardConfig, CaseTypeState} from './liveappsdata';

export class CaseCardConfig implements Deserializable {
  states: CaseTypeState[];
  cardConfig: CardConfig;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class StateColorMapRec implements Deserializable {
  state: string;
  color: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class StateColorMap implements Deserializable {
  stateColorRecs: StateColorMapRec[];
  caseTypeColor: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
