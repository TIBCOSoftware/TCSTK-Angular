import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { ToolbarButton, TcButtonsHelperService } from 'tc-core-lib';
import { MatButtonToggleChange, MatDialog } from '@angular/material';
import { LiveAppsHomeCockpitComponent } from 'tc-liveapps-lib';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';

@Component({
    selector: 'tcpd-pd-case-view',
    templateUrl: './pd-case-view.component.html',
    styleUrls: ['./pd-case-view.component.css']
})
export class PdCaseViewComponent extends LiveAppsHomeCockpitComponent {
    public sandboxId: number;
    public title: string;
    public viewButtons: ToolbarButton[];
    public appIds: string[];
    public uiAppId: string;
    public userId: string;

    constructor(
        private router: Router, 
        private route: ActivatedRoute,
        protected buttonsHelper: TcButtonsHelperService,
        public dialog: MatDialog,
        private processDiscovery: PdProcessDiscoveryService
    ) {
        super(buttonsHelper, dialog);
     }

    ngOnInit() {
        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        this.title = this.route.snapshot.data.laConfigHolder.generalConfig.welcomeMessage;
        this.appIds = this.route.snapshot.data.laConfigHolder.liveAppsConfig.applicationIds;
        this.uiAppId = this.route.snapshot.data.laConfigHolder.generalConfig.uiAppId;
        this.userId = this.route.snapshot.data.claims.userId;

        // Buttons on the top bar
        this.toolbarButtons = this.createToolbarButtons();
        this.viewButtons = this.createViewButtons();
    }

    protected createToolbarButtons = (): ToolbarButton[] => {
        const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, true);
        const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
        const buttons = [ configButton, refreshButton ];
        return buttons;
    }

    handleToolbarButtonEvent = (buttonId: string) => {
        if (buttonId === 'config') {
            this.router.navigate(['/starterApp/configuration/']);
        }
        if (buttonId === 'refresh') {
            this.refresh();
        }
    }

    protected createViewButtons = (): ToolbarButton[] => {
        const processMiningView = this.buttonsHelper.createButton('process-mining-view', '', true, 'Process Mining View', true, true);
        const caseView = this.buttonsHelper.createButton('case-view', '', true, 'Case View', true, true);
        const buttons = [ processMiningView, caseView ];
        return buttons;
    }

    public handleViewButtonEvent = (event: MatButtonToggleChange) => {
        this.processDiscovery.getCurrentDatasource().subscribe(
            datasource => {
                this.router.navigate(['/starterApp/pd/process-mining-view']);
            }
        )
    }

    clickCaseAction = ($event: any): void => {
        this.router.navigate(['/starterApp/case/' + $event.appId + '/' + $event.typeId + '/' + $event.caseRef]);
    }
}
