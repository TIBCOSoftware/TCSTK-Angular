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
   * Column Definition array to display grid
   */
  @Input() columnDefs: any[];

  /**
   * Template for the expansion row
   */
  @Input() rowExpansionTemplate: TemplateRef<any>;

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
