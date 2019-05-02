import {Component, EventEmitter, Input, OnChanges, OnInit, Output, SimpleChanges, ViewChild} from '@angular/core';
import {ChartType} from 'chart.js';
import {Label, MultiDataSet} from 'ng2-charts';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcLiveAppsReportingService} from '../../services/tc-live-apps-reporting.service';
import {CaseTypeStateReport, CaseTypeStateReportStateInfo} from '../../models/tc-live-apps-reporting';
import {map, take, takeUntil} from 'rxjs/operators';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'tcla-live-apps-active-cases-for-type-report',
  templateUrl: './live-apps-active-cases-for-type-report.component.html',
  styleUrls: ['./live-apps-active-cases-for-type-report.component.css']
})
export class LiveAppsActiveCasesForTypeReportComponent extends LiveAppsComponent implements OnInit, OnChanges {

  @Input() sandboxId: number;
  @Input() appId: string;
  @Input() typeId: string;
  @Input() maxLegendItems: number = this.maxLegendItems ? this.maxLegendItems : 8;
  @Output() selectedCaseTypeState: EventEmitter<CaseTypeStateReportStateInfo> = new EventEmitter<CaseTypeStateReportStateInfo>();

  // @ViewChild(BaseChartDirective) caseTypeStateReportChart: BaseChartDirective;

  public errorMessage: string;
  public caseTypeStateReport: CaseTypeStateReport;
  public renderChart = false;

  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  public legendData: any;
  public totalActiveCaseCount: number;

  private getCaseCount = () => {
    return this.totalActiveCaseCount;
  }

  public doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
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
              size: '20',
              family: 'Source Sans Pro',
              weight: 'bold'
            },
            color: '#FF7800'
          },
          {
            text: 'cases',
            font: {
              size: '16',
              family: 'Source Sans Pro',
            },
            color: '#FF7800'
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

  private initReportDataToChart = (reportData: CaseTypeStateReport, status: string) => {
    this.doughnutChartData = [];
    this.totalActiveCaseCount = 0;
    const casesByStateArray: number[] = [];
    const labels: string[] = [];
    reportData.caseStates.forEach(caseState => {
        this.totalActiveCaseCount = this.totalActiveCaseCount + caseState.caseCount;
        casesByStateArray.push(caseState.caseCount);
        labels.push(caseState.stateInfo.label);
    });
    this.doughnutChartData.push(casesByStateArray);
    this.doughnutChartLabels = labels;
    // showing more than 8 in the legend will take up too much space
    this.doughnutChartOptions.legend.display = labels.length <= 8;
    this.renderChart = true;
  }

  public refresh = () => {
    this.reportingService.getCaseTypeStateReport(this.sandboxId, this.appId, this.typeId, false).pipe(
      take(1),
      takeUntil(this._destroyed$),
      map(report => {
        this.caseTypeStateReport = report;
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
        this.selectedCaseTypeState.emit(this.caseTypeStateReport.caseStates[clickedElementIndex].stateInfo);
      }
    }
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }


  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appId && (changes.firstChange || (changes.appId.currentValue !== changes.appId.previousValue))) {
      this.refresh();
    }
  }

}
