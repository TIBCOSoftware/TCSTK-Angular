import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TibcoCloudTableComponent} from '../tibco-cloud-table/tibco-cloud-table.component';
import {LogService} from '../../services/tc-logging.service';
import {CaseRoute} from 'tc-liveapps-lib';
// import {TcFunctionsService} from '../../services/tc-functions.service';

@Component({
  selector: 'tc-tibco-cloud-select-table',
  templateUrl: './tibco-cloud-select-table.component.html',
  styleUrls: ['./tibco-cloud-select-table.component.css']
})
export class TibcoCloudSelectTableComponent extends TibcoCloudTableComponent {

  @Output() selectedlines: EventEmitter<any> = new EventEmitter<any>();

  selected = {};

  highlight(element) {
    element.highlighted = !element.highlighted;
  }

  constructor(private logger: LogService){ /*, private tcfunctions: TcFunctionsService) {*/
    super();
    logger.info('Select Table Started... ');
  }


  public clicked(row) {
    console.log(row);
    let myData = JSON.parse(JSON.stringify(this.dataSource.data));
    console.log(this.dataSource);
    let selectedArray = new Array();
    for (let line of myData) {
      console.log('s:' , line);
      if (line.highlighted) {
        delete line['hovered'];
        delete line['highlighted'];
        selectedArray.push(line);
      }

    }
    console.log('Selected Array: ' , selectedArray);
    this.selected = JSON.stringify(selectedArray);
    this.selectedlines.emit(this.selected);
  }


}
