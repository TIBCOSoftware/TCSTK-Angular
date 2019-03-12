import {Deserializable} from 'tc-core-lib';

export class LiveAppsConfig implements Deserializable {
  id: string;
  applicationIds: string[];
  typeIds: string[];
  caseIconsFolderId: string;
  documentAppId: string;
  collaborationAppId: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
