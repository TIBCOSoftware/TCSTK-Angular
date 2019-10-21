/* models used by landing page config */

import { Deserializable } from './deserializable';

export class ActionButtonConfig {
    public text: string;
    public route: string;
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

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
    public topMargin: number;
    public homeRoute: string;
    public highlights: LandingPageItemConfig[];
    public actionButton: ActionButtonConfig[];
    public roles: string[];
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class GeneralLandingPageConfig implements Deserializable {
    id: string;
    version: string;
    uiAppId: string;
    landingPage: LandingPageConfig[];
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}
