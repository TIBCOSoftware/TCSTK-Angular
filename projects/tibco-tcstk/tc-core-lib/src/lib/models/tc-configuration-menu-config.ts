/* Models used by config menu */

import { Deserializable } from './deserializable';


export class ConfigurationMenuConfig {
    menu: ConfigurationMenuEntry[];
    deserialize(input: any) {
        Object.assign(this, input);
        return this;
    }
}

export class  ConfigurationMenuEntry {
    entry: string;
    icon: string;
    options: string[];
}
