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

export class Datasource implements Deserializable {
    datasourceId: string;
    description: string;
    caseRef: string;
    idDefinition: string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class ChangeDatasourceSelectionContext {
    constructor(
        public currentDatasource: Datasource,
        public sandboxId: number,
        public datasourceAppId: string,
        public uiAppId: string
        // public application: CaseType,
        // public initialData: any,
        // public sandboxId: number
    ) { }
}

