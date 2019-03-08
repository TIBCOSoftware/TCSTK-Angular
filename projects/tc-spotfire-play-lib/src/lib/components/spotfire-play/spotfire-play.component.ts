import { Component, OnInit } from '@angular/core';
import {MatTableDataSource} from '@angular/material';
import { DataSource } from '@angular/cdk/table';

export interface PeriodicElement {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

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
  dataSource: PeriodicElement[] = [
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
  displayedColumns = ['position', 'name', 'weight', 'symbol'];

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

    for (const key in data) {
      if (data.hasOwnProperty(key)) {
        console.log(key + ' -> ' + data[key]);
        this.markingTitles.push(key);
        const mData = new Array();
        const markingElements = data[key];
        for (const ekey in markingElements) {
          console.log('ekey: ' + ekey);
          this.markingDataTables.push(ekey);


          // console.log("ekey data: " , data[ekey]);
          console.log('me data: ' , markingElements);
          console.log('has property: ' + markingElements.hasOwnProperty(ekey));
          if (markingElements.hasOwnProperty(ekey)) {
            const mDataRow = new Array();
            console.log('mkey: ' , markingElements[ekey]);
            const mkey = markingElements[ekey];
            const headA = new Array();
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

            mData.push(this.transposeArray(mDataRow, mDataRow.length));
            this.markingData.push(this.transposeArray(mDataRow, mDataRow.length));
            /*
            var results = {};
            data.forEach(function(el) {
              var name = el[0];
              var prop = el[1];
              var value = el[2];
              results[name] = results[name] || {};
              results[name][prop] = value;
            })*/

            this.markingHeaders.push(headA);

          }

        }




        //this.markingData.push(mData);
      }
    }

    console.log('Marking Headers: ' , this.markingHeaders);
    console.log('Marking Data: ', this.markingData);
    // pivot table
    /*
    for (var pTable of this.markingData){
      console.log("Before: " , pTable);
      pTable.map((col, i) => pTable.map(row => row[i]));
      console.log("After: " , pTable);
      console.log("Lenght: " + pTable[0].length);
      pTable = this.transposeArray(pTable[0], pTable[0].length);
      console.log("After2: " , pTable);
    }

    var test = [
      [1,2,3,4],
      [1,2,3,4],
      [1,2,3,4],
    ];

    console.log(this.transposeArray(test,4));
*/
  }

  private transposeArray(array, arrayLength){
    var newArray = [];
    for(var i = 0; i < arrayLength; i++){
      newArray.push([]);
    };

    for(var i = 0; i < array.length; i++){
      for(var j = 0; j < arrayLength; j++){
        newArray[j].push(array[i][j]);
      };
    };

    return newArray;
  }

}
