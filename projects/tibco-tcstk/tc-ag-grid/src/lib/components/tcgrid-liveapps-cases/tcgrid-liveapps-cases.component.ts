import {Component, EventEmitter, Input, OnChanges, Output, SimpleChanges, ViewChild} from '@angular/core';
import {TcGridHelperService} from '../../services/tc-grid-helper.service';
import {tap} from 'rxjs/operators';

@Component({
  selector: 'tcgrid-tcgrid-liveapps-cases',
  templateUrl: './tcgrid-liveapps-cases.component.html',
  styleUrls: ['./tcgrid-liveapps-cases.component.css']
})
export class TcgridLiveappsCasesComponent implements OnChanges {

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

  constructor(protected gridHelperService: TcGridHelperService) {
  }

  onFirstDataRendered(params) {
    this.gridApi.sizeColumnsToFit();
  }

  onGridReady(params) {
    this.gridApi = params.api;
    this.gridApi.sizeColumnsToFit();
    window.addEventListener('resize', function() {
      setTimeout(function() {
        params.api.sizeColumnsToFit();
      });
    });
  }

  public handleSelection(data: any) {
    const selectedCaseRefs: string[] = [];
    data.api.getSelectedRows().forEach((row: any) => {
      selectedCaseRefs.push(row.caseReference);
    })
    this.selection.emit(selectedCaseRefs);
  }

  public handleClick(clicked) {
    this.click.emit(clicked.data.caseReference);
  }

  public handleDoubleClick(clicked) {
    this.doubleClick.emit(clicked.data.caseReference);
  }

  public exportToCsv(options) {
    this.gridApi.exportDataAsCsv(options);
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
              this.columnConfig = TcGridHelperService.defaultColumnConfig(results);
            }
          })
        );
      }
    }
  }

}
