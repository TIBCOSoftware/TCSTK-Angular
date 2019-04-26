import {Deserializable} from 'tc-core-lib';

export class CaseTypeReportRecordInfo implements Deserializable {
  id: string;
  label: string;
  name: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class CaseTypeReportRecord implements Deserializable {
  activeStateCaseCount: number;
  applicationId: string;
  terminalStateCaseCount: number;
  incTerminal: boolean;
  caseTypeInfo: CaseTypeReportRecordInfo;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class CaseTypesReport implements Deserializable {
  caseTypes: CaseTypeReportRecord[];
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class CaseTypeStateReportStateInfo implements Deserializable {
  id: string;
  label: string;
  value: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class CaseTypeStateReportRecord implements  Deserializable {
  caseCount: number;
  stateInfo: CaseTypeStateReportStateInfo;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class CaseTypeStateReport implements Deserializable {
  caseStates: CaseTypeStateReportRecord[];
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
