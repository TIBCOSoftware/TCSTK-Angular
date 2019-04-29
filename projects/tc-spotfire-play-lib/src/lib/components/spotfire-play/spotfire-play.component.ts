import {Component, Input, OnInit, ViewChild} from '@angular/core';
import {MatDialog, MatSort} from '@angular/material';
// import {SpotfireCustomization} from 'spotfire-webplayer/lib/spotfire-customization';
import {
  CaseType,
  LiveAppsCaseCreatorComponent,
  LiveAppsCreatorDialogComponent,
  LiveAppsSandboxComponent,
  LiveAppsService,
  CaseCreatorSelectionContext
} from 'tc-liveapps-lib';
import {map, take, takeUntil} from 'rxjs/operators';
import {RouteAction, SandboxList, TcButtonsHelperService} from 'tc-core-lib';
//import {CaseCreatorSelectionContext} from '../../../../../tc-liveapps-lib/src/lib/models/tc-case-creator';

@Component({
  selector: 'tcsp-spotfire-play',
  templateUrl: './spotfire-play.component.html',
  styleUrls: ['./spotfire-play.component.css']
})

// A component to play with Spotfire Integration
export class SpotfirePlayComponent implements OnInit {

  constructor(protected liveapps: LiveAppsService, public dialog: MatDialog) {

  }

  @ViewChild(MatSort) sort: MatSort;
  @Input() sandboxId: number;
  @Input() appIds: string[];

  markingdata: any;
  markingTitles = new Array();
  markingDataTables = new Array();
  markingHeaders = new Array(new Array());
  markingData = new Array(new Array(new Array()));
  dataSourceJson = new Array();
  columDefArray = new Array();
  // myMarkingOn = "{['cases','events'],['*'] }";
  // '{"SalesAndMarketing": ["*"]}';
  // myMarkingOnSales = { SalesAndMarketing: ['*'] };
  myMarkingOnSales = '*';

  //myMarkingOn = {  cases: ['*'] };
   myMarkingOn = '*';


  // myMarkingOn = {  variants:['Marking'] };

  /*
  1. spotfire tab: variants
  2. Cases selected in viz (and in comlumn)
  3. Create case
  - Type: Compliance
  - Contect typ variant
  - Context ID (List) of selected cases  123,345,23432,3243
  - Short Description: <created at dt>



   */

  // myMarkingOn = '*';
  sandboxes: SandboxList;
  errorMessage: string;
  markingdataText: string;
  mySelection = {};


  ngOnInit() {

    console.log('Init');

  }

  startCase() {


  }

  changeSelection($event) {
    console.log('Selection Changed: ', $event);
    this.mySelection = JSON.parse($event);
    console.log(this.mySelection[0]);
    if (this.mySelection[0] != null) {
      console.log(this.mySelection[0]['variant']);
      if (this.mySelection[0]['variant'] != null) {
        this.selectedVariant = this.mySelection[0]['variant'];
      }
      if (this.mySelection[0]['variant_id'] != null) {
        this.selectedVariantID = this.mySelection[0]['variant_id'];
      }
    }


  }

  openCreatorDialog = (application: CaseType, initialData, sandboxId) => {
    const dialogRef = this.dialog.open(LiveAppsCreatorDialogComponent, {
      width: '60%',
      height: '80%',
      maxWidth: '100vw',
      maxHeight: '100vh',
      panelClass: 'tcs-style-dialog',
      data: new CaseCreatorSelectionContext(application, initialData, sandboxId)
    });

    dialogRef.afterClosed().subscribe(result => {
      if (result) {
        console.log(result);
      }
    });
  };

  public handleCreatorAppSelection = (application: CaseType) => {
    const EXAMPLE_INITIAL_DATA = {
      DiscoverCompliance: {
        Type: 'Compliance',
        ShortDescription: this.selectedVariant,
        Context: {
          ContextType: 'Case',
          ContextID: this.selectedVariantID
        }
      }

    };
    // this.openCreatorDialog(application, EXAMPLE_INITIAL_DATA, this.sandboxId);
    console.log('Sandbox ID: ', this.sandboxId);
    this.openCreatorDialog(application, EXAMPLE_INITIAL_DATA, this.sandboxId);


  };
  /*
  ngOnInit() {
    var spotfireConfig = this.route.snapshot.data.spotfireConfigHolder;
    this.datasource = this.route.snapshot.params['datasource'];

    this.spotfireServer = spotfireConfig.spotfireServer;
    this.analysisPath = spotfireConfig.analysisPath;

    this.allowedPages = spotfireConfig.allowedPages;
    this.activePage = "Filters"; //spotfireConfig.activePageForHome;

    this.parameters = 'AnalysisId = "' + this.datasource + '";';

    const value = true;
    this.configuration = {
      "showAbout": value,
      "showAnalysisInformationTool": value,
      "showAuthor": value,
      "showClose": value,
      "showCustomizableHeader": value,
      "showDodPanel": value,
      "showExportFile": value,
      "showExportVisualization": value,
      "showFilterPanel": value,
      "showHelp": value,
      "showLogout": value,
      "showPageNavigation": value,
      "showAnalysisInfo": value,
      "showReloadAnalysis": value,
      "showStatusBar": value,
      "showToolBar": value,
      "showUndoRedo": value
    } as SpotfireCustomization;
    this.markingOn = '*';

    // this.markingName = spotfireConfig.markingName;
    // this.maxMarkings = spotfireConfig.maxMarkings;

    // this.spotfireServer = "https://spotfire-next.cloud.tibco.com";
    // this.analysisPath = "Samples/Sales and Marketing";
    // this.allowedPages = ['Sales performance', 'Territory analysis', 'Effect of promotions'];
    this.configuration = { showAuthor: true, showFilterPanel: true, showToolBar: true } as SpotfireCustomization;
    // this.markingOn = '{"SalesAndMarketing": ["*"]}';

  }*/

  selectedVariant = '';
  selectedVariantID = '';
  uncompliantVariantID = '';

  public marking(data) {
    var mName = 'Cases';

    if (data[mName] != null) {
      if (data[mName]['newCases'] != null) {
        if (data[mName]['newCases']['case_id'] != null) {
          console.log('Selected CaseID: ', data[mName]['newCases']['case_id']);
          this.selectedVariantID = data[mName]['newCases']['case_id'].toString();
          this.selectedVariant = 'Compliance case at ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        }
      }
    }
/*

{
  "Variant": {
    "uncompliantVariants": {
      "variant_id": [
        "113",
        "149",
        "168"
      ],
 */

    if (data['Variant'] != null) {
      if (data['Variant']['uncompliantVariants'] != null) {
        if (data['Variant']['uncompliantVariants']['variant_id'] != null) {
          console.log('Selected Uncompliand Variant IDs ', data['Variant']['uncompliantVariants']['variant_id']);
          this.uncompliantVariantID = data['Variant']['uncompliantVariants']['variant_id'].toString();
          // this.selectedVariant = 'Compliance case at ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
        }
      }
    }


    this.markingdataText = JSON.stringify(data, null, 2);
  }

  /*
    // console.log('Marking: ' + JSON.stringify(data, null, 2));
    // console.log(data);



    this.markingdata = data; // JSON.stringify(data, null, 2);
    this.markingdataText = JSON.stringify(data, null, 2);
    this.markingTitles = new Array();
    this.markingDataTables = new Array();
    this.markingHeaders = new Array();
    this.markingData = new Array();
    this.dataSourceJson = new Array();
    this.columDefArray = new Array();

    // iterate over the marking data tables
    for (const markingName in data) {
      if (data.hasOwnProperty(markingName)) {
        console.log(markingName + ' -> ' , data[markingName]);
        this.markingTitles.push(markingName);
        // const mData = new Array();
        const markingElements = data[markingName];
        for (const dataTableName in markingElements) {
          // console.log('elementKey: ' + dataTableName);
          this.markingDataTables.push(dataTableName);
          // console.log("ekey data: " , data[ekey]);
          // console.log('me data: ' , markingElements);
          // console.log('has property: ' + markingElements.hasOwnProperty(dataTableName));
          if (markingElements.hasOwnProperty(dataTableName)) {
            const mDataRow = new Array();
            // console.log('mkey: ' , markingElements[dataTableName]);
            const mkey = markingElements[dataTableName];
            const headA = new Array();
            headA.push('Number');
            for (const head in mkey) {
              // console.log('head: ' + head);
              headA.push(head);
              if (mkey.hasOwnProperty(head)) {
                const mDataD = new Array();
                const dkey = mkey[head];
                for (const dElement in dkey) {
                  if (dkey.hasOwnProperty(dElement)) {
                    // console.log('data: ' + dkey[dElement]);
                  }
                  mDataD.push(dkey[dElement]);

                }
                mDataRow.push(mDataD);
                // console.log('mDataD: ', mDataD);
              }
            }
            // console.log('mDataRow: ', mDataRow);
            // Add numbers for the first column
            const numberOfDataRows = mDataRow[0].length;
            const rowNumberArray = new Array();
            for (let i = 0 ; i < numberOfDataRows ; i++) {
              rowNumberArray.push(i + 1);
            }
            // insert rows before
            mDataRow.unshift(rowNumberArray);
            this.markingData.push(this.transposeArray(mDataRow, numberOfDataRows));
            this.markingHeaders.push(headA);
            // this.dataSource = this.convertToJSON(this.markingData[this.markingData.length - 1]);
            const prepDataSource = this.markingData[this.markingData.length - 1];
            // console.log('prepDataSource: ', prepDataSource);
            // console.log('Headers: ', this.markingHeaders[this.markingHeaders.length - 1]);
            const prepDataSourcehWithHeaders = prepDataSource.slice();
            prepDataSourcehWithHeaders.unshift(this.markingHeaders[this.markingHeaders.length - 1]);
            // console.log('prepDataSourchWithHeaders: ', prepDataSourcehWithHeaders);
            // .unshift(this.markingHeaders[this.markingHeaders.length - 1]
            this.dataSourceJson.push(JSON.stringify(this.convertToJSON(prepDataSourcehWithHeaders)));
            // console.log('dataSourceJSON: ' , this.dataSourceJson);
          }
        }
      }
    }
    console.log('Marking Headers: ' , this.markingHeaders);
    console.log('Marking Data: ', this.markingData);
    console.log('dataSourceJSON: ', this.dataSourceJson);

    for (let k = 0; k < this.markingHeaders.length; k++) {
      const myColumns = [];
      for (let m = 0; m < this.markingHeaders[k].length; m++) {
        const mh = this.markingHeaders[k][m];
        // console.log('mh: ', mh);
        myColumns[m] = {};
        myColumns[m]['columnDef'] = mh;
        myColumns[m]['header'] = mh;
        // let set = 'myColumns[m].cell = function(element) {return `${element[\'' + mh + '\']}` };';
        // eval(set);
        myColumns[m].cell = function(element) {return `${element[mh]}`; };

      }
      // console.log('myColums:', myColumns);
      this.columDefArray.push(myColumns);
      // this.dataSource = new MyDataSource(this.dataSourceJson[0]);

    }
    // console.log('this.columDefArray:', this.columDefArray);


  }*/

  private convertToJSON(array) {
    const objArray = [];
    for (let i = 1; i < array.length; i++) {
      objArray[i - 1] = {};
      for (let k = 0; k < array[0].length && k < array[i].length; k++) {
        const key = array[0][k];
        objArray[i - 1][key] = array[i][k];
      }
    }
    return objArray;
  }

  private transposeArray(array, arrayLength) {
    // console.log('transposing array) arrayLength: ' + arrayLength );
    const newArray = [];
    for (let i = 0; i < arrayLength; i++) {
      newArray.push([]);
    }
    for (let i = 0; i < array.length; i++) {
      for (let j = 0; j < arrayLength; j++) {
        newArray[j].push(array[i][j]);
      }
    }
    return newArray;
  }
}


