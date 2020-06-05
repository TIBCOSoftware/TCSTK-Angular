import { Component, OnInit, Input, Output, EventEmitter, SimpleChanges, OnChanges, QueryList, TemplateRef, ContentChildren, AfterContentInit, ViewChild} from '@angular/core';
import { TcPrimeNGHelperService } from '../../services/tc-primeng-helper.service';
import { tap } from 'rxjs/operators';
import { get } from 'lodash';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PrimeTemplate } from 'primeng/api';

@Component({
  selector: 'tcpmg-tcprimeng-liveapps-cases',
  templateUrl: './tcprimeng-liveapps-cases.component.html',
  styleUrls: ['./tcprimeng-liveapps-cases.component.scss'],
  animations: [
    trigger('rowExpansionTrigger', [
      state('void', style({
        transform: 'translateX(-10%)',
        opacity: 0
      })),
      state('active', style({
        transform: 'translateX(0)',
        opacity: 1
      })),
      transition('* <=> *', animate('400ms cubic-bezier(0.86, 0, 0.07, 1)'))
    ])
  ]

})
export class TcprimengLiveappsCasesComponent implements OnChanges {

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * Case references to display in the list
   */
  @Input() caseRefs: string[];

  /**
   * Column Definition array to display grid
   */
  @Input() columnDefs: any[];

  /**
   * Display the button on the right side
   */
  @Input() showExpandButton: boolean;

  /**
   * Array of selected case references
   */
  @Output() selection: EventEmitter<string[]> = new EventEmitter<string[]>();

  /**
   * Case Reference clicked
   */
  @Output() click: EventEmitter<string> = new EventEmitter<string>();

  /**
   * Case Reference double clicked
   */
  @Output() doubleClick: EventEmitter<string> = new EventEmitter<string>();

  public laRowData;
  public gridApi;
  public columnConfig;

  constructor(protected gridHelperService: TcPrimeNGHelperService) {
  }

  public handleSelection(data: any) {
    const selectedCaseRefs: string[] = [];
    data.api.getSelectedRows().forEach((row: any) => {
      selectedCaseRefs.push(row.caseReference);
    })
    this.selection.emit(selectedCaseRefs);
  }

  public handleClick(clicked) {
    this.click.emit(clicked.caseReference);
  }

  public handleDoubleClick(clicked) {
    this.doubleClick.emit(clicked.caseReference);
  }

  ngOnChanges(changes: SimpleChanges): void {

    this.laRowData = [
      {
        brand: 'aa',
        vin: '12345',
        color: 'red',
        year: 2007
      },
      {
        brand: 'aa',
        vin: '12345',
        color: 'red',
        year: 2007
      }
    ];
    // if (changes.caseRefs && changes.caseRefs.currentValue !== changes.caseRefs.previousValue) {
    //   this.laRowData = undefined;
    //   if (this.caseRefs && this.caseRefs.length > 0) {
    //     if (this.columnDefs) {
    //       this.columnConfig = this.columnDefs;
    //     } else {
    //       this.columnConfig = undefined;
    //     }
    //     this.laRowData = this.gridHelperService.getLiveAppsCases(this.sandboxId, this.caseRefs).pipe(
    //       tap(results => {
    //         if (!this.columnConfig) {
    //           this.columnConfig = TcPrimeNGHelperService.defaultColumnConfig(results);
    //         }
    //       })
    //     );
    //   }
    // }
  }

  public getObjectValue(o, s: string) {
    return get(o, s);
  }

  filtered(ev) {
    // console.log('Filter Event: ', ev);
    //TODO: Highlighting removed for now, do we want to use this ?
    if (ev.length > 2) {
      // this.highlight(ev);
    }
  }

  // @Input() public data: any[];
  @ViewChild('mytable', {static:false}) templates;
  headerTemplate: TemplateRef<any>;
  bodyTemplate: TemplateRef<any>;


  gePrimeTemplateByType(type: string): PrimeTemplate {
    const kk = this.templates.find(template => template.getType() === type);
    console.log("*******", kk);
    return this.templates.find(template => template.getType() === type);
  }

  ngAfterContentInit() {
    console.log("^^^^^", this.templates);
    this.headerTemplate = this.gePrimeTemplateByType('header').template;
    this.bodyTemplate = this.gePrimeTemplateByType('body').template;
  }

  // @Input() templateRef: TemplateRef<any>;

}
