import { Deserializable, GeneralConfig } from '@tibco-tcstk/tc-core-lib';

export class SpotfireConfig implements Deserializable {
    id: string;
    uiAppId: string;
    spotfireServer: string;
    analysisPath: string;
    tableName: string;
    activePageForHome: string;
    activePageForDetails: string;
    markingName: string;
    maxMarkings: number;
    allowedPages: string[];
    columnNames: string[];
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class AttributeMapping {
  sourceAttr: string;
  targetAttr: string;
}


export class SpotfireMarkingCreateCaseConfig implements Deserializable {
  markingName: string;
  tableName: string;
  objectPath: string;
  attributes: Array<AttributeMapping>;
  initialValue: any;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}

