import { Component, OnInit } from '@angular/core';


@Component({
  selector: 'tcsp-spotfire-play',
  templateUrl: './spotfire-play.component.html',
  styleUrls: ['./spotfire-play.component.css']
})



export class SpotfirePlayComponent implements OnInit {

  markingdata: any;

  markingTitles = new Array();
  markingDataTables = new Array();
  markingHeaders = new Array(new Array());
  markingData = new Array(new Array(new Array()));

  displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  constructor() { }

  ngOnInit() {


  }

  public marking(data) {
    console.log('Marking: ' + JSON.stringify(data, null, 2));
    console.log(data);
    this.markingdata = data; // JSON.stringify(data, null, 2);

    this.markingTitles = new Array();
    this.markingDataTables = new Array();
    this.markingHeaders = new Array();
    this.markingData = new Array();

    // this.markingHeaders.push('Number');

    // iterate over the marking data tables
    for (const markingName in data) {
      if (data.hasOwnProperty(markingName)) {
        console.log(markingName + ' -> ' + data[markingName]);
        this.markingTitles.push(markingName);
        // const mData = new Array();
        const markingElements = data[markingName];
        for (const dataTableName in markingElements) {
          console.log('elementKey: ' + dataTableName);
          this.markingDataTables.push(dataTableName);


          // console.log("ekey data: " , data[ekey]);
          console.log('me data: ' , markingElements);
          console.log('has property: ' + markingElements.hasOwnProperty(dataTableName));
          if (markingElements.hasOwnProperty(dataTableName)) {
            const mDataRow = new Array();
            console.log('mkey: ' , markingElements[dataTableName]);
            const mkey = markingElements[dataTableName];
            const headA = new Array();
            headA.push('Number');
            for (const head in mkey) {
              console.log('head: ' + head);
              headA.push(head);
              if (mkey.hasOwnProperty(head)) {
                const mDataD = new Array();
                const dkey = mkey[head];
                for (const dElement in dkey) {
                  if (dkey.hasOwnProperty(dElement)) {
                  // console.log('data: ' + dkey[dElement]);
                  }
                  mDataD.push(dkey[dElement]);

                }
                mDataRow.push(mDataD);
                console.log('mDataD: ', mDataD);

              }


            }
            console.log('mDataRow: ', mDataRow);

            // mData.push(this.transposeArray(mDataRow, mDataRow.length));
            // Add numbers for the first column
            const numberOfDataRows = mDataRow[0].length;
            let rowNumberArray = new Array();
            for (let i = 0 ; i < numberOfDataRows ; i++) {
              rowNumberArray.push(i + 1);
            }
            // insert rows before
            mDataRow.unshift(rowNumberArray);

            this.markingData.push(this.transposeArray(mDataRow, numberOfDataRows));
            this.dataSource = this.convertToJSON(this.markingData[this.markingData.length - 1]);
            console.log("Datasource: " , this.dataSource);


            this.markingHeaders.push(headA);

          }

        }




        // this.markingData.push(mData);
      }
    }

    console.log('Marking Headers: ' , this.markingHeaders);
    console.log('Marking Data: ', this.markingData);

  }

  private convertToJSON(array) {
    var objArray = [];
    for (var i = 1; i < array.length; i++) {
      objArray[i - 1] = {};
      for (var k = 0; k < array[0].length && k < array[i].length; k++) {
        var key = array[0][k];
        objArray[i - 1][key] = array[i][k]
      }
    }

    return objArray;
  }

  private transposeArray(array, arrayLength) {
    console.log('transposing array) arrayLength: ' + arrayLength );
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

var ELEMENT_DATA = [
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
  {position: 1, name: 'Hydrogen', weight: 1.0079, symbol: 'H'},
  {position: 2, name: 'Helium', weight: 4.0026, symbol: 'He'},
  {position: 3, name: 'Lithium', weight: 6.941, symbol: 'Li'},
  {position: 4, name: 'Beryllium', weight: 9.0122, symbol: 'Be'},
  {position: 5, name: 'Boron', weight: 10.811, symbol: 'B'},
  {position: 6, name: 'Carbon', weight: 12.0107, symbol: 'C'},
  {position: 7, name: 'Nitrogen', weight: 14.0067, symbol: 'N'},
  {position: 8, name: 'Oxygen', weight: 15.9994, symbol: 'O'},
  {position: 9, name: 'Fluorine', weight: 18.9984, symbol: 'F'},
  {position: 10, name: 'Neon', weight: 20.1797, symbol: 'Ne'},
];
