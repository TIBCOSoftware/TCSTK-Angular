import {Deserializable} from '../models/deserializable';

export class RoleAttribute {
  public id: string;
  public display: string;
  public welcome: string;
  public imageUrl: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class GeneralConfig implements Deserializable {
  id: string;
  uiAppId: string;
  appTitle: string;
  displayName: string;
  documentationUrl: string;
  roleAttributes: RoleAttribute[];
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
