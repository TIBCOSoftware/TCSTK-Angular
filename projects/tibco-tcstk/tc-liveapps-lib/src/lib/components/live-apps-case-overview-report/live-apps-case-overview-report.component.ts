import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {ChartLegendLabelOptions, ChartOptions, ChartPoint, ChartType} from 'chart.js';
import {BaseChartDirective, Label, MultiDataSet} from 'ng2-charts';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcLiveAppsReportingService} from '../../services/tc-live-apps-reporting.service';
import {CaseTypeReportRecord, CaseTypesReport} from '../../models/tc-live-apps-reporting';
import {map, take, takeUntil} from 'rxjs/operators';
import {MatTabGroup} from '@angular/material';
import 'chartjs-plugin-datalabels';
import 'chartjs-plugin-doughnutlabel';

@Component({
  selector: 'tcla-live-apps-case-overview-report',
  templateUrl: './live-apps-case-overview-report.component.html',
  styleUrls: ['./live-apps-case-overview-report.component.css']
})
export class LiveAppsCaseOverviewReportComponent extends LiveAppsComponent implements OnInit {
  @Input() sandboxId: number;
  @Input() appIds: string[];
  @Input() uiAppId: string;
  @Output() selectedCaseType: EventEmitter<CaseTypeReportRecord> = new EventEmitter<CaseTypeReportRecord>();

  @ViewChild(BaseChartDirective) caseReportChart: BaseChartDirective;

  public errorMessage: string;
  public caseTypesReport: CaseTypesReport;
  public totalActiveCaseCount: number;
  public totalTerminatedCaseCount: number;
  public renderChart = false;
  public status = 'Active';

  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  public legendData: any;

  private getCaseCount = () => {
    return (this.status === 'Active') ? this.totalActiveCaseCount : this.totalTerminatedCaseCount;
  }

  public doughnutChartOptions: any = {
    legendCallback: function(chart) {
      console.log(chart.data);
      const text = [];
      text.push('<ul>');
      for (let i = 0; i < chart.data.datasets[0].data.length; i++) {
        text.push('<li>');
        text.push('<span style="background-color:' + chart.data.datasets[0].backgroundColor[i] + '">' + chart.data.datasets[0].data[i] + '</span>');
        if (chart.data.labels[i]) {
          text.push(chart.data.labels[i] + ' hello');
        }
        text.push('</li>');
      }
      text.push('</ul>');
      // return text.join('');
      return '<span>HELLO</span>';
    },
    responsive: true,
    legend: {
      position: 'top'
    },
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 10
      }
    },
    plugins: {
      doughnutlabel: {
        labels: [
          {
            text: this.getCaseCount,
            font: {
              size: '20'
            },
            color: 'grey'
          }
        ]
      },
      datalabels: {
        anchor: 'end',
        backgroundColor: function(context) {
          return context.dataset.backgroundColor;
        },
        borderColor: 'white',
        borderRadius: 25,
        borderWidth: 2,
        color: 'white',
        display: function(context) {
          const dataset = context.dataset;
          const value = dataset.data[context.dataIndex];
          return value > 0;
        },
        font: {
          weight: 'bold'
        },
        formatter: (value, ctx) => {

          const datasets = ctx.chart.data.datasets;

          if (datasets.indexOf(ctx.dataset) === datasets.length - 1) {
            const sum = datasets[0].data.reduce((a, b) => a + b, 0);
            const percentage = Math.round((value / sum) * 100) + '%';
            return percentage;
          } else {
            return 0;
          }
        }
      }

    }
  };

  constructor(private reportingService: TcLiveAppsReportingService) {
    super();
  }

  private initReportDataToChart = (reportData: CaseTypesReport, status: string) => {
    this.doughnutChartData = [];
    this.totalActiveCaseCount = 0;
    this.totalTerminatedCaseCount = 0;
    const activeCasesArray: number[] = [];
    const terminatedCasesArray: number[] = [];
    const labels: string[] = [];
    reportData.caseTypes.forEach(caseType => {
      activeCasesArray.push(caseType.activeStateCaseCount);
      this.totalActiveCaseCount = this.totalActiveCaseCount + caseType.activeStateCaseCount;
      terminatedCasesArray.push(caseType.terminalStateCaseCount);
      this.totalTerminatedCaseCount = this.totalTerminatedCaseCount + caseType.terminalStateCaseCount;
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
    this.reportingService.getCaseTypesReport(this.sandboxId, this.appIds, this.uiAppId).pipe(
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
  public chartClicked({ event, active }: { event: MouseEvent, active: any }): void {
    if (active.length > 0) {
      const chart = active[0]._chart;
      const activePoints: any = chart.getElementAtEvent(event);
      if ( activePoints.length > 0) {
        // get the internal index of slice in pie chart
        const clickedElementIndex = activePoints[0]._index;
        const label = chart.data.labels[clickedElementIndex];
        // get value by index
        const value = chart.data.datasets[0].data[clickedElementIndex];
        console.log(clickedElementIndex, label, value);
        this.caseTypesReport.caseTypes[clickedElementIndex].incTerminal = (this.status === 'Terminated') ? true : false;
        this.selectedCaseType.emit(this.caseTypesReport.caseTypes[clickedElementIndex]);
      }
    }
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
