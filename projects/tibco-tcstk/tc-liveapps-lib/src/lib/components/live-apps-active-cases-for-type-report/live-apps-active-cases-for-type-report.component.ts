import {
  AfterViewChecked,
  Component,
  ElementRef,
  EventEmitter,
  Input,
  OnChanges,
  OnInit,
  Output,
  SimpleChanges,
  ViewChild
} from '@angular/core';
import {Chart, ChartConfiguration, ChartOptions, ChartType} from 'chart.js';
import {BaseChartDirective} from 'ng2-charts';
import {LiveAppsComponent} from '../live-apps-component/live-apps-component.component';
import {TcLiveAppsReportingService} from '../../services/tc-live-apps-reporting.service';
import {CaseTypeStateReport, CaseTypeStateReportStateInfo} from '../../models/tc-live-apps-reporting';
import {take, takeUntil} from 'rxjs/operators';
import {DEFAULT_COLORS, DEFAULT_TYPE_COLOR} from '../../services/tc-case-card-config.service';


/**
 * Home page active cases widget sub component
 *
 *@example <tcla-live-apps-active-cases-for-type-report></tcla-live-apps-active-cases-for-type-report>
 */
@Component({
  selector: 'tcla-live-apps-active-cases-for-type-report',
  templateUrl: './live-apps-active-cases-for-type-report.component.html',
  styleUrls: ['./live-apps-active-cases-for-type-report.component.css']
})
export class LiveAppsActiveCasesForTypeReportComponent extends LiveAppsComponent implements OnInit, OnChanges, AfterViewChecked {



  /**
   * sandboxId - this comes from claims resolver
   */
  @Input() sandboxId: number;

  /**
   * The LA Application Id
   */
  @Input() appId: string;

  /**
   * The LA Application Type Id (generally 1)
   */
  @Input() typeId: string;

  /**
   * The Application ID of the UI (should ideally be unique as it is shared state key)
   */
  @Input() uiAppId: string;

  /**
   * Maximum rows to show in legend before it is hidden (otherwise would take whole widget)
   */
  public maxLegendItems: number = 8;
  @Input('maxLegendItems') set MaxLegendItems(maxLegendItems: number) {
    if (maxLegendItems){
      this.maxLegendItems = maxLegendItems;
    }
  }

  /**
   * Whether to show percentages or raw case numbers on the doughnut chart
   */
  public showPercentages: boolean = false;
  @Input('showPercentages') set ShowPercentages(showPercentages: boolean) {
    if (showPercentages){
      this.showPercentages = showPercentages;
    }
  }

  /**
   * ~event selectedCaseTypeState : Case Type state selected in vizualization
   * ~payload CaseTypeStateReportStateInfo : CaseTypeStateReportStateInfo object selected from component (to drive caller to display something different (drill down))
   */
  @Output() selectedCaseTypeState: EventEmitter<CaseTypeStateReportStateInfo> = new EventEmitter<CaseTypeStateReportStateInfo>();

  @ViewChild(BaseChartDirective, {static: false}) caseTypeStateReportChart: BaseChartDirective;
  @ViewChild('componentDiv', {static: false}) componentDiv: ElementRef;

  public errorMessage: string;
  public caseTypeStateReport: CaseTypeStateReport;
  public renderChart = false;

  public doughnutChartData: ChartConfiguration<'doughnut'>['data'];
  public doughnutChartType: ChartType = 'doughnut';
  public chartColors: any[] = [];
  public defaultColors: string[] = DEFAULT_COLORS.slice().reverse();
  public widgetWidth: number;
  public widgetHeight: number;

  public legendData: any;
  public totalActiveCaseCount: number;

  private getCaseCount = () => {
    return this.totalActiveCaseCount;
  }

  public doughnutChartOptions: ChartOptions<'doughnut'> = {
    responsive: true,
    maintainAspectRatio: false,
    layout: {
      padding: {
        left: 0,
        right: 0,
        top: 10,
        bottom: 10
      }
    },
    onClick: (event, active) => { event.native.stopPropagation(); this.chartClicked(active) },
    plugins: {
      legend: {
        position: 'left'
      },
      datalabels: {
        anchor: 'end',
        backgroundColor: function(context): string {
          return context?.dataset?.backgroundColor[context.dataIndex];
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
              //@ts-ignore
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

  constructor(protected reportingService: TcLiveAppsReportingService) {
    super();
  }

  private initReportDataToChart = (reportData: CaseTypeStateReport, status: string) => {
    this.doughnutChartData = {
      labels: [],
      datasets: []
    };
    this.totalActiveCaseCount = 0;
    const casesByStateArray: number[] = [];
    const labels: string[] = [];
    const colorArray: string[] = [];
    // remove any taken colors from the defaultColors
    // we have to do this before parsing the record to avoid getting same colors
    reportData.caseStates.forEach(cs => {
      // remove color from defaults
      if (cs.stateInfo.color) {
        this.defaultColors = this.defaultColors.filter(item => item !== cs.stateInfo.color);
      }
    });
    // parse record
    reportData.caseStates.forEach(caseState => {
        this.totalActiveCaseCount = this.totalActiveCaseCount + caseState.caseCount;
        casesByStateArray.push(caseState.caseCount);
        labels.push(caseState.stateInfo.label);
      // we will re-color anything that has the default color
      let col: string;
      if (caseState.stateInfo.color && caseState.stateInfo.color !== DEFAULT_TYPE_COLOR) {
        // use the set color
        col = caseState.stateInfo.color;
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
    this.doughnutChartData.datasets.push({ data: casesByStateArray, backgroundColor: colorArray });
    this.doughnutChartData.labels = labels;
    this.chartColors.push( { backgroundColor: colorArray});
    // showing more than 8 in the legend will take up too much space
    this.doughnutChartOptions.plugins.legend.display = labels.length <= 8;
    this.renderChart = true;
  }

  public refresh = () => {
    this.reportingService.getCaseTypeStateReport(this.sandboxId, this.appId, this.typeId, false, this.uiAppId).pipe(
      take(1),
      takeUntil(this._destroyed$)
    )
      .subscribe(
        report => {
          this.caseTypeStateReport = report;
          this.initReportDataToChart(report, status);
          return report;
        }, error => { this.errorMessage = 'Error retrieving case types report: ' + error.error.errorMsg; }
      );
  }

  // events
  // public chartClicked({ event, active }: { event: { chart: Chart, native: MouseEvent }, active: any }): void {
  public chartClicked(active) {
    if (active.length > 0) {
        this.selectedCaseTypeState.emit(this.caseTypeStateReport.caseStates[active[0].element.$context.dataIndex].stateInfo);
    }
  }

  public chartHovered({ event, active }: { event: MouseEvent, active: {}[] }): void {
    // console.log(event, active);
  }

  ngAfterViewChecked() {
    if (this.componentDiv && this.caseTypeStateReport && this.componentDiv.nativeElement.offsetWidth) {
      if (this.widgetWidth !== this.componentDiv.nativeElement.offsetWidth || this.widgetHeight !== this.componentDiv.nativeElement.offsetHeight) {
        this.widgetWidth = this.componentDiv.nativeElement.offsetWidth;
        this.widgetHeight = this.componentDiv.nativeElement.offsetHeight;
        this.caseTypeStateReportChart.chart.resize();
      }
    }
  }

  ngOnInit() {
  }

  ngOnChanges(changes: SimpleChanges) {
    if (changes.appId && (changes.firstChange || (changes.appId.currentValue !== changes.appId.previousValue))) {
      this.refresh();
    }
  }

}
