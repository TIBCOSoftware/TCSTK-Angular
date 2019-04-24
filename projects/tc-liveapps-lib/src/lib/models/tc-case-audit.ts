import {Deserializable} from 'tc-core-lib';

export class AuditEventAttribute implements Deserializable {
  type: string;
  value: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class AuditEvent implements Deserializable {
  // value: string;
  // type: string;
  messageId: AuditEventAttribute;
  creationTime: AuditEventAttribute;
  delayTime: AuditEventAttribute;
  procName: AuditEventAttribute;
  principalName: AuditEventAttribute;
  taskType: AuditEventAttribute;
  taskName: AuditEventAttribute;
  label: AuditEventAttribute;
  caseState: AuditEventAttribute;
  artifactPath: AuditEventAttribute;
  severity: AuditEventAttribute;
  message: AuditEventAttribute;
  param0: AuditEventAttribute;
  param1: AuditEventAttribute;

  key: AuditEventAttribute;
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
