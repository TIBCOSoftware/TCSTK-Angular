import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router } from '@angular/router';

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
    public allowedPages = ['Overview', 'Process Map', 'Variants', 'Compliance', 'Filters'];
    activePage = "Overview";

    constructor(private router: Router) { }

    ngOnInit() {

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
