import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarButton, TcButtonsHelperService, GeneralConfig, RouteAction } from 'tc-core-lib';
import { LiveAppsConfig, Claim, CaseType, CaseRoute } from 'tc-liveapps-lib';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from '@angular/common';

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
    public selectedAppConfig: CaseType;
    public userName: string;
    public userId: string;
    public email: string;
    public datasource: string;

    constructor(
        private router: Router, 
        private buttonsHelper: TcButtonsHelperService, 
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private location: Location
    ) {
        router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        }; 
    }

    handleRouteAction = (routeAction: RouteAction) => {
        console.log("******** Routing: " + routeAction.action + " " + routeAction.context);

        // if (routeAction.action === 'caseClicked') {
        //   const caseRoute = new CaseRoute().deserialize(routeAction.context);
        //   // case clicked - navigate to case - note need to pass appId and caseId
        //   this.router.navigate(['/starterApp/case/' + caseRoute.appId + '/' + caseRoute.typeId + '/' + caseRoute.caseRef]);
        // }
        if (routeAction.action === 'configClicked') {
          // route to config page
          this.router.navigate(['/starterApp/configuration/']);
        }

        if (routeAction.action === 'changedatasourceClicked') {
            this.openDialog();
        }
    
      }
    
      ngOnInit() {
        this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
        this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
        this.claims = this.route.snapshot.data.claims;
        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        this.userName = this.claims.firstName + ' ' + this.claims.lastName;
        this.email = this.claims.email;
        this.userId = this.claims.id;
        this.datasource = 'DIS_000002';
      }
    
      openDialog = (): void => {
        const dialogRef = this.dialog.open(PdChangeDatasourceDialog, {
            width: '500px',
            data: {datasource: this.datasource }
          });
      

          dialogRef.afterClosed().subscribe(result => {
              if (this.datasource != result){
                this.datasource = result;
                const path: string = this.location.path();
                if (this.location.path().startsWith('/starterApp/pd/process-mining-view/')){
                    this.router.navigate(['/starterApp/pd/process-mining-view/' + this.datasource]);
                }
              }
          });
        }

    // public generalConfig: GeneralConfig;
    // public liveAppsConfig: LiveAppsConfig;
    // private claims: Claim;
    // public sandboxId: number;
    // // public selectedAppConfig: CaseType;
    // public datasource: string;
    // public toolbarButtons: ToolbarButton[];
    // public viewButtons: ToolbarButton[];
    // public applicationIds = [];

    // handleRouteAction = (routeAction: any) => {
    //     if (routeAction === 'caseClicked') {
    //         const caseRoute = new CaseRoute().deserialize(routeAction.context);
    //         // case clicked - navigate to case - note need to pass appId and caseId
    //         this.router.navigate(['/starterApp/case/' + caseRoute.appId + '/' + caseRoute.typeId + '/' + caseRoute.caseRef]);
    //     }

    //     if (routeAction === 'config') {
    //         console.log('Config button clicked');
    //         this.router.navigate(['/starterApp/settings/general-application-settings']);
    //         // route to config page
    //     }

    //     if (routeAction === 'changedatasource'){
    //         this.openDialog();
    //     }

    //     if (routeAction.value === "Process Mining View"){
    //         // this.router.navigate(['/starterApp/pd/process-mining-view'], { state: { hello: this.datasource } });
    //     }

    //     if (routeAction.value === "Case View"){
    //         this.router.navigate(['/starterApp/pd/case-view']);
    //     }

    // }

    // protected createToolbarButtons = (): ToolbarButton[] => {
    //     const configButton = this.buttonsHelper.createButton('config', 'tcs-capabilities', true, 'Config', true, true);
    //     const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
    //     const changeDatasource = this.buttonsHelper.createButton('changedatasource', 'tcs-config-icon', true, 'Change datasource', true, true);
    //     const buttons = [ configButton, refreshButton, changeDatasource ];
    //     return buttons;
    // }
    
    // protected createViewButtons = (): ToolbarButton[] => {
    //     const processMiningView = this.buttonsHelper.createButton('config', 'tcs-config-icon', true, 'Process Mining View', true, true);
    //     const caseView = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Case View', true, true);
    //     const buttons = [ processMiningView, caseView ];
    //     return buttons;
    // }

    // ngOnInit() {
    //     this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
    //     this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
    //     this.claims = this.route.snapshot.data.claims;
    //     this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
    //     //   this.email = this.claims.email;
    //     //   this.userId = this.claims.id;
    //     this.toolbarButtons = this.createToolbarButtons();
    //     this.viewButtons = this.createViewButtons();
    //     if (this.location.path().startsWith('/starterApp/pd/process-mining-view/')){
    //         const parsedURL = this.location.path().split('/');
    //         this.datasource = parsedURL[parsedURL.length-1];
    //     }      
    // }

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


