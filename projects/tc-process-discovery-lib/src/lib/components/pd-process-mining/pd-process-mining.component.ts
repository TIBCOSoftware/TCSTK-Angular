import { Component, OnInit, Input, Output, EventEmitter, ViewChild } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotfireCustomization } from 'spotfire-webplayer/lib/spotfire-customization';
import { McSpotfireWrapperComponent } from 'tc-spotfire-lib';

@Component({
  selector: 'tcpd-pd-process-mining',
  templateUrl: './pd-process-mining.component.html',
  styleUrls: ['./pd-process-mining.component.css']
})
export class PdProcessMiningComponent implements OnInit {

    @ViewChild(McSpotfireWrapperComponent) spotfireWrapperComponent: McSpotfireWrapperComponent;

    public spotfireServer: string;
    public analysisPath: string;
    public allowedPages : string[];
    public parameters: string;
    activePage : string;
    public test: any;
    public configuration;
    public markingOn;
    private datasource: string;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        var spotfireConfig = this.route.snapshot.data.spotfireConfigHolder;
        this.datasource = this.route.snapshot.params['datasource'];

        this.spotfireServer = spotfireConfig.spotfireServer;
        this.analysisPath = spotfireConfig.analysisPath;

        this.allowedPages = spotfireConfig.allowedPages; 
        this.activePage = spotfireConfig.activePageForHome;

        const value = false;
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
        // this.activePage = 'Sales performance'; 
        // this.configuration = { showAuthor: true, showFilterPanel: true, showToolBar: true } as SpotfireCustomization;
        // this.markingOn = '{"SalesAndMarketing": ["*"]}';

    }

    public handleViewButtonEvent = (id : string) => {
        console.log("ID: " + id);
        switch (id) {
            case "ProcessMiningView":
                this.router.navigate(['/starterApp/process-mining'], {});   
                break;
            case "CaseView": 
                this.router.navigate(['/starterApp/case-view'], {});
                break;
            case "DashboardsView":
                this.router.navigate(['/starterApp/dashboard-view'], {});
                break;
            default:
                break;
        }
    }
    
    public tabChange = ($event: any): void => {
        console.log('tab change: ', $event);
        this.spotfireWrapperComponent.openPage(this.allowedPages[$event.index]);
    }

    // public marking = ($event: any): void  => {
    //     console.log("*********** " + JSON.stringify($event));
    // }
    selectedVariant = '';
    selectedVariantID = '';

    public marking(data) {
        var mName = 'Marking';

        if (data[mName] != null) {
            if (data[mName]['cases'] != null) {
                if (data[mName]['cases']['case_id'] != null) {
                    console.log('Selected CaseID: ', data[mName]['cases']['case_id']);
                    this.selectedVariantID = data[mName]['cases']['case_id'].toString();
                    this.selectedVariant = 'Compliance case at ' + new Date().toLocaleDateString() + ' ' + new Date().toLocaleTimeString();
                }
            }
        }

     //   this.markingdataText = JSON.stringify(data, null, 2);
    }
}
