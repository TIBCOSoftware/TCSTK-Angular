import {Deserializable, DeserializableClass} from '@tibco-tcstk/tc-core-lib';

export class WiDistributionStrategy extends DeserializableClass implements Deserializable {
  stringKey: string;
}

export class WiScheduleStatus extends DeserializableClass implements Deserializable {
  description: string;
  stringKey: string;
}

export class WiItemContext extends DeserializableClass implements Deserializable {
  activityId: string;
  activityName: string;
  appId: string;
  appInstance: string;
  appName: string;
  caseRef: string;
}


export class WiFlags extends DeserializableClass implements  Deserializable {
  scheduleStatus: WiScheduleStatus;
}

export class WiHeader extends DeserializableClass implements Deserializable {
  description: string;
  distributionStrategy: WiDistributionStrategy;
  flags: WiFlags;
  itemContext: WiItemContext;
  name: string;
  priority: number;
  startDate: Date;
}

export class WiState extends  DeserializableClass implements Deserializable {
  description: string;
  stringKey: string;
}

export class Workitem extends DeserializableClass implements Deserializable {
  header: WiHeader;
  id: string;
  state: WiState;
  version: string;
  visible: boolean;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
