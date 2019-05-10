import {Deserializable} from '@tibco-tcstk/tc-core-lib';

export class CustomFormDefs implements Deserializable {
  customForms: string[];
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
