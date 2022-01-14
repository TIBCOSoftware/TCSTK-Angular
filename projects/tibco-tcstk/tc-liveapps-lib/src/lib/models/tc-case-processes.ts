import {Deserializable} from '@TIBCOSoftware/tc-core-lib';
import {CaseAction, CaseAttribute, CaseCreator, CaseTypesList, Process} from './liveappsdata';

export class LaProcessSelection {
  // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
  constructor(public type: string,
              public appSchema: CaseTypesList,
              public caseIdAttribute: CaseAttribute,
              public process: Process,
              public ref: string,
              public caseReference: string,
              public creator: CaseCreator,
              public action: CaseAction
  ) {
  }
}

