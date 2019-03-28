import {Deserializable, GeneralConfig} from 'tc-core-lib';

export class LiveAppsConfig implements Deserializable {
  id: string;
  applicationIds: string[];
  recentExcludedAppIds: string[];
  caseIconsFolderId: string;
  documentAppId: string;
  collaborationAppId: string;
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
