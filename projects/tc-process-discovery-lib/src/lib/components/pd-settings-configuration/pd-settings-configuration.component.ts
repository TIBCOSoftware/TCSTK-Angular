import { Component, OnInit } from '@angular/core';
import { Sandbox, Claim, LiveAppsService, CaseType } from 'tc-liveapps-lib';
import { ActivatedRoute } from '@angular/router';
import { take, takeUntil, map } from 'rxjs/operators';

@Component({
    selector: 'tcpd-pd-settings-configuration',
    templateUrl: './pd-settings-configuration.component.html',
    styleUrls: ['./pd-settings-configuration.component.css']
})
export class PdSettingsConfigurationComponent implements OnInit {

    public datasourceAppId: string;

    // public liveAppsConfig: LiveAppsConfig;
    // public generalConfig: GeneralConfig;
    public claims: Claim;
    public sandbox: Sandbox;
    public selectedApp: CaseType;
  
    constructor(private liveapps: LiveAppsService, private route: ActivatedRoute) { }


    ngOnInit() {
        // this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
        // this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
        this.claims = this.route.snapshot.data.claims;
        this.sandbox = this.claims.primaryProductionSandbox;

        this.datasourceAppId="2504";
        this.refresh(true);
        // this.defaultDatasource="DIS_000002";
    }

    selectApplication = ($event: any): void =>{
        console.log("******** " + $event);
        this.datasourceAppId = $event.applicationId;
    }

    public refresh = (bypassCache: boolean): void => {

        let appIds = [ this.datasourceAppId ];

        this.liveapps.getApplications(Number(this.sandbox.id), appIds, 100, bypassCache)
            .pipe(
            map(applicationList => {
                // this.applications = applicationList;
                // // select first as default
                // if (applicationList.casetypes.length > 0 && this.selectFirstApp) {
                    this.selectedApp = applicationList.casetypes[0];
//                    this.selection.emit(applicationList.casetypes[0]);
                // }
            })
            )
            .subscribe(null, error => { console.log("***** error "); }) //this.errorMessage = 'Error retrieving applications: ' + error.error.errorMsg; });          
    }

    runSaveFuntion = () =>{

    }

}
