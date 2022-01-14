import {Deserializable} from '@TIBCOSoftware/tc-core-lib';
import {UserInfo} from './liveappsdata';

export class DocumentAction implements Deserializable {
  action: string;
  document: Document;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

export class Document implements Deserializable {
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

export class DocumentList implements Deserializable {
  documents: Document[];
  deserialize(input: any): this {
    this.documents = [];
    Object.assign(this.documents, input);
    return this;
  }
}

export class OrgFolder implements Deserializable {
  id: string;
  name: string;
  owner: string;
  ownerSub: string;
  ownerSandbox: string;
  creationDate: string;
  lastModifiedDate: string;
  lastModifiedBy: string;
  publishedVersion: string;
  latestVersion: string;
  publisedVersionId: string;
  latestVersionId: string;
  checksum: string;
  extRef: string;
  tags: DocTags[];
  descriptor: string;
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}

export class DocTags implements Deserializable {
  id: string;
  name: string;
  ownerSub: string;
  deserialize(input: any): this {
    return this;
  }
}
