import {
  Component,
  Input,
  Output,
  EventEmitter,
  SimpleChanges,
  OnChanges,
  QueryList,
  TemplateRef,
  ContentChildren
} from '@angular/core';
import { TcPrimeNGHelperService } from '../../services/tc-primeng-helper.service';
import { tap } from 'rxjs/operators';
import { get } from 'lodash';
import { trigger, state, style, transition, animate } from '@angular/animations';
import { PrimeTemplate } from 'primeng/api';
import { CurrencyPipe, DatePipe } from '@angular/common';

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
   * Display the button on the right side
   */
  @Input() showFilterRow: boolean;

  /**
   * Column Definition array to display grid
   */
  @Input() columnDefs: any[];

  /**
   * Template for the expansion row
   */
  @Input() rowExpansionTemplate: TemplateRef<any>;

  /**
   * Generates the automatically the layout.
   */
  public autoLayout: boolean = true;
  @Input('autoLayout') set AutoLayout(autoLayout: boolean) {
    if (autoLayout){
      this.autoLayout = autoLayout;
    }
  }

  /**
   * Display the button on the right side
   */
  public showExpandButton: boolean = false;
  @Input('showExpandButton') set ShowExpandButton(showExpandButton: boolean) {
    if (showExpandButton){
      this.showExpandButton = showExpandButton;
    }
  }

  /**
   * Display pagination bar at the botton
   */
  public paginator: boolean = false;
  @Input('paginator') set Paginator(paginator: boolean) {
    if (paginator){
      this.paginator = paginator;
    }
  }

  /**
   * Display page report at the botton
   */
  public showCurrentPageReport: boolean = false;
  @Input('showCurrentPageReport') set ShowCurrentPageReport(showCurrentPageReport: boolean) {
    if (showCurrentPageReport){
      this.showCurrentPageReport = showCurrentPageReport;
    }
  }

  /**
   * Pagination report template
   */
  public currentPageReportTemplate: string = 'Showing {first} to {last} of {totalRecords} entries';
  @Input('currentPageReportTemplate') set CurrentPageReportTemplate(currentPageReportTemplate: string) {
    if (currentPageReportTemplate){
      this.currentPageReportTemplate = currentPageReportTemplate;
    }
  }

  /**
   * Default lines per page
   */
  public defaultRows: number = 5;
  @Input('defaultRows') set DefaultRows(defaultRows: number) {
    if (defaultRows){
      this.defaultRows = defaultRows;
    }
  }

  /**
   * Pagination report template
   */
  public rowsPerPageOptions: number[] = [15,25,50];
  @Input('rowsPerPageOptions') set RowsPerPageOptions(rowsPerPageOptions: number[]) {
    if (rowsPerPageOptions){
      this.rowsPerPageOptions = rowsPerPageOptions;
    }
  }
 
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

  @ContentChildren(PrimeTemplate) templates: QueryList<any>;

  public laRowData;
  public columnConfig;

  constructor(
    protected gridHelperService: TcPrimeNGHelperService,
    protected currencyPipe: CurrencyPipe,
    protected datePipe: DatePipe
  ) {
  }

  ngOnChanges(changes: SimpleChanges): void {
    if (changes.caseRefs && changes.caseRefs.currentValue !== changes.caseRefs.previousValue) {
      this.laRowData = undefined;
      if (this.caseRefs && this.caseRefs.length > 0) {
        if (this.columnDefs) {
          this.columnConfig = this.columnDefs;
        } else {
          this.columnConfig = undefined;
        }
        this.laRowData = this.gridHelperService.getLiveAppsCases(this.sandboxId, this.caseRefs).pipe(
          tap(results => {
            if (!this.columnConfig) {
              this.columnConfig = TcPrimeNGHelperService.defaultColumnConfig(results);
            }
          })
        );
      }
    }
  }

  public getObjectValue(rowdata, column) {
    let value = get(rowdata, column.field);
    if (column.format != undefined){
      switch (column.format) {
        case 'currency':
          value = this.currencyPipe.transform(value, column.currency, 'symbol');
          break;
        case 'date':
          value = this.datePipe.transform(value, column.date);
          break;

        default:
          break;
      }
    }
    return value;
  }

  filtered(ev) {
    // console.log('Filter Event: ', ev);
    // TODO: Highlighting removed for now, do we want to use this ?
    if (ev.length > 2) {
      // this.highlight(ev);
    }
  }
}
