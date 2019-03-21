import { Location } from '@angular/common';

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

  public static prepareUrlForStaticResource = (location: Location, str: string): string => {
    // todo: JS is there a better way to detect hash location strategy?
    // @ts-ignore
    if (location._platformStrategy._platformLocation.hash) {
      console.log('*** path:', str);
      return str;
    } else {
      return location.prepareExternalUrl(str);
    }
  }

}
