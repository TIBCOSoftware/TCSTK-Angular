/* Models used by login and authorization services */

import { Deserializable} from './deserializable';

export class Group {
  constructor(public id: string,
              public type: string
  ) {
  }
}

export class Claim implements Deserializable {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  sandboxes: Sandbox[];
  subscriptionId: string;
  username: string;
  primaryProductionSandbox: Sandbox;
  globalSubscriptionId: string;
  globalSubcriptionId?: string;
  guid: string;
  region: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class Sandbox {
  constructor(public groups: Group[],
              public id: string,
              public type: string,
              public name: string,
              public subscriptionId: string,
              public ownerId: string,
  ) {
  }
}

export class SandboxList {
  sandboxes: Sandbox[];
  deserialize(input: any): this {
    this.sandboxes = [];
    Object.assign(this.sandboxes, input);
    return this;
  }
}

export class AccessToken implements Deserializable {
  access_token: string;
  token_type: string;
  expires_in: number;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class AuthInfo implements Deserializable {
  userName: string;
  firstName: string;
  lastName: string;
  userId: string;
  ts: number;
  access_token;
  orgName: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class Subscription {
  constructor(
    public accountId: string,
    public accountDisplayName: string,
    public ownerName: string,
    public loggedInUserRole: string,
    public regions: string[]
  ) {}
}

export class Owner {
  email: string;
  firstName: string;
  lastName: string;
  role: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class AccountInfo {
  accountDisplayName: string;
  accountId: string;
  loggedInUserRole: string;
  ownerInfo: Owner;
  regions: string[];
}

export class AccountsInfo implements Deserializable {
  accountInfos: AccountInfo[];
  deserialize(input: any): this {
    this.accountInfos = [];
    Object.assign(this.accountInfos, input);
    return this;
  }
}

export class LoginPrefill implements Deserializable {
  emailId: string;
  clientId: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}


