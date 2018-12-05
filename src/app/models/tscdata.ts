import { Deserializable} from './deserializable';
import {CaseType} from './liveappsdata';

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


