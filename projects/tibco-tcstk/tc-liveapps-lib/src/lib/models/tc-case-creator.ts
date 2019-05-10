import {Deserializable} from '@tibco-tcstk/tc-core-lib';
import {CaseType} from './liveappsdata';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';

export class CaseCreatorSelectionContext {
  constructor(public application: CaseType,
              public initialData: any,
              public sandboxId: number,
              public customFormDefs: CustomFormDefs
  ) {}
}

