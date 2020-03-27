import {HashLocationStrategy, Location} from '@angular/common';
import {TcComponent} from '../models/tc-component';

// @dynamic
export class TcCoreCommonFunctions {


  public static escapeString(text) {
    return text.replace(/"/g, '\"');
  }

  public static fileSizeToHuman(size) {
    const e = (Math.log(size) / Math.log(1e3)) | 0;
    return +(size / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B';
  }

  public static camelCaseToWords(str) {
    const re =  str.replace(/([a-z])([A-Z])/g, '$1 $2')
      .replace(/([A-Z])([a-z])/g, ' $1$2')
      .replace(/\ +/g, ' ');
    return re;
  }

  public static convertToJSON(array) {
    const objArray = [];
    for (let i = 1; i < array.length; i++) {
      objArray[i - 1] = {};
      for (let k = 0; k < array[0].length && k < array[i].length; k++) {
        const key = array[0][k];
        objArray[i - 1][key] = array[i][k];
      }
    }
    return objArray;
  }

  public static transposeArray(array, arrayLength) {
    // console.log('transposing array) arrayLength: ' + arrayLength );
    const newArray = [];
    for (let i = 0; i < arrayLength; i++) {
      newArray.push([]);
    }
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < arrayLength; j++) {
        newArray[j].push(array[i][j]);
      }
    }
    return newArray;
  }

  public static camelize = (str: string): string => {
    let newStr = '';
    let newArr = [];

    if (str.indexOf('-') !== -1) {
      newArr = str.split('-');
      for (let i = 0; i < newArr.length; i++) {
        newArr[i] = newArr[i].charAt(0).toUpperCase() + newArr[i].substr(1);
      }
      newStr = newArr.join(' ');
    }
    return newStr;
  }

  public static prepareUrlForNonStaticResource = (location: Location, str: string): string => {
    // @ts-ignore
    if (location._platformStrategy instanceof HashLocationStrategy) {
      return str;
    } else {
      return str;
    }
  }

  public static prepareUrlForStaticResource = (location: Location, str: string): string => {
    // @ts-ignore
    if (location._platformStrategy instanceof HashLocationStrategy) {
      return str;
    } else {
      return location.prepareExternalUrl(str);
    }
  }

  public static calcSummaryCardPct = (width: TcComponent) => {
    if (width.gtLg) {
      return 20;
    } else if (width.gtMd) {
      return 25;
    } else if (width.gtSm) {
      return 33;
    } else if (width.gtXs) {
      return 50;
    } else {
      return 100;
    }
  }

  public static formLayoutToJson = (formLayout: any): string => {
    const replacer = (key, value) => {
      // if we get a function, give us the code for that function
      if (typeof value === 'function') {
        return value.toString();
      }
      return value;
    };
    const serialized = JSON.stringify(formLayout, replacer, 2);
    return serialized;
  }

  public static parseLayoutString = (layoutString: string): any => {
    let newFormObject: any = null;
    try {
      // tslint:disable-next-line:no-eval
      eval('newFormObject = ' + layoutString);
    } catch (error) {
      console.log('eval failed, ', error);
    }
    return newFormObject;
  }

  public static formLayoutJsonToObject = (formLayoutJSON: string): any => {
    const reviver = (key, value) => {
      if (typeof value === 'string'
        && value.indexOf('function ') === 0) {
        const functionTemplate = `(${value})`;
        // tslint:disable-next-line:no-eval
        return eval(functionTemplate);
      }
      return value;
    };
    // const parsedObject = JSON.parse(formLayoutJSON);
    // formLayoutJSON = TcCoreCommonFunctions.escapeString(formLayoutJSON);
    const parsedObject = JSON.parse(formLayoutJSON, reviver);
    return parsedObject;
  }



}
