import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseTypeReportRecord, CaseTypesReport} from '../../models/tc-live-apps-reporting';
import {BaseChartDirective, Label, MultiDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';
import {TcLiveAppsReportingService} from '../../services/tc-live-apps-reporting.service';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {map, take, takeUntil} from 'rxjs/operators';

@Component({
  selector: 'tcla-live-apps-active-cases-widget',
  templateUrl: './live-apps-active-cases-widget.component.html',
  styleUrls: ['./live-apps-active-cases-widget.component.css']
})
export class LiveAppsActiveCasesWidgetComponent extends LiveAppsComponent implements OnInit {

  @Input() sandboxId: number;
  @Input() appIds: string[];
  @Input() showHeader: boolean;
  @Output() selectedCaseType: EventEmitter<CaseTypeReportRecord> = new EventEmitter<CaseTypeReportRecord>();

  @ViewChild(BaseChartDirective) caseReportChart: BaseChartDirective;

  public errorMessage: string;
  public caseTypesReport: CaseTypesReport;
  public totalActiveCaseCount: number;
  public totalTerminatedCaseCount: number;
  public renderChart = false;

  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  public legendData: any;

  private getCaseCount = () => {
    return this.totalActiveCaseCount;
  }

  public doughnutChartOptions: any = {
    responsive: true,
    legend: {
      position: 'left'
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

  private initReportDataToChart = (reportData: CaseTypesReport) => {
    this.doughnutChartData = [];
    this.totalActiveCaseCount = 0;
    const activeCasesArray: number[] = [];
    const labels: string[] = [];
    reportData.caseTypes.forEach(caseType => {
      activeCasesArray.push(caseType.activeStateCaseCount);
      this.totalActiveCaseCount = this.totalActiveCaseCount + caseType.activeStateCaseCount;
      this.totalTerminatedCaseCount = this.totalTerminatedCaseCount + caseType.terminalStateCaseCount;
      labels.push(caseType.caseTypeInfo.label);
    });
    this.doughnutChartData.push(activeCasesArray);
    this.doughnutChartLabels = labels;
    this.renderChart = true;
  }

  public refresh = () => {
    this.reportingService.getCaseTypesReport(this.sandboxId, this.appIds).pipe(
      take(1),
      takeUntil(this._destroyed$),
      map(report => {
        this.caseTypesReport = report;
        this.initReportDataToChart(report);
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
        this.caseTypesReport.caseTypes[clickedElementIndex].incTerminal = false;
        this.selectedCaseType.emit(this.caseTypesReport.caseTypes[clickedElementIndex]);
      }
    }
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  ngOnInit() {
    this.refresh();
  }

}
