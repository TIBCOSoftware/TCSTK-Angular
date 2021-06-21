import {Component, ContentChildren, EventEmitter, Input, OnInit, Output, QueryList, TemplateRef} from '@angular/core';
import {animate, state, style, transition, trigger} from '@angular/animations';
import {PrimeTemplate} from 'primeng/api';
import {get} from 'lodash';
import {TcPrimeNGHelperService} from '../../services/tc-primeng-helper.service';
import {CurrencyPipe, DatePipe} from '@angular/common';

@Component({
  selector: 'tcpmg-generic-table',
  templateUrl: './tcprimeng-generic-table.component.html',
  styleUrls: ['./tcprimeng-generic-table.component.scss'],
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
export class TcprimengGenericTableComponent implements OnInit {

  /**
   * Display the button on the right side
   */
  @Input() showFilterRow: boolean;

  /**
   * Column Definition array to display grid
   */
  @Input() columnDefs: any[];

  /**
   * Column Definition array to display grid
   */
  @Input() rowData: any[];

  /**
   * Template for the expansion row
   */
  @Input() rowExpansionTemplate: TemplateRef<any>;

  /**
   * Generates the automatically the layout.
   */
  public autoLayout = true;

  @Input('autoLayout') set AutoLayout(autoLayout: boolean) {
    if (autoLayout) {
      this.autoLayout = autoLayout;
    }
  }

  /**
   * Display the button on the right side
   */
  public showExpandButton = false;

  @Input('showExpandButton') set ShowExpandButton(showExpandButton: boolean) {
    if (showExpandButton) {
      this.showExpandButton = showExpandButton;
    }
  }

  /**
   * Display pagination bar at the botton
   */
  public paginator = false;

  @Input('paginator') set Paginator(paginator: boolean) {
    if (paginator) {
      this.paginator = paginator;
    }
  }

  /**
   * Display page report at the botton
   */
  public showCurrentPageReport = false;

  @Input('showCurrentPageReport') set ShowCurrentPageReport(showCurrentPageReport: boolean) {
    if (showCurrentPageReport) {
      this.showCurrentPageReport = showCurrentPageReport;
    }
  }

  /**
   * Display page report at the botton
   */
  public showSortIcon = false;

  @Input('showSortIcon') set ShowSortIcon(showSortIcon: boolean) {
    if (showSortIcon) {
      this.showSortIcon = showSortIcon;
    }
  }

  /**
   * Pagination report template
   */
  public currentPageReportTemplate = 'Showing {first} to {last} of {totalRecords} entries';

  @Input('currentPageReportTemplate') set CurrentPageReportTemplate(currentPageReportTemplate: string) {
    if (currentPageReportTemplate) {
      this.currentPageReportTemplate = currentPageReportTemplate;
    }
  }

  /**
   * A function that can be used to set styles
   */
  @Input() styleFunction: (rowData, col, context) => any;
  @Input() styleContext: any;

  /**
   * Default lines per page
   */
  public defaultRows = 5;

  @Input('defaultRows') set DefaultRows(defaultRows: number) {
    if (defaultRows) {
      this.defaultRows = defaultRows;
    }
  }

  /**
   * Pagination report template
   */
  public rowsPerPageOptions: number[] = [15, 25, 50];

  @Input('rowsPerPageOptions') set RowsPerPageOptions(rowsPerPageOptions: number[]) {
    if (rowsPerPageOptions) {
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


  // public rowData;
  // public columnConfig;

  constructor(
    protected currencyPipe: CurrencyPipe,
    protected datePipe: DatePipe) {
  }

  ngOnInit(): void {
  }

  public getStyle(rowData, col) {
    let re = {'text-align': col.align !== undefined ? col.align : 'left'};
    if (this.styleFunction) {
      re = {...this.styleFunction(rowData, col, this.styleContext)};
    }
    return re;
  }

  public getObjectValue(rowdata, column) {
    let value = get(rowdata, column.field);
    if (column.format !== undefined) {
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

}
