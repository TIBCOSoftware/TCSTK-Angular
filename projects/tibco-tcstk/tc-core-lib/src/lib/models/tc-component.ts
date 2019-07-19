import {Sandbox} from '../models/tc-login';
import {Deserializable} from '../models/deserializable';
import {ElementRef} from '@angular/core';

export class TcComponent implements Deserializable {
  width: number;

  /*
xs	'(max-width: 599px)'
sm	'(min-width: 600px) and (max-width: 959px)'
md	'(min-width: 960px) and (max-width: 1279px)'
lg	'(min-width: 1280px) and (max-width: 1919px)'
xl	'(min-width: 1920px) and (max-width: 5000px)'
ltSm	'(max-width: 599px)'
ltMd	'(max-width: 959px)'
ltLg	'(max-width: 1279px)'
ltXl	'(max-width: 1919px)'
gtXs	'(min-width: 600px)'
gtSm	'(min-width: 960px)'
gtMd	'(min-width: 1280px)'
gtLg	'(min-width: 1920px)'
 */
  get xs() {
    return this.width <= 599;
  }

  get sm() {
    return (this.width >= 600 && this.width <= 1279);
  }

  get lg() {
    return (this.width >= 1280 && this.width <= 1919);
  }

  get xl() {
    return (this.width >= 1920 && this.width <= 5000);
  }

  get ltSm() {
    return (this.width <= 599);
  }

  get ltMd() {
    return (this.width <= 959);
  }

  get ltLg() {
    return (this.width <= 1279);
  }

  get ltXl() {
    return (this.width <= 1919);
  }

  get gtXs() {
    return (this.width >= 600);
  }

  get gtSm() {
    return (this.width >= 960);
  }

  get gtMd() {
    return (this.width >= 1280);
  }

  get gtLg() {
    return (this.width >= 1920);
  }

  deserialize(input: any): this {
    Object.assign(this, input);
    return this;
  }
}
