import {Deserializable, GeneralConfig} from 'tc-core-lib';

export class SpotfireConfig implements Deserializable {
  id: string;
  uiAppId: string;
  applicationIds: string[];
  caseIconsFolderId: string;
  documentAppId: string;
  collaborationAppId: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

// export class SpotfireConfigHolder implements Deserializable {
//   public generalConfig: GeneralConfig;
//   public spotfireConfig: SpotfireConfig;
//   deserialize(input: any) {
//     Object.assign(this, input);
//     return this;
//   }
// }
