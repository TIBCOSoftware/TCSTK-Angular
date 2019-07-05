import {Component, EventEmitter, Input, OnInit, Output, ViewChild} from '@angular/core';
import {CaseTypeReportRecord, CaseTypesReport} from '../../models/tc-live-apps-reporting';
import {BaseChartDirective, defaultColors, Label, MultiDataSet, SingleDataSet} from 'ng2-charts';
import {ChartType} from 'chart.js';
import {TcLiveAppsReportingService} from '../../services/tc-live-apps-reporting.service';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {map, take, takeUntil} from 'rxjs/operators';

import {copy} from 'angular6-json-schema-form';
import {DEFAULT_COLORS, DEFAULT_TYPE_COLOR} from '../../services/tc-case-card-config.service';

/**
 * Home page active cases widget sub component
 *
 *@example <tcla-live-apps-active-cases-report></tcla-live-apps-active-cases-report>
 */
@Component({
  selector: 'tcla-live-apps-active-cases-report',
  templateUrl: './live-apps-active-cases-report.component.html',
  styleUrls: ['./live-apps-active-cases-report.component.css']
})
export class LiveAppsActiveCasesReportComponent extends LiveAppsComponent implements  OnInit {

  constructor(private reportingService: TcLiveAppsReportingService) {
    super();
  }

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

  @ViewChild(BaseChartDirective, {static: false}) caseReportChart: BaseChartDirective;

  public errorMessage: string;
  public caseTypesReport: CaseTypesReport;
  public totalActiveCaseCount: number;
  public totalTerminatedCaseCount: number;
  public renderChart = false;

  public doughnutChartLabels: Label[];
  public doughnutChartData: SingleDataSet = [];
  public doughnutChartType: ChartType = 'doughnut';
  public chartColors: any[] = [];
  public defaultColors: string[] = DEFAULT_COLORS.slice().reverse();

  public legendData: any;

  private getCaseCount = () => {
    return this.totalActiveCaseCount;
  }

  public doughnutChartOptions: any = {
    responsive: true,
    maintainAspectRatio: false,
    legend: {
      display: false,
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
            color: '#b6b6b6'
          },
          {
            text: 'cases',
            font: {
              size: '16',
              family: 'Source Sans Pro',
            },
            color: '#b6b6b6'
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
            if (this.showPercentages) {
              const sum = datasets[0].data.reduce((a, b) => a + b, 0);
              const percentage = Math.round((value / sum) * 100) + '%';
              return percentage;
            } else {
              return value;
            }
          } else {
            return 0;
          }
        }
      }
    }
  };

  private initReportDataToChart = (reportData: CaseTypesReport) => {
    this.doughnutChartData = [];
    this.totalActiveCaseCount = 0;
    const activeCasesArray: any[] = [];
    const labels: string[] = [];
    const colorArray: string[] = [];
    // remove any taken colors from the defaultColors
    // we have to do this before parsing the record to avoid getting same colors
    reportData.caseTypes.forEach(ct => {
      // remove color from defaults
      if (ct.caseTypeInfo.color) {
        this.defaultColors = this.defaultColors.filter(item => item !== ct.caseTypeInfo.color);
      }
    });
    // parse record
    reportData.caseTypes.forEach(caseType => {
      activeCasesArray.push(caseType.activeStateCaseCount);
      this.totalActiveCaseCount = this.totalActiveCaseCount + caseType.activeStateCaseCount;
      this.totalTerminatedCaseCount = this.totalTerminatedCaseCount + caseType.terminalStateCaseCount;
      labels.push(caseType.caseTypeInfo.label);
      // we will re-color anything that has the default color
      let col: string;
      if (caseType.caseTypeInfo.color && caseType.caseTypeInfo.color !== DEFAULT_TYPE_COLOR) {
        // use the set color
        col = caseType.caseTypeInfo.color;
      } else {
        // try and get a color from the palette
        const palCol = this.defaultColors.pop();
        if (palCol) {
          col = palCol;
        } else {
          // if no more in palette use a random color!
          const i = Math.random() * 0xffffff;
          const p = parseInt(i.toString(), 0);
          col = '#' + p.toString(16);
        }
      }
      colorArray.push(col);
    });
    // showing more than 8 in the legend will take up too much space
    this.doughnutChartOptions.legend.display = labels.length <= 8;
    this.doughnutChartData = activeCasesArray;
    this.doughnutChartLabels = labels;
    this.chartColors.push( { backgroundColor: colorArray});
    this.renderChart = true;
  }

  public refresh = () => {
    this.reportingService.getCaseTypesReport(this.sandboxId, this.appIds, this.uiAppId).pipe(
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
