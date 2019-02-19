import { Deserializable} from './deserializable';

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


