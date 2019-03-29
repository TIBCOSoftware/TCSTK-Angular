import { Deserializable } from 'tc-core-lib';

export class ProcessDiscoveryConfig implements Deserializable {
    id: string;
    uiAppId: string;
    version: string;
    datasourceAppId: string;
    creatorAppId: string;
    locationToStoreFile: string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

