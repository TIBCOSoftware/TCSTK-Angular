import {Component, EventEmitter, OnInit, Output} from '@angular/core';
import {TibcoCloudTableComponent} from '../tibco-cloud-table/tibco-cloud-table.component';
import {LogService} from '../../services/tc-logging.service';

/**
 * A table that allows rows to be selected
 *
 *@example <tc-tibco-cloud-select-table></tc-tibco-cloud-select-table>
 */

@Component({
  selector: 'tc-tibco-cloud-select-table',
  templateUrl: './tibco-cloud-select-table.component.html',
  styleUrls: ['./tibco-cloud-select-table.component.css']
})
export class TibcoCloudSelectTableComponent extends TibcoCloudTableComponent {


  /**
   * ~event selectedlines : the lines selected
   * ~payload any : The lines that are selected in the table by the user
   */
  @Output() selectedlines: EventEmitter<any> = new EventEmitter<any>();

  selected = {};

  highlight(element) {
    element.highlighted = !element.highlighted;
  }

  constructor(protected logger: LogService) { /*, protected tcfunctions: TcFunctionsService) {*/
    super();
    logger.info('Select Table Started... ');
  }


  public clicked(row) {
    // console.log(row);
    const myData = JSON.parse(JSON.stringify(this.dataSource.data));
    // console.log(this.dataSource);
    const selectedArray = new Array();
    for (const line of myData) {
      // console.log('s:' , line);
      if (line.highlighted) {
        delete line['hovered'];
        delete line['highlighted'];
        selectedArray.push(line);
      }

    }
    // console.log('Selected Array: ' , selectedArray);
    this.selected = JSON.stringify(selectedArray);
    this.selectedlines.emit(this.selected);
  }


}
