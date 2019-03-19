import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarButton, TcButtonsHelperService, GeneralConfig, RouteAction, Claim } from 'tc-core-lib';
import { LiveAppsConfig, CaseType, CaseRoute } from 'tc-liveapps-lib';
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


