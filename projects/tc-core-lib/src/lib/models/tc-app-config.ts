import {Deserializable} from '../models/deserializable';

export class UiAppConfig implements Deserializable {
  id: string;
  userId: string;
  sandboxId: number;
  applicationId: string;
  typeId: string;
  uiAppId: string;
  caseIconsFolderId: string;
  caseTypeLabel: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
