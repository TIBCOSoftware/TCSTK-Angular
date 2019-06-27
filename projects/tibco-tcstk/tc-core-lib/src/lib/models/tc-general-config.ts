/* models used by general app config */

import {Deserializable} from './deserializable';

export class RoleAttribute {
  public id: string;
  public group: string;
  public display: string;
  public welcome: string;
  public imageUrl: string;
  public configuration: boolean;
  public priority: number;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class GeneralConfig implements Deserializable {
  id: string;
  uiAppId: string;
  browserTitle: string;
  applicationTitle: string;
  welcomeMessage: string;
  displayName: boolean;
  documentationUrl: string;
  roles: RoleAttribute[];
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
