import {AfterViewInit, Component, OnInit, ViewChild, ViewEncapsulation} from '@angular/core';
import {HotTableComponent, HotTableRegisterer} from '@handsontable/angular';

@Component({
  selector: 'tctab-tc-handsontable',
  templateUrl: './tc-handsontable.component.html',
  styleUrls: ['./tc-handsontable.component.css'],
  // this allows the styles in this component.css to leak down to child components (in this case the handsontable components)
  encapsulation: ViewEncapsulation.None
})
export class TcHandsontableComponent implements OnInit, AfterViewInit {

  dataset: any[] = [
    {id: 1, name: 'Ted Right', address: 'Wall Street'},
    {id: 2, name: 'Frank Honest', address: 'Pennsylvania Avenue'},
    {id: 3, name: 'Joan Well', address: 'Broadway'},
    {id: 4, name: 'Gail Polite', address: 'Bourbon Street'},
    {id: 5, name: 'Michael Fair', address: 'Lombard Street'},
    {id: 6, name: 'Mia Fair', address: 'Rodeo Drive'},
    {id: 7, name: 'Cora Fair', address: 'Sunset Boulevard'},
    {id: 8, name: 'Jack Right', address: 'Michigan Avenue'},
  ];


  id = 'hotTable';
  private ht = new HotTableRegisterer();
  private inst;
  selection = [];


  contextMenu = [
    {
      name: 'Export to liveapps',
      callback: () => {
        alert('Exporting: ' + this.selection);
      }
    }
  ];

  onSelection = (r, c, r2, c2) => {
    this.selection = [];
    console.log('coordinates: ', r, c, r2, c2);

    for (let i = r; i < (r2 + 1); i++) {
      this.selection.push(this.inst.getDataAtRow(i));
    }
  }

  constructor() { }

  ngAfterViewInit(): void {
    this.inst = this.ht.getInstance('hotTable');
    this.inst.addHook('afterSelectionEnd', this.onSelection);
  }

  ngOnInit() {
  }

}
