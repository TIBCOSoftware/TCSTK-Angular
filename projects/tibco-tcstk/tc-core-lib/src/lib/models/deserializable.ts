export interface Deserializable {
  deserialize(input: any): this;
}

export class DeserializableClass implements Deserializable {
  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
