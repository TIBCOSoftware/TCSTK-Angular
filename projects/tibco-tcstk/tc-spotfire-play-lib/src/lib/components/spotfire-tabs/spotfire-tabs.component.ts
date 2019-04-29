import {Component, OnInit, ViewChild} from '@angular/core';
import {McSpotfireWrapperComponent} from '@tibco-tcstk/tc-spotfire-lib';

@Component({
  selector: 'tcsp-spotfire-tabs',
  templateUrl: './spotfire-tabs.component.html',
  styleUrls: ['./spotfire-tabs.component.css']
})
export class SpotfireTabsComponent implements OnInit {

  @ViewChild(McSpotfireWrapperComponent) spotfireWrapperComponent: McSpotfireWrapperComponent;

  activepage: string;


  constructor() { }

  ngOnInit() {
    this.activepage = 'Introduction';
  }

  public tabChange($event) {
    console.log('tab change: ', $event);
    console.log($event.index);
    switch ($event.index) {
      case 0:
        this.activepage = 'Introduction';
        break;
      case 1:
        this.activepage = 'Example Dashboard';
        break;
      case 2:
        this.activepage = 'Marking';
        break;


      default:
      // code block
    }
    this.spotfireWrapperComponent.openPage(this.activepage);
  }

}
