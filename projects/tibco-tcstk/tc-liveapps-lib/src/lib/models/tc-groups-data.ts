import {Deserializable, RoleAttribute} from '@tibco-tcstk/tc-core-lib';

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

export class RouteAccessDef {
  routeUrl: string;
  requiredRoleId: string;
}

export class ButtonAccessDef {
  buttonId: string;
  requiredRoleId: string;
}

export class RouteAccessControlConfig {
  routes: RouteAccessDef[];
  buttons: ButtonAccessDef[];
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
