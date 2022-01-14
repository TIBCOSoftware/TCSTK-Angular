import {Deserializable, RoleAttribute} from '@TIBCOSoftware/tc-core-lib';

export class Group {
  public name: string;
  public description: string;
  public type: string;
  public id: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class Groups {
  groups: Group[];
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class Roles {
  roles: RoleAttribute[];
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class RouteAccessControlConfig {
    id: string;
    uiAppId: string;
    allowedRoutes: string[];
    allowedButtonIds: string[];
    configuration: RouteAccessControlConfigurationElement[];
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}

export class RouteAccessControlConfigurationElement {
    roleId: string;
    routes: string[];
    buttonIds: string[];
    deserialize(input: any): this {
        Object.assign(this, input);
        return this;
    }
}
