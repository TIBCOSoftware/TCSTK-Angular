import { Component, OnInit } from '@angular/core';
import { CaseType } from 'tc-liveapps-lib/public_api';
import { LiveAppsConfig } from 'tc-liveapps-lib';
import { GeneralConfig, Claim } from 'tc-core-lib';
import { ActivatedRoute, Router } from '@angular/router';

@Component({
    selector: 'tcpd-pd-case-view',
    templateUrl: './pd-case-view.component.html',
    styleUrls: ['./pd-case-view.component.css']
})
export class PdCaseViewComponent implements OnInit {
    public generalConfig: GeneralConfig;
    public liveAppsConfig: LiveAppsConfig;
    private claims: Claim;
    public sandboxId: number;
    public selectedAppConfig: CaseType;
    public userName: string;
    public userId: string;
    public email: string;
  
    constructor(private router: Router, private route: ActivatedRoute) { }

    ngOnInit() {
        this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
        this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
        this.claims = this.route.snapshot.data.claims;
        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        this.userName = this.claims.firstName + ' ' + this.claims.lastName;
        this.email = this.claims.email;
        this.userId = this.claims.id;
    }

}
