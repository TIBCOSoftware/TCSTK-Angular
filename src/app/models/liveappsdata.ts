import { Deserializable} from './deserializable';


export class Group {
  constructor(public id: string,
              public type: string
              ) {
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

export class Metadata {
  constructor(public createdBy:	string,
              public creationTimestamp:	string,
              public modifiedBy:	string,
              public modificationTimestamp:	string,
              public lock:	boolean,
              public lockType:	string,
              public lockedBy:	string,
              public msLockExpiry:	string,
              public msSystemTime:	string,
              public markedForPurge: boolean,
              public applicationId:	string,
              public typeId: string
            ) {
  }
}

export class Claim implements Deserializable {
  email: string;
  firstName: string;
  id: string;
  lastName: string;
  sandboxes: SandboxList;
  // status: Sandbox[];
  subscriptionId: string;
  username: string;

  deserialize(input: any): this {
    Object.assign(this, input);
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
  orgName: string;

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class CaseTypeState implements Deserializable {
  id: string;
  label: string;
  value: string;
  isTerminal: boolean;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class CaseTypeStatesList implements Deserializable {
  states: CaseTypeState[];
  deserialize(input: any): this {
    this.states = [];
    Object.assign(this.states, input);
    return this;
  }
}

export class CaseInfo implements Deserializable {
    caseReference: string;
    untaggedCasedata: string;
    untaggedCasedataObj: any;
    casedata: string;
    casedataObj: any;
    summary:  string;
    summaryObj: any;
    metadata: Metadata;
    deserialize(input: any): this {
      Object.assign(this, input);
      this.summaryObj = this.summary ? JSON.parse(this.summary) : undefined;
      this.casedataObj = this.casedata ? JSON.parse(this.casedata) : undefined;
      this.untaggedCasedataObj = this.untaggedCasedata ? JSON.parse(this.untaggedCasedata) : undefined;
      return this;
    }
}

export class CaseInfoList implements Deserializable {

  caseinfos: CaseInfo[];
  casecount: string;
  deserialize(input: any): this {
    this.caseinfos = [];
    Object.assign(this.caseinfos, input);
    this.caseinfos.forEach(function(caseinfo) {
      caseinfo.summaryObj = JSON.parse(caseinfo.summary);
      caseinfo.casedataObj = JSON.parse(caseinfo.casedata);
    })
    return this;
  }
}

export class CaseAttribute {
  isIdentifier: boolean;
  isMandatory: boolean;
  isStructuredType: true;
  label: string;
  name: string;
  type: string;
  maximum: number;
  minimum: number;
}

export class JsonSchema {
  $schema: string;
  definitions: any[];
  properties: any[];
  type: string;
  required: string[];
}

export class Process {
  jsonSchema: JsonSchema;
  name: string;
  id: string;
}


export class CaseType {
  actions: Process[];
  applicationId: string;
  applicationInternalName: string;
  applicationName: any;
  attributes: CaseAttribute[];
  creators: Process[];
  id:  string;
  isCase: boolean
  label: any;
  name: Metadata;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class CaseTypesList implements Deserializable {
  casetypes: CaseType[];
  deserialize(input: any): this {
    this.casetypes = [];
    Object.assign(this.casetypes, input);
    return this;
  }
}

export class CaseAction implements Deserializable {
  activityName: string;
  applicationId: string;
  applicationName: string;
  availableInStates: string[];
  chatBotEnabled: boolean;
  id: number;
  label: string;
  name: string;
  noData: boolean;
  performerPaths: string[];
  roles: string[];
  version: number;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class CaseActionsList implements Deserializable {
  actions: CaseAction[];
  deserialize(input: any): this {
    this.actions = [];
    Object.assign(this.actions, input);
    return this;
  }
}

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

export class LaProcessSelection {
  type: string;
  appSchema: CaseTypesList;
  caseIdAttribute: CaseAttribute;
  process: Process;
  // Format of ref is <applicationName>.<applicationInternalName>.<processType>.<processName>
  ref: string;
  caseReference: string;
}

export class CaseList {
  uniqueKey: string;
  maxSize: number;
  caseRefs: string[];
  deserialize(input: any): this {
    this.uniqueKey = input.uniqueKey;
    this.maxSize = input.maxSize;
    this.caseRefs = [];
    Object.assign(this.caseRefs, input.caseRefs);
    return this;
  }
}

export class SharedStateContent {
  json: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class SharedStateEntry {
  attributes: string[];
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
  roles: string[];
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

export class SharedStateList {
  sharedStateEntries: SharedStateEntry[];
  deserialize(input: any): this {
    this.sharedStateEntries = [];
    Object.assign(this.sharedStateEntries, input);
    return this;
  }
}

export class Document {
  artifactCheckSum: string;
  artifactRef: string;
  artifactVersion: string;
  author: number;
  authorDetails: UserInfo;
  creationDate: Date;
  description: string;
  id: string;
  lastModifiedBy: string;
  lastModifiedByDetails: UserInfo;
  lastModifiedDate: Date;
  mimeType: string;
  name: string;
  ownerApp: string;
  size: string;
  fileSize: string;
  extension: string;
  fileIcon: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class DocumentList {
  documents: Document[];
  deserialize(input: any): this {
    this.documents = [];
    Object.assign(this.documents, input);
    return this;
  }
}

export class ApiResponseText {
  message: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class UserInfo {
  externalId: string;
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  type: string;
  id: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class NotesRole {
  entityId: string;
  entityName: string;
  entityType: string;
  id: string;
  role: string;
  threadId: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Thread {
  acceptedStatusCount: number;
  actionDate: number;
  actionId: string;
  actionType: string;
  answerNoteCount: number;
  answeredStatusCount: number;
  createdById: string;
  createdByName: string;
  createdDate: number;
  id: string;
  informationalNoteCount: number;
  isAbandoned: boolean;
  isLocked: boolean;
  isOrphaned: boolean;
  issueNoteCount: number;
  lifecycledWithId: boolean;
  lifecycledWithType: boolean;
  modifiedById: string;
  modifiedByName: string;
  modifiedDate: number;
  questionNoteCount: number;
  relatedItemCollection: string[];
  relatedItemId: string;
  relatedItemType: string;
  resolutionNoteCount: number;
  resolvedStatusCount: number;
  roles: NotesRole[];
  status: string;
  topLevelNoteId: string;
  topicId: string;
  totalCount: number;
  unacceptedStatusCount: number;
  unansweredStatusCount: number;
  unclassifiedStatusCount: number;
  unresolvedStatusCount: number;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Note {
  attributes: string[];
  createdById: string;
  createdByName: string;
  createdDate: number;
  descendantModifiedDate: number;
  id: string;
  isDescendantNewOrModified: boolean;
  isHidden: boolean;
  isModified: boolean;
  isNew: boolean;
  level: number;
  modifiedByName: string;
  modifiedDate: number;
  notificationLabel: string;
  notificationUrl: string;
  parentId: string;
  relatedItemCollection: string[];
  relatedItemId: string;
  relatedItemType: string;
  replyAcceptedId: string;
  replyCount: number;
  replyDate: number;
  status: string;
  text: string;
  thread: Thread;
  threadId: string;
  title: string;
  topicId: string;
  type: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class NotesList {
  notes: Note[];
  deserialize(input: any): this {
    this.notes = [];
    Object.assign(this.notes, input);
    return this;
  }
}
