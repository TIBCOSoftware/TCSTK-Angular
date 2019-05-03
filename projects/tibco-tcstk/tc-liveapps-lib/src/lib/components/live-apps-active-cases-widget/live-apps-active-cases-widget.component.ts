import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseTypeReportRecord, CaseTypesReport, CaseTypeStateReportStateInfo} from '../../models/tc-live-apps-reporting';
import {BaseChartDirective, Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';
import {TcLiveAppsReportingService} from '../../services/tc-live-apps-reporting.service';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsActiveCasesReportComponent} from '../live-apps-active-cases-report/live-apps-active-cases-report.component';
import {LiveAppsActiveCasesForTypeReportComponent} from '../live-apps-active-cases-for-type-report/live-apps-active-cases-for-type-report.component';

@Component({
  selector: 'tcla-live-apps-active-cases-widget',
  templateUrl: './live-apps-active-cases-widget.component.html',
  styleUrls: ['./live-apps-active-cases-widget.component.css']
})
export class LiveAppsActiveCasesWidgetComponent extends LiveAppsComponent {

  @Input() sandboxId: number;
  @Input() appIds: string[];
  @Input() showHeader: boolean;
  @Input() uiAppId: string;
  @Input() showPercentages = this.showPercentages ? this.showPercentages : false;
  @Input() maxLegendItems: number = this.maxLegendItems ? this.maxLegendItems : 8;
  @Output() selectedCaseType: EventEmitter<CaseTypeReportRecord> = new EventEmitter<CaseTypeReportRecord>();
  @Output() selectedCaseTypeState: EventEmitter<CaseTypeStateReportStateInfo> = new EventEmitter<CaseTypeStateReportStateInfo>();

  @ViewChild(LiveAppsActiveCasesReportComponent) activeCasesComp: LiveAppsActiveCasesReportComponent;
  @ViewChild(LiveAppsActiveCasesForTypeReportComponent) activeCaseTypeComp: LiveAppsActiveCasesForTypeReportComponent;

  public selectedCaseTypeReport: CaseTypeReportRecord;

  public handleCaseTypeSelected = (selected: CaseTypeReportRecord) => {
    this.selectedCaseTypeReport = selected;
    this.selectedCaseType.emit(selected);
  }

  public handleCaseTypeStateSelected = (selectedState: CaseTypeStateReportStateInfo) => {
    this.selectedCaseTypeState.emit(selectedState);
  }

  public clearSelectedCaseType = () => {
    this.selectedCaseTypeReport = undefined;
  }

  public refresh = () => {
    if (this.activeCasesComp) {
      this.activeCasesComp.refresh();
    }
    if (this.activeCaseTypeComp) {
      this.activeCaseTypeComp.refresh();
    }
  }

}
