import {Deserializable} from 'tc-core-lib';

export class AuditEvent implements Deserializable {
  value: string;
  type: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class AuditEventList implements Deserializable {
  auditevents: AuditEvent[];
  deserialize(input: any): this {
    this.auditevents = [];
    Object.assign(this.auditevents, input);
    return this;
  }
}
