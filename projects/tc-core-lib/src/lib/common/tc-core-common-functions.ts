// @dynamic
export class TcCoreCommonFunctions {


  public static escapeString(text) {
    return text.replace(/"/g, '\"');
  }

  public static fileSizeToHuman(size) {
    const e = (Math.log(size) / Math.log(1e3)) | 0;
    return +(size / Math.pow(1e3, e)).toFixed(2) + ' ' + ('kMGTPEZY'[e - 1] || '') + 'B';
  }

}
