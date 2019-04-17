import { Deserializable } from 'tc-core-lib';

export class ProcessDiscoveryConfig implements Deserializable {
    id: string;
    version: string;
    uiAppId: string;
    datasourceAppId: string;
    creatorAppId: string;
    validateActionAppId: string;
    storeToHDFS: boolean;
    storeToLiveApps: boolean;
    hdfsHostname: string;
    hdfsRootPath: string;
    hdfsUsername: string;
    hdfsOverwriteFile: boolean;
    hdfsPermision: string;
    
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

