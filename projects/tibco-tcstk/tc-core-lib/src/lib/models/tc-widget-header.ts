/* models used by widget header - toolbar inside home page/case page widgets like recent cases etc */

import { Deserializable} from './deserializable';

export class ToolbarButton implements Deserializable {
  id: string;
  icon: string;
  visible: boolean;
  enabled: boolean;
  tooltip: string;
  filled: boolean;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
