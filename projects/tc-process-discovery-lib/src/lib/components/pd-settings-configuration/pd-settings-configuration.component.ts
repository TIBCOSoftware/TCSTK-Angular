import { Component, OnInit } from '@angular/core';
import { LiveAppsService, CaseType } from 'tc-liveapps-lib';
import { Sandbox, Claim } from 'tc-core-lib';
import { ActivatedRoute } from '@angular/router';
import { take, takeUntil, map } from 'rxjs/operators';
import { ProcessDiscoveryConfig } from '../../models/tc-process-discovery-config';
import { PdProcessDiscoveryConfigService } from '../../services/pd-process-discovery-config.service';

@Component({
    selector: 'tcpd-pd-settings-configuration',
    templateUrl: './pd-settings-configuration.component.html',
    styleUrls: ['./pd-settings-configuration.component.css']
})
export class PdSettingsConfigurationComponent implements OnInit {


    // public liveAppsConfig: LiveAppsConfig;
    // public generalConfig: GeneralConfig;
    public claims: Claim;
    public sandboxId: number;
    public selectedApp: CaseType;
    private processDiscoveryConfig: ProcessDiscoveryConfig;
    public datasourceId: string;
    public creatorId: string
    public storageTechnology: string;
  
    constructor(private processDiscoveryConfigService: PdProcessDiscoveryConfigService, private liveapps: LiveAppsService, private route: ActivatedRoute) { }


    ngOnInit() {

        this.claims = this.route.snapshot.data.claims;
        this.sandboxId = Number(this.claims.primaryProductionSandbox.id).valueOf();
        this.processDiscoveryConfig = this.route.snapshot.data.processDiscovery;

        // Get values from PUBLIC shared state
        this.datasourceId = this.processDiscoveryConfig.datasourceAppId;
//        this.creatorId = this.processDiscoveryConfig.creatorAppId.valueOf();

        this.refresh(true);

    }

    selectApplication = ($event: any): void =>{
        this.processDiscoveryConfig.datasourceAppId = $event.applicationId;
    }

    public refresh = (bypassCache: boolean): void => {

        let appIds: string[] =  (this.datasourceId === "") ? undefined : [ this.datasourceId ];

        this.liveapps.getApplications(this.sandboxId, appIds, 100, bypassCache)
            .pipe(
                map(applicationList => {
                    this.selectedApp = applicationList.casetypes[0];
                })
            )
            .subscribe(null, error => { console.log("***** error " + error.error.errorMsg); }) //this.errorMessage = 'Error retrieving applications: ' + error.error.errorMsg; });          
    }

    runSaveFuntion = () => {
        var processDiscoveryConfig = this.processDiscoveryConfig;
        this.processDiscoveryConfigService.updateProcessDiscoveryConfig(this.sandboxId, this.processDiscoveryConfig.uiAppId, processDiscoveryConfig, this.processDiscoveryConfig.id).subscribe();
    }
}
