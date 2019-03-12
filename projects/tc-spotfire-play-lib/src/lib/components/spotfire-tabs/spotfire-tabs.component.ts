import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'tcsp-spotfire-tabs',
  templateUrl: './spotfire-tabs.component.html',
  styleUrls: ['./spotfire-tabs.component.css']
})
export class SpotfireTabsComponent implements OnInit {

  activepage: string;

  constructor() { }

  ngOnInit() {
    this.activepage = 'Introduction';
  }

  private tabChange($event){
    console.log('tab change: ', $event);
    console.log($event.index);
    switch($event.index) {
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
  }

}
