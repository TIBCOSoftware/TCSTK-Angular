import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarButton, TcButtonsHelperService, GeneralConfig } from 'tc-core-lib';
import { LiveAppsConfig, Claim, CaseType, RouteAction, CaseRoute } from 'tc-liveapps-lib';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';

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
    public datasource: string;
    public toolbarButtons: ToolbarButton[];
    public viewButtons: ToolbarButton[];
    public applicationIds = [];

    constructor(
        private router: Router, 
        private buttonsHelper: TcButtonsHelperService, 
        private route: ActivatedRoute,
        public dialog: MatDialog
    ) { }

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

        if (routeAction === 'changedatasource'){
            this.openDialog();
        }

        if (routeAction.value === "Process Mining View"){
            this.router.navigate(['/starterApp/pd/process-mining-view']);
        }

        if (routeAction.value === "Case View"){
            this.router.navigate(['/starterApp/pd/case-view']);
        }

    }

    protected createToolbarButtons = (): ToolbarButton[] => {
        const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, true);
        const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
        const changeDatasource = this.buttonsHelper.createButton('changedatasource', 'tcs-config-icon', true, 'Change datasource', true, true);
        const buttons = [ configButton, refreshButton, changeDatasource ];
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
        this.datasource = 'DIS_000002';
        //   this.email = this.claims.email;
        //   this.userId = this.claims.id;
        this.toolbarButtons = this.createToolbarButtons();
        this.viewButtons = this.createViewButtons();
    }

    animal: string;
    name: string;
  
    openDialog = (): void => {
        const dialogRef = this.dialog.open(PdChangeDatasourceDialog, {
            width: '500px',
            data: {datasource: this.datasource }
          });
      
          dialogRef.afterClosed().subscribe(result => {
            this.datasource = result;
          });
        }
}

export interface DialogData {
  datasource: string;
}
@Component({
  selector: 'pd-change-datasource-dialog',
  templateUrl: 'pd-change-datasource-dialog.html',
})
export class PdChangeDatasourceDialog {

  constructor(public dialogRef: MatDialogRef<PdChangeDatasourceDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) {}

}


