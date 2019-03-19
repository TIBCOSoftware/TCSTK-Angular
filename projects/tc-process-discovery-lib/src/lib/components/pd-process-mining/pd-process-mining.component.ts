import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { SpotfireCustomization } from 'spotfire-webplayer/lib/spotfire-customization';

@Component({
  selector: 'tcpd-pd-process-mining',
  templateUrl: './pd-process-mining.component.html',
  styleUrls: ['./pd-process-mining.component.css']
})
export class PdProcessMiningComponent implements OnInit {

    @Input() username : string;
    @Input() email: string;
    @Input() sandboxId: string;
    @Input() applicationId : number;
    @Input() typeId : string;
    @Output() datasource: string;
    @Output() caseCreated = new EventEmitter; 
    private currentView : string;
    private currentRole : string;

    public spotfireServer: string;
    public analysisPath: string;
    public allowedPages : string[];
    public parameters: string;
    activePage : string;
    public test: any;
    public configuration;
    public markingOn;

    constructor(private router: Router, private route: ActivatedRoute) { }

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

    }

    handleCaseCreation = (caseId: string) => {
        // case clicked - navigate to case
        // this.router.navigate(['/starterApp/case/' + caseId], {queryParams: {} });
        console.log("OK");
      }

    public handleViewButtonEvent = (id : string) => {
        console.log("ID: " + id);
        this.currentView = id;
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
        console.log("********** " + this.allowedPages[$event.index]);
        this.activePage = this.allowedPages[$event.index];
    }

    public marking = ($event: any): void  => {
        console.log("*********** " + JSON.stringify($event));
    }

}
