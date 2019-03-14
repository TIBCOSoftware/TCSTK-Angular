// @dynamic
export class TcCoreCommonFunctions {


  public static escapeString(text) {
    return text.replace(/"/g, '\"');
  }

  public static fileSizeToHuman(size) {
    const e = (Math.log(size) / Math.log(1e3)) | 0;
    return +(size / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B';
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

}
