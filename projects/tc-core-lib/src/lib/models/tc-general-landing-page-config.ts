import { Deserializable } from './deserializable';

export class LandingPageItemConfig {
    public title: string;
    public content: string;
    public iconURL: string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class LandingPageConfig {
    public key: string;
    public description: string;
    public title: string;
    public subtitle: string;
    public backgroundURL: string;
    public homeRoute: string;
    public highlights: LandingPageItemConfig[];
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class GeneralLandingPageConfig implements Deserializable {
    id: string;
    version: string;
    landingPage: LandingPageConfig[];
    roles: string[];
    priority: number;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
