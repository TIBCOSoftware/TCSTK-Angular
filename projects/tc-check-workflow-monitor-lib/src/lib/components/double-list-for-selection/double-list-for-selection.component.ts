import { Component, OnInit } from '@angular/core';
// import {ServiceHandlerService} from '../../services/service-handler.service';

@Component({
  selector: 'tccwm-double-list-for-selection',
  templateUrl: './double-list-for-selection.component.html',
  styleUrls: ['./double-list-for-selection.component.css']
})
export class DoubleListForSelectionComponent implements OnInit {

  public objList = [{"caseName" : "1", "amount" : 1000, "flag": "true"},
    {"caseName" : "2", "amount" : 300, "flag": "true"},
    {"caseName" : "3", "amount" : 1000, "flag": "false"},
    {"caseName" : "4", "amount" : 1000, "flag": "false"}];

  public caseList;


  public selectionList = [];

  constructor() { }

  ngOnInit() {


  }


  onAreaListControlChanged(obj, index) {
    // determine selected options
    this.objList.splice(index, 1);

    obj.selectedForDecision = true;
    this.selectionList.push(obj);
  }



  onSelectionListControlChanged(obj, index) {
    // determine selected options
    this.selectionList.splice(index, 1);

    obj.selectedForDecision = false;
    this.objList.push(obj);
  }

}
