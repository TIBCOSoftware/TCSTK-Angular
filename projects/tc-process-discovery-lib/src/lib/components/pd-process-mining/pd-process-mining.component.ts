import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';

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
    @Output() caseCreated = new EventEmitter;
    private currentView : string;
    private currentRole : string;

    public spotfireServer: string;
    public analysisPath: string;
    public allowedPages : string[];
    activePage : string;

    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        var spotfireConfig = this.route.snapshot.data.spotfireConfigHolder;

        this.spotfireServer = spotfireConfig.spotfireServer;
        this.analysisPath = spotfireConfig.analysisPath;

        this.allowedPages = spotfireConfig.allowedPages; 
        this.activePage = spotfireConfig.activePageForHome;

        // this.markingName = spotfireConfig.markingName;
        // this.maxMarkings = spotfireConfig.maxMarkings;

// Table Name : cases
// Active Page for Details : Overview (for now)
// Marking Name : Cases
// Column Names : case_id
// Plus you need to pass ‘AnalysisId = “DIS_000002”;’ in the “parameters” argument of the spotfire.webplayer.createApplication function (called in the spotfirewrapper)
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
    
    public tabChange($event){
        console.log('tab change: ', $event);
        this.activePage = this.allowedPages[$event.index];
    }

    public marking = (id: string) => {
        console.log("*********** " + id);
    }

}
