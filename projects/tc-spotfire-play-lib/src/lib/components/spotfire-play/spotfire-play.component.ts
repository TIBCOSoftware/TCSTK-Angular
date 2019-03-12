import {AfterViewInit, Component, OnInit, ViewChild} from '@angular/core';
import {DataSource} from '@angular/cdk/table';
import {Observable} from 'rxjs';
import { of } from 'rxjs';
import {MatSort} from '@angular/material';


@Component({
  selector: 'tcsp-spotfire-play',
  templateUrl: './spotfire-play.component.html',
  styleUrls: ['./spotfire-play.component.css']
})



export class SpotfirePlayComponent implements OnInit, AfterViewInit {

  @ViewChild(MatSort) sort: MatSort;

  markingdata: any;

  markingTitles = new Array();
  markingDataTables = new Array();
  markingHeaders = new Array(new Array());
  markingData = new Array(new Array(new Array()));
  dataSourceJson = new Array();
  columDefArray = new Array();




  // dataSourceSample = new ExampleDataSource();


  // dataSource = new MyDataSource(this.dataSourceJson[0]);

  constructor() { }

  ngOnInit() {


  }

  ngAfterViewInit(): void {
   // this.dataSource.sort = this.sort;
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
            const prepDataSourcehWithHeaders = prepDataSource.slice();
            prepDataSourcehWithHeaders.unshift(this.markingHeaders[this.markingHeaders.length - 1]);
            console.log('prepDataSourchWithHeaders: ', prepDataSourcehWithHeaders);
            // .unshift(this.markingHeaders[this.markingHeaders.length - 1]
            this.dataSourceJson.push(this.convertToJSON(prepDataSourcehWithHeaders));
            console.log('dataSourceJSON: ' , this.dataSourceJson);
          }
        }
      }
    }

    console.log('Marking Headers: ' , this.markingHeaders);
    console.log('Marking Data: ', this.markingData);
    // console.log('colums: ' , this.columns);


    for (let k = 0; k < this.markingHeaders.length; k++) {
      const myColumns = [];
      for (let m = 0; m < this.markingHeaders[k].length; m++) {
        const mh = this.markingHeaders[k][m];
        console.log('mh: ', mh);
        myColumns[m] = {};
        myColumns[m]['columnDef'] = mh;
        myColumns[m]['header'] = mh;
        // let set = 'myColumns[m].cell = function(element) {return `${element[\'' + mh + '\']}` };';
        // eval(set);
        myColumns[m].cell = function(element) {return `${element[mh]}`; };
      }
      console.log('myColums:', myColumns);
      this.columDefArray.push(myColumns);
      // this.dataSource = new MyDataSource(this.dataSourceJson[0]);

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



/*

export class MyDataSource extends DataSource<any> {
  // Connect function called by the table to retrieve one stream containing the data to render.

  data: any;

  constructor(private d){
    super();
    this.data = d;

  }

  connect(): Observable<any[]> {
    return of(this.data);
  }

  disconnect() {}


  public sort(){
    console.log('Sorting....');
  }
}

*/
