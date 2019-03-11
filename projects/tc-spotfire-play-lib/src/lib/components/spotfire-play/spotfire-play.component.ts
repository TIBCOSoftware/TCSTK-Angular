import { Component, OnInit } from '@angular/core';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import { of } from 'rxjs';


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
  dataSourceJson = new Array();
  columDefArray = new Array();

  // displayedColumns: string[] = ['position', 'name', 'weight', 'symbol'];
  dataSource = ELEMENT_DATA;

  columns = [
    { columnDef: 'position', header: 'No.',    cell: (element: Element) => `${element.position}` },
    { columnDef: 'name',     header: 'Name',   cell: (element: Element) => `${element.name}`     },
    { columnDef: 'weight',   header: 'Weight', cell: (element: Element) => `${element['weight']}`   },
    { columnDef: 'symbol',   header: 'Symbol', cell: (element: Element) => `${element.symbol}`   },
  ];

  displayedColumns = this.columns.map(c => c.columnDef);
  dataSourceSample = new ExampleDataSource();



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
    this.dataSourceJson = new Array();
    this.columDefArray = new Array();

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
            const rowNumberArray = new Array();
            for (let i = 0 ; i < numberOfDataRows ; i++) {
              rowNumberArray.push(i + 1);
            }
            // insert rows before
            mDataRow.unshift(rowNumberArray);

            this.markingData.push(this.transposeArray(mDataRow, numberOfDataRows));
            this.markingHeaders.push(headA);


            // this.dataSource = this.convertToJSON(this.markingData[this.markingData.length - 1]);
            const prepDataSource = this.markingData[this.markingData.length - 1];
            console.log('prepDataSource: ', prepDataSource);
            console.log('Headers: ', this.markingHeaders[this.markingHeaders.length - 1]);
            const prepDataSourchWithHeaders = prepDataSource.slice();
            prepDataSourchWithHeaders.unshift(this.markingHeaders[this.markingHeaders.length - 1]);
            console.log('prepDataSourchWithHeaders: ', prepDataSourchWithHeaders);
            // .unshift(this.markingHeaders[this.markingHeaders.length - 1]
            this.dataSourceJson.push(this.convertToJSON(prepDataSourchWithHeaders));
            console.log('dataSourceJSON: ' , this.dataSourceJson);




          }

        }




        // this.markingData.push(mData);
      }
    }

    console.log('Marking Headers: ' , this.markingHeaders);
    console.log('Marking Data: ', this.markingData);

    console.log('colums: ' , this.columns);


    for(let k = 0; k < this.markingHeaders.length; k++) {
      var myColumns = [];
      for (let m = 0; m < this.markingHeaders[k].length; m++) {
        const mh = this.markingHeaders[k][m];
        console.log('mh: ', mh);
        myColumns[m] = {};
        myColumns[m]['columnDef'] = mh;
        myColumns[m]['header'] = mh;
        var set = "myColumns[m].cell = function(element) {return `${element['" + mh + "']}` };";
        eval(set);

      }
      console.log('myColums:', myColumns);
      this.columDefArray.push(myColumns);

    }
    console.log('this.columDefArray:', this.columDefArray);

  }

  private convertToJSON(array) {
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

export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

const ELEMENT_DATA = [
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


const data: Element[] = [
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
  {position: 11, name: 'Sodium', weight: 22.9897, symbol: 'Na'},
  {position: 12, name: 'Magnesium', weight: 24.305, symbol: 'Mg'},
  {position: 13, name: 'Aluminum', weight: 26.9815, symbol: 'Al'},
  {position: 14, name: 'Silicon', weight: 28.0855, symbol: 'Si'},
  {position: 15, name: 'Phosphorus', weight: 30.9738, symbol: 'P'},
  {position: 16, name: 'Sulfur', weight: 32.065, symbol: 'S'},
  {position: 17, name: 'Chlorine', weight: 35.453, symbol: 'Cl'},
  {position: 18, name: 'Argon', weight: 39.948, symbol: 'Ar'},
  {position: 19, name: 'Potassium', weight: 39.0983, symbol: 'K'},
  {position: 20, name: 'Calcium', weight: 40.078, symbol: 'Ca'},
];


export class ExampleDataSource extends DataSource<any> {
  /** Connect function called by the table to retrieve one stream containing the data to render. */
  connect(): Observable<Element[]> {
    return of(data);
  }

  disconnect() {}
}
