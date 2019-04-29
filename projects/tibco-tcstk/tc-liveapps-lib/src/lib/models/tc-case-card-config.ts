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
