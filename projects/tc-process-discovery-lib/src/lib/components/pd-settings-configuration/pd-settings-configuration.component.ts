import { Component, OnInit } from '@angular/core';
import { LiveAppsService, CaseType } from 'tc-liveapps-lib';
import { Sandbox, Claim } from 'tc-core-lib';
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
    public sandboxId: number;
    public selectedApp: CaseType;
  
    constructor(private liveapps: LiveAppsService, private route: ActivatedRoute) { }


    ngOnInit() {
        // this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
        // this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
        this.claims = this.route.snapshot.data.claims;
        this.sandboxId = Number(this.claims.primaryProductionSandbox.id).valueOf();

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

        this.liveapps.getApplications(Number(this.sandboxId), appIds, 100, bypassCache)
            .pipe(
            map(applicationList => {
                    this.selectedApp = applicationList.casetypes[0];
            })
            )
            .subscribe(null, error => { console.log("***** error "); }) //this.errorMessage = 'Error retrieving applications: ' + error.error.errorMsg; });          
    }

    runSaveFuntion = () =>{

    }

}
