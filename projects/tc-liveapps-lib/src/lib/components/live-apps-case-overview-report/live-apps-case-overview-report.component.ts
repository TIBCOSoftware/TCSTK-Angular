import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {ChartOptions, ChartPoint, ChartType} from 'chart.js';
import {BaseChartDirective, Label, MultiDataSet} from 'ng2-charts';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcLiveAppsReportingService} from '../../services/tc-live-apps-reporting.service';
import {CaseTypesReport} from '../../models/tc-live-apps-reporting';
import {map, take, takeUntil} from 'rxjs/operators';
import {MatTabGroup} from '@angular/material';

@Component({
  selector: 'tcla-live-apps-case-overview-report',
  templateUrl: './live-apps-case-overview-report.component.html',
  styleUrls: ['./live-apps-case-overview-report.component.css']
})
export class LiveAppsCaseOverviewReportComponent extends LiveAppsComponent implements OnInit {
  @Input() sandboxId: number;
  @Input() appIds: string[];

  @ViewChild(BaseChartDirective) caseReportChart: BaseChartDirective;

  public errorMessage: string;
  public caseTypesReport: CaseTypesReport;
  public renderChart = false;
  public status = 'Active';

  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  public doughnutChartOptions: ChartOptions = {
    responsive: true,
  };

  constructor(private reportingService: TcLiveAppsReportingService) {
    super();
  }

  private initReportDataToChart = (reportData: CaseTypesReport, status: string) => {
    this.doughnutChartData = [];
    const activeCasesArray: number[] = [];
    const terminatedCasesArray: number[] = [];
    const labels: string[] = [];
    reportData.caseTypes.forEach(caseType => {
      activeCasesArray.push(caseType.activeStateCaseCount);
      terminatedCasesArray.push(caseType.terminalStateCaseCount);
      labels.push(caseType.caseTypeInfo.label);
    });
    if (status === 'Terminated') {
      this.doughnutChartData.push(terminatedCasesArray);
    } else {
      this.doughnutChartData.push(activeCasesArray);
    }
    this.doughnutChartLabels = labels;
    this.renderChart = true;
  }

  public refresh = (status) => {
    this.reportingService.getCaseTypesReport(this.sandboxId, this.appIds).pipe(
      take(1),
      takeUntil(this._destroyed$),
      map(report => {
        this.caseTypesReport = report;
        this.initReportDataToChart(report, status);
        return report;
      }))
      .subscribe(
      null, error => { this.errorMessage = 'Error retrieving case types report: ' + error.error.errorMsg; }
      );
  }

  // events
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  public selectStatus = (status) => {
    this.status = status;
    this.refresh(status);
  }

  ngOnInit() {
    this.refresh(this.status);
  }

}
