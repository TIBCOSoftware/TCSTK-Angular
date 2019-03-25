import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tcsp-two-tables',
  templateUrl: './two-tables.component.html',
  styleUrls: ['./two-tables.component.css']
})
export class TwoTablesComponent implements OnInit {

  constructor() { }

  ngOnInit() {
  }

  mySelection = "";
  tableTwoSelection = "";

  changeSelection($event) {
    console.log('Selection Changed: ', $event);
    this.mySelection = $event;
    this.tableTwoSelection = JSON.stringify(JSON.parse(this.mySelection));
  }
}
