import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'tcsp-data-table-example',
  templateUrl: './data-table-example.component.html',
  styleUrls: ['./data-table-example.component.css']
})
export class DataTableExampleComponent implements OnInit {

  ngOnInit() {

  }

  changeSelection($event){
    console.log('Selection Changed: ', $event);
  }

}
