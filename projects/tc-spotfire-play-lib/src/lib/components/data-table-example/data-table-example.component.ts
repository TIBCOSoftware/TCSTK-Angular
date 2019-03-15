import { Component, OnInit, ViewChild } from '@angular/core';


@Component({
  selector: 'tcsp-data-table-example',
  templateUrl: './data-table-example.component.html',
  styleUrls: ['./data-table-example.component.css']
})
export class DataTableExampleComponent implements OnInit {

  mySelection = {};
  myBigSelection = {};

  ngOnInit() {

  }

  changeSelection($event) {
    console.log('Selection Changed: ', $event);
    this.mySelection = $event;
  }

  changeSelectionBig($event) {
  console.log('Big Selection Changed: ', $event);
  this.myBigSelection = $event;
}

}
