import { Component, OnInit, EventEmitter, Output } from '@angular/core';
// import { ProcessDiscoveryCaseRoute } from '../../models/pd-liveappsdata';
import { RouteAction } from 'tc-core-lib';
import { Router, ActivatedRoute } from '@angular/router';
import { LiveAppsService, CaseInfoList } from 'tc-liveapps-lib';
import { map } from 'rxjs/operators';

@Component({
    selector: 'tcpd-pd-settings-administration',
    templateUrl: './pd-settings-administration.component.html',
    styleUrls: ['./pd-settings-administration.component.css']
})
export class PdSettingsAdministrationComponent implements OnInit {

    public cases = [];
    public datasourceId: string;
    public sandboxId: number;
    public displayType: string;
    @Output() routeAction: EventEmitter<RouteAction> = new EventEmitter<RouteAction>();


    constructor(private route: ActivatedRoute, private router: Router, private liveapps: LiveAppsService) { }

    ngOnInit() {
        const claims = this.route.snapshot.data.claims;
        this.sandboxId = Number(claims.primaryProductionSandbox.id).valueOf();
        this.datasourceId = this.route.snapshot.data.processDiscovery.datasourceAppId.valueOf();


        this.cases = [];
        this.liveapps.getCases(this.sandboxId, this.datasourceId, '1', 0, 100)
            .pipe(
                map(caseList => {
                    caseList.caseinfos.forEach(element => {
                        this.cases.push(element.caseReference);
                    });
                })
            )
            .subscribe(null, error => { console.log("***** error " + error.error.errorMsg); }) //this.errorMessage = 'Error retrieving applications: ' + error.error.errorMsg; });          

        this.displayType = 'card';
    }

    clickCaseAction = ($event: any) => {
        this.router.navigate(['/starterApp/case/' + $event.appId + '/' + $event.typeId + '/' + $event.caseRef]);
    }

    addNewDatasource = (): void => {

    }

}
// to use to investigate process mining issues