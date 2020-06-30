import {Deserializable} from '@tibco-tcstk/tc-core-lib';
import {CaseType} from './liveappsdata';
import {CustomFormDefs} from '@tibco-tcstk/tc-forms-lib';
import {FormConfig} from './tc-liveapps-config';

export class CaseCreatorSelectionContext {
  constructor(public application: CaseType,
              public initialData: any,
              public sandboxId: number,
              public customFormDefs: CustomFormDefs,
              public legacyCreators: boolean,
              public formsFramework: string,
              public formConfig: FormConfig,
              public autoClose?: boolean,
              public headerText?: string
  ) {}
}

