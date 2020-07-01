/* models used by shared state services */

import { Deserializable} from './deserializable';

export class SharedStateContent implements Deserializable {
  json: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class StateAttribute implements Deserializable {
  name: string;
  value: string;
  id: string;
  stateId: string;
  deserialize(input: any) {
    this.name = input.name;
    this.value = input.value;
    this.id = input.id;
    this.stateId = input.stateId;

    return this;
  }
}

export class StateRole implements Deserializable {
  entityId: string;
  role: string;
  id: string;
  stateId: string;
  entityName: string;
  entityType: string;

  deserialize(input: any) {
    this.entityId = input.entityId;
    this.role = input.role;
    this.id = input.id;
    this.stateId = input.stateId;
    this.entityName = input.entityName;
    this.entityType = input.entityType;

    return this;
  }

}

export class SharedStateEntry implements Deserializable {
  attributes: StateAttribute[];
  content: SharedStateContent;
  createdBy: string;
  createdByName: string;
  description: string;
  id: string;
  isAbandoned: boolean;
  isOrphaned: boolean;
  links: string[];
  modifiedById: string;
  modifiedByName: string;
  modifiedDate: number;
  name: string;
  roles: StateRole[];
  sandboxId: number;
  scope: string;
  type: string;

  deserialize(input: any): this {
    this.attributes = input.attributes;
    this.content = input.content;
    this.createdBy = input.createdBy;
    this.createdByName = input.createdByName;
    this.description = input.description;
    this.id = input.id;
    this.isAbandoned = input.isAbandoned;
    this.isOrphaned = input.isOrphaned;
    this.links = input.links;
    this.modifiedById = input.modifiedById;
    this.modifiedDate = input.modifiedDate;
    this.name = input.name;
    this.roles = input.roles;
    this.sandboxId = input.sandboxId;
    this.scope = input.scope;
    this.type = input.type;
    this.content = input.json.content;
    return this;
  }
}

export class SharedStateList implements Deserializable {
  sharedStateEntries: SharedStateEntry[];
  deserialize(input: any): this {
    this.sharedStateEntries = [];
    Object.assign(this.sharedStateEntries, input);
    return this;
  }
}
