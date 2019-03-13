import { Component, OnInit, Input, Output, EventEmitter } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarButton, TcButtonsHelperService, GeneralConfig } from 'tc-core-lib';
import { LiveAppsConfig, Claim, CaseType, RouteAction, CaseRoute } from 'tc-liveapps-lib';

@Component({
    selector: 'tcpd-pd-home',
    templateUrl: './pd-home.component.html',
    styleUrls: ['./pd-home.component.css']
})
export class PdHomeComponent implements OnInit {

    public generalConfig: GeneralConfig;
    public liveAppsConfig: LiveAppsConfig;
    private claims: Claim;
    public sandboxId: number;
    // public selectedAppConfig: CaseType;
    public userName: string;
    public toolbarButtons: ToolbarButton[];
    public viewButtons: ToolbarButton[];

    constructor(private router: Router, private buttonsHelper: TcButtonsHelperService, private route: ActivatedRoute) { }

    handleRouteAction = (routeAction: any) => {
        if (routeAction === 'caseClicked') {
            const caseRoute = new CaseRoute().deserialize(routeAction.context);
            // case clicked - navigate to case - note need to pass appId and caseId
            this.router.navigate(['/starterApp/case/' + caseRoute.appId + '/' + caseRoute.typeId + '/' + caseRoute.caseRef]);
        }
        if (routeAction === 'config') {
            console.log('Config button clicked');
            this.router.navigate(['/starterApp/settings/general-application-settings']);
            // route to config page
        }

        if (routeAction.value === "Process Mining View"){
            this.router.navigate(['/starterApp/pd/process-mining-view']);
        }

        if (routeAction.value === "Case View"){
            this.router.navigate(['/starterApp/pd/case-view']);
        }
    }

    protected createToolbarButtons = (): ToolbarButton[] => {
        const configButton = this.buttonsHelper.createButton('config', 'tcs-config-icon', true, 'Config', true, true);
        const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
        const buttons = [ configButton, refreshButton ];
        return buttons;
    }
    
    protected createViewButtons = (): ToolbarButton[] => {
        const processMiningView = this.buttonsHelper.createButton('config', 'tcs-config-icon', true, 'Process Mining View', true, true);
        const caseView = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Case View', true, true);
        const buttons = [ processMiningView, caseView ];
        return buttons;
    }

    ngOnInit() {
        this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
        this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
        this.claims = this.route.snapshot.data.claims;
        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        this.userName = this.claims.firstName + ' ' + this.claims.lastName;
        //   this.email = this.claims.email;
        //   this.userId = this.claims.id;
        this.toolbarButtons = this.createToolbarButtons();
        this.viewButtons = this.createViewButtons();
    }


}

