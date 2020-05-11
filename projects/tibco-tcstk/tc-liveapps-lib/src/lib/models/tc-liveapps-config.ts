import {Deserializable, GeneralConfig} from '@tibco-tcstk/tc-core-lib';

export class LiveAppsConfig implements Deserializable {
  id: string;
  applicationIds: string[];
  recentExcludedAppIds: string[];
  caseIconsFolderId: string;
  documentAppId: string;
  legacyCreators: boolean;
  legacyActions: boolean;
  legacyWorkitems: boolean;
  formsFramework: string;
  collaborationAppId: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class FormConfig implements Deserializable {
  id: string;
  processFormConfigs: ProcessFormConfig[];
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class ProcessFormConfig implements Deserializable {
  formTag: string;
  processId: string;
  externalForm?: boolean;
  processType: string;
  layout: any;
  data: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class LiveAppsConfigHolder implements Deserializable {
  public generalConfig: GeneralConfig;
  public liveAppsConfig: LiveAppsConfig;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
