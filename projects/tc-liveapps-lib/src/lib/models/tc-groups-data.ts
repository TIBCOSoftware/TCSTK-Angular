import {Deserializable} from 'tc-core-lib';

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
    this.groups = [];
    Object.assign(this.groups, input);
    return this;
  }
}
