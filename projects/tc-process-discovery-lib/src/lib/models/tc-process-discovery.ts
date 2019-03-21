import { Deserializable } from 'tc-core-lib';

export class ProcessDiscoveryUserConfig implements Deserializable {
    id: string;
    version: string;
    uiAppId: string;
    datasourceCaseRef: string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}


export class UserPredefinedDatasource implements Deserializable {
    datasourceId: string;
    description: string;
    caseRef: string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

