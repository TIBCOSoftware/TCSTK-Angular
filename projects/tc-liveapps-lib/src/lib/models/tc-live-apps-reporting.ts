import {Deserializable, GeneralConfig} from 'tc-core-lib';
import {LiveAppsConfig} from 'tc-liveapps-lib';

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
