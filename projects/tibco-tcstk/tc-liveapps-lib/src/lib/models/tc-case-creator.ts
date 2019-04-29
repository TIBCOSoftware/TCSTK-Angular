import {Deserializable} from '@tibco-tcstk/tc-core-lib';
import {CaseType} from './liveappsdata';

export class CaseCreatorSelectionContext {
  constructor(public application: CaseType,
              public initialData: any,
              public sandboxId: number
  ) {}
}
