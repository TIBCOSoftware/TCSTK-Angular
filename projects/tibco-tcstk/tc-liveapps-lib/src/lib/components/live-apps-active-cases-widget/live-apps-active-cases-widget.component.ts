import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseTypeReportRecord, CaseTypesReport, CaseTypeStateReportStateInfo} from '../../models/tc-live-apps-reporting';
import {BaseChartDirective, Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';
import {TcLiveAppsReportingService} from '../../services/tc-live-apps-reporting.service';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {map, take, takeUntil} from 'rxjs/operators';
import {LiveAppsActiveCasesReportComponent} from '../live-apps-active-cases-report/live-apps-active-cases-report.component';
import {LiveAppsActiveCasesForTypeReportComponent} from '../live-apps-active-cases-for-type-report/live-apps-active-cases-for-type-report.component';


/**
 * Home page active cases widget main component
 *
 *@example <tcla-live-apps-active-cases-widget></tcla-live-apps-active-cases-widget>
 */

@Component({
  selector: 'tcla-live-apps-active-cases-widget',
  templateUrl: './live-apps-active-cases-widget.component.html',
  styleUrls: ['./live-apps-active-cases-widget.component.css']
})
export class LiveAppsActiveCasesWidgetComponent extends LiveAppsComponent {

  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The list of LA Application IDs you want to handle
   */
  @Input() appIds: string[];

  /**
   * Whether to show the header bar in the widget - eg. favorites on home page (contains icon etc) - if off icons still appear without bar
   */
  @Input() showHeader: boolean;

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * Maximum rows to show in legend before it is hidden (otherwise would take whole widget)
   */
  @Input() maxLegendItems: number = this.maxLegendItems ? this.maxLegendItems : 8;

  /**
   * Whether to show percentages or raw case numbers on the doughnut chart
   */
  @Input() showPercentages = this.showPercentages ? this.showPercentages : false;

  /**
   * ~event selectedCaseType : Case Type selected in vizualization
   * ~payload CaseTypeReportRecord : CaseTypeReportRecord object selected from component
   */
  @Output() selectedCaseType: EventEmitter<CaseTypeReportRecord> = new EventEmitter<CaseTypeReportRecord>();

  /**
   * ~event selectedCaseTypeState : Case Type state selected in vizualization
   * ~payload CaseTypeStateReportStateInfo : CaseTypeStateReportStateInfo object selected from component (to drive caller to display something different (drill down))
   */
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
