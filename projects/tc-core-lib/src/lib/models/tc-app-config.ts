import {Deserializable} from '../models/deserializable';

export class UiAppConfig implements Deserializable {
  id: string;
  sandboxId: number;
  applicationIds: number[];
  typeId: string;
  uiAppId: string;
  caseIconsFolderId: string;
  caseTypeLabel: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}


export class UiAppIdConfig implements  Deserializable {
  uiAppId: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
