import { Deserializable} from './deserializable';

export class ToolbarButton implements Deserializable {
  id: string;
  icon: string;
  visible: boolean;
  enabled: boolean;
  tooltip: string;
  deserialize(input: any) {
    Object.assign(this, input);
    return this;
  }
}
