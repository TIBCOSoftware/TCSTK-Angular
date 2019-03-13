import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatPaginator, MatSort} from '@angular/material';
import {TibcoCloudTableDataSource} from './tibco-cloud-table-datasource';

@Component({
  selector: 'tc-tibco-cloud-table',
  templateUrl: './tibco-cloud-table.component.html',
  styleUrls: ['./tibco-cloud-table.component.css']
})
export class TibcoCloudTableComponent implements OnInit {
  @Input() jsonSource: string;
  @ViewChild(MatPaginator) paginator: MatPaginator;
  @ViewChild(MatSort) sort: MatSort;
  dataSource: TibcoCloudTableDataSource;


  /** Columns displayed in the table. Columns IDs can be added, removed, or reordered. */
  displayedColumns = [];
  columns = [];

  ngOnInit() {

    console.log('JSONSource: ', this.jsonSource);
    const parsedJsonSource = JSON.parse(this.jsonSource);
    console.log('Parsed JSON Source: ', parsedJsonSource);
    this.dataSource = new TibcoCloudTableDataSource(this.paginator, this.sort, parsedJsonSource);
    const myColumns = [];
    if (parsedJsonSource.length != null) {
      if (parsedJsonSource.length > 0) {
        console.log(parsedJsonSource[0]);
        if (parsedJsonSource[0] != null) {
          const myColumns = [];
          let m = 0;
          for (const headerName in parsedJsonSource[0]) {
            if (parsedJsonSource[0].hasOwnProperty(headerName)) {
              console.log(m + ' headerName:', headerName);
              this.displayedColumns.push(headerName);
              myColumns[m] = {};
              myColumns[m]['columnDef'] = headerName;
              myColumns[m]['header'] = headerName;
              myColumns[m].cell = function (element) {
                return `${element[headerName]}`;
              };
              this.columns = myColumns;
            }
            m++;
          }
       }
        console.log('myColums:', this.columns);
        //this.columDefArray = this.columns;
      }
    }

  }
  /*
  private log(...m){
    console.log('TIBCO CLOUD TABLE] ' , m);
  }*/
  
}