import {AccessToken, AuthInfo, Deserializable} from 'tc-core-lib';

// export class NoteThread {
//   constructor(public threadId: string,
//               public showReplies: boolean,
//               public showNewReply: boolean,
//               public editMode: boolean,
//               public newReply: any,
//               public thread: Note[],
//               public note: Note
//   ) {
//   }
// }

export class ProcessDiscoveryCaseRoute {
  public caseRef: string;
  public appId: string;
  public typeId: string;
  public option: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

// export class RouteAction {
//   constructor(public action: string,
//               public context: any
//   ) {}
// }

// export class NotificationCollection {
//   constructor(
//     public collectionName: string,
//     public lifecycledWithType: string,
//     public lifecycledWithId: string
//   ) { }
// }

// export class Notification implements Deserializable {
//   entityId: string;
//   entityName: string;
//   entityType: string;
//   id: string;
//   notifyCollection: NotificationCollection;
//   notifyOnAllReplies: boolean;
//   notifyOnUpdate: boolean;
//   threadId: string;
//   topicId: string;
//   type: string;
//   deserialize(input: any): this {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class NotificationList implements Deserializable {
//   notifications: Notification[];
//   deserialize(input: any): this {
//     this.notifications = [];
//     Object.assign(this.notifications, input);
//     return this;
//   }
// }

// export class ThreadList implements Deserializable {
//   threads: NoteThread[];
//   deserialize(input: any): this {
//     this.threads = [];
//     Object.assign(this.threads, input);
//     return this;
//   }
// }

// export class Group {
//   constructor(public id: string,
//               public type: string
//               ) {
//   }
// }

// export class Sandbox {
//   constructor(public groups: Group[],
//               public id: string,
//               public type: string,
//               public name: string,
//               public subscriptionId: string,
//               public ownerId: string,
//               ) {
//   }
// }

// export class SandboxList {
//   sandboxes: Sandbox[];
//   deserialize(input: any): this {
//     this.sandboxes = [];
//     Object.assign(this.sandboxes, input);
//     return this;
//   }
// }

// export class Metadata {
//   constructor(public createdBy:	string,
//               public creationTimestamp:	string,
//               public createdByDetails: UserInfo,
//               public modifiedBy:	string,
//               public modificationTimestamp:	string,
//               public modifiedByDetails: UserInfo,
//               public lock:	boolean,
//               public lockType:	string,
//               public lockedBy:	string,
//               public msLockExpiry:	string,
//               public msSystemTime:	string,
//               public markedForPurge: boolean,
//               public applicationId:	string,
//               public applicationLabel: string,
//               public typeId: string,
//               public stateColor: string,
//               public stateIcon: string,
//               public caseTypeColor: string,
//               public caseTypeIcon: string
//             ) {
//   }
// }

// export class Claim implements Deserializable {
//   email: string;
//   firstName: string;
//   id: string;
//   lastName: string;
//   sandboxes: Sandbox[];
//   subscriptionId: string;
//   username: string;
//   primaryProductionSandbox: Sandbox;

//   deserialize(input: any): this {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class CaseTypeState implements Deserializable {
//   id: string;
//   label: string;
//   value: string;
//   isTerminal: boolean;
//   deserialize(input: any): this {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class CaseTypeStatesListList implements  Deserializable {
//   casetypes: CaseTypeStatesList[];
//   deserialize(input: any): this {
//     this.casetypes = [];
//     Object.assign(this.casetypes, input);
//     return this;
//   }
// }

// export class CaseTypeStatesList implements Deserializable {
//   states: CaseTypeState[];
//   deserialize(input: any): this {
//     this.states = [];
//     Object.assign(this.states, input);
//     return this;
//   }
// }

// export class CaseInfo implements Deserializable {
//     caseReference: string;
//     untaggedCasedata: string;
//     untaggedCasedataObj: any;
//     casedata: string;
//     casedataObj: any;
//     summary:  string;
//     summaryObj: any;
//     metadata: Metadata;
//     deserialize(input: any): this {
//       Object.assign(this, input);
//       this.summaryObj = this.summary ? JSON.parse(this.summary) : undefined;
//       this.casedataObj = this.casedata ? JSON.parse(this.casedata) : undefined;
//       this.untaggedCasedataObj = this.untaggedCasedata ? JSON.parse(this.untaggedCasedata) : undefined;
//       return this;
//     }
// }

// export class CaseInfoList implements Deserializable {

//   caseinfos: CaseInfo[];
//   casecount: string;
//   deserialize(input: any): this {
//     this.caseinfos = [];
//     Object.assign(this.caseinfos, input);
//     this.caseinfos.forEach(function(caseinfo) {
//       if (caseinfo.summary) { caseinfo.summaryObj = JSON.parse(caseinfo.summary); }
//       if (caseinfo.casedata) { caseinfo.casedataObj = JSON.parse(caseinfo.casedata); }
//     })
//     return this;
//   }
// }

// export class CaseAttribute {
//   isIdentifier: boolean;
//   isMandatory: boolean;
//   isStructuredType: true;
//   label: string;
//   name: string;
//   type: string;
//   maximum: number;
//   minimum: number;
// }

// export class JsonSchema {
//   $schema: string;
//   definitions: any[];
//   properties: any[];
//   type: string;
//   required: string[];
// }

// export class Process {
//   jsonSchema: JsonSchema;
//   name: string;
//   id: string;
// }

// export class ProcessId {
//   caseIdentifier: string;
//   caseReference: string;
//   deserialize(input: any): this {
//     Object.assign(this, input);
//     return this;
//   }
// }


// export class CaseType {
//   actions: Process[];
//   applicationId: string;
//   applicationInternalName: string;
//   applicationName: any;
//   attributes: CaseAttribute[];
//   creators: Process[];
//   id:  string;
//   isCase: boolean
//   label: any;
//   name: Metadata;
//   jsonSchema: JsonSchema;
//   deserialize(input: any): this {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class CaseTypesList implements Deserializable {
//   casetypes: CaseType[];
//   deserialize(input: any): this {
//     this.casetypes = [];
//     Object.assign(this.casetypes, input);
//     return this;
//   }
// }

// export class CaseAction implements Deserializable {
//   activityName: string;
//   applicationId: string;
//   applicationName: string;
//   availableInStates: string[];
//   chatBotEnabled: boolean;
//   id: number;
//   label: string;
//   name: string;
//   noData: boolean;
//   performerPaths: string[];
//   roles: string[];
//   version: number;
//   process: Process;
//   deserialize(input: any): this {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class CaseActionsList implements Deserializable {
//   actions: CaseAction[];
//   deserialize(input: any): this {
//     this.actions = [];
//     Object.assign(this.actions, input);
//     return this;
//   }
// }

// export class CaseList implements Deserializable {
//   uniqueKey: string;
//   maxSize: number;
//   caseRefs: string[];
//   deserialize(input: any): this {
//     this.uniqueKey = input.uniqueKey;
//     this.maxSize = input.maxSize;
//     this.caseRefs = [];
//     Object.assign(this.caseRefs, input.caseRefs);
//     return this;
//   }
// }

// export class ApiResponseText implements Deserializable {
//   message: string;
//   deserialize(input: any) {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class ApiResponseError implements Deserializable {
//   errorMsg: string;
//   errorCode: string;
//   contextAttributes: string[];
//   deserialize(input: any): this {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class UserInfo implements Deserializable {
//   externalId: string;
//   firstName: string;
//   lastName: string;
//   username: string;
//   email: string;
//   type: string;
//   id: string;
//   deserialize(input: any) {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class NotesRole implements Deserializable {
//   entityId: string;
//   entityName: string;
//   entityType: string;
//   id: string;
//   role: string;
//   threadId: string;
//   deserialize(input: any) {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class Thread implements Deserializable {
//   acceptedStatusCount: number;
//   actionDate: number;
//   actionId: string;
//   actionType: string;
//   answerNoteCount: number;
//   answeredStatusCount: number;
//   createdById: string;
//   createdByName: string;
//   createdDate: number;
//   id: string;
//   informationalNoteCount: number;
//   isAbandoned: boolean;
//   isLocked: boolean;
//   isOrphaned: boolean;
//   issueNoteCount: number;
//   lifecycledWithId: boolean;
//   lifecycledWithType: boolean;
//   modifiedById: string;
//   modifiedByName: string;
//   modifiedDate: number;
//   questionNoteCount: number;
//   relatedItemCollection: string[];
//   relatedItemId: string;
//   relatedItemType: string;
//   resolutionNoteCount: number;
//   resolvedStatusCount: number;
//   roles: NotesRole[];
//   status: string;
//   topLevelNoteId: string;
//   topicId: string;
//   totalCount: number;
//   unacceptedStatusCount: number;
//   unansweredStatusCount: number;
//   unclassifiedStatusCount: number;
//   unresolvedStatusCount: number;
//   deserialize(input: any) {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class Note implements Deserializable {
//   attributes: string[];
//   createdById: string;
//   createdByName: string;
//   createdDate: number;
//   descendantModifiedDate: number;
//   id: string;
//   isDescendantNewOrModified: boolean;
//   isHidden: boolean;
//   isModified: boolean;
//   isNew: boolean;
//   level: number;
//   modifiedByName: string;
//   modifiedDate: number;
//   notificationLabel: string;
//   notificationUrl: string;
//   parentId: string;
//   relatedItemCollection: string[];
//   relatedItemId: string;
//   relatedItemType: string;
//   replyAcceptedId: string;
//   replyCount: number;
//   replyDate: number;
//   status: string;
//   text: string;
//   thread: Thread;
//   threadId: string;
//   title: string;
//   topicId: string;
//   type: string;
//   editMode: boolean;
//   deserialize(input: any) {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class NotesList implements Deserializable {
//   notes: Note[];
//   deserialize(input: any): this {
//     this.notes = [];
//     Object.assign(this.notes, input);
//     return this;
//   }
// }

// export class IconMap {
//   constructor(
//     public isCaseType: boolean,
//     public state: string,
//     public fill: string,
//     public icon: string
//   ) {}
// }

// export class CardConfig implements Deserializable {
//   id: string;
//   stateMap: IconMap[];
//   deserialize(input: any): this {
//     // this.stateMap = [];
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class LoginContext implements Deserializable {
//   authInfo: AuthInfo;
//   accessToken: AccessToken;
//   deserialize(input: any) {
//     Object.assign(this, input);
//     return this;
//   }
// }

// export class CaseSearchResults implements Deserializable {
//   caserefs: string[];
//   searchString: string;
//   deserialize(input: any) {
//     Object.assign(this, input);
//     return this;
//   }
// }
