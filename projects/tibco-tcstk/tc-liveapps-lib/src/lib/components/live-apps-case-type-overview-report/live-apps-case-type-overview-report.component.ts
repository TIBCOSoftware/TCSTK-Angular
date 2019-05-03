import {Component, Input, OnChanges, OnInit, SimpleChanges, ViewChild} from '@angular/core';
import {ChartLegendLabelOptions, ChartOptions, ChartPoint, ChartType} from 'chart.js';
import {BaseChartDirective, Label, MultiDataSet} from 'ng2-charts';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcLiveAppsReportingService} from '../../services/tc-live-apps-reporting.service';
import {CaseTypeStateReport} from '../../models/tc-live-apps-reporting';
import {map, take, takeUntil} from 'rxjs/operators';
import {MatTabGroup} from '@angular/material';
import 'chartjs-plugin-datalabels';

@Component({
  selector: 'tcla-live-apps-case-type-overview-report',
  templateUrl: './live-apps-case-type-overview-report.component.html',
  styleUrls: ['./live-apps-case-type-overview-report.component.css']
})
export class LiveAppsCaseTypeOverviewReportComponent extends LiveAppsComponent implements OnInit, OnChanges {
  @Input() sandboxId: number;
  @Input() appId: string;
  @Input() uiAppId: string;
  @Input() incTerminal: boolean = this.incTerminal ? this.incTerminal : true;
  @Input() typeId: string;

  // @ViewChild(BaseChartDirective) caseTypeStateReportChart: BaseChartDirective;

  public errorMessage: string;
  public caseTypeStateReport: CaseTypeStateReport;
  public renderChart = false;

  public doughnutChartLabels: Label[];
  public doughnutChartData: MultiDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';

  public legendData: any;

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
    const casesByStateArray: number[] = [];
    const labels: string[] = [];
    reportData.caseStates.forEach(caseState => {
      if (!this.incTerminal || (this.incTerminal && caseState.stateInfo.isTerminal)) {
        casesByStateArray.push(caseState.caseCount);
        labels.push(caseState.stateInfo.label);
      }
    });
    this.doughnutChartData.push(casesByStateArray);
    this.doughnutChartLabels = labels;
    this.renderChart = true;
  }

  public refresh = () => {
    this.reportingService.getCaseTypeStateReport(this.sandboxId, this.appId, this.typeId, this.incTerminal, this.uiAppId).pipe(
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
  public chartClicked({ event, active }: { event: MouseEvent, active: {}[] }): void {
    console.log(event, active);
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
