import {Deserializable} from 'tc-core-lib';
import {CaseType} from '../models/liveappsdata';

export class CaseCreatorSelectionContext {
  constructor(public application: CaseType,
              public initialData: any,
              public sandboxId: number
  ) {}
}
