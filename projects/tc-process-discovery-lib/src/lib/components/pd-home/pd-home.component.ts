import { Component, OnInit, Input, Output, EventEmitter, Inject } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { ToolbarButton, TcButtonsHelperService, GeneralConfig, RouteAction, Claim } from 'tc-core-lib';
import { LiveAppsConfig, CaseType, CaseRoute } from 'tc-liveapps-lib';
import { MatDialog, MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { Location } from '@angular/common';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { UserPredefinedDatasource, ProcessDiscoveryUserConfig } from '../../models/tc-process-discovery';
import { map } from 'rxjs/operators';
import { ProcessDiscoveryConfig } from '../../models/tc-process-discovery-config';

@Component({
    selector: 'tcpd-pd-home',
    templateUrl: './pd-home.component.html',
    styleUrls: ['./pd-home.component.css']
})
export class PdHomeComponent implements OnInit {

    private generalConfig: GeneralConfig;
    private liveAppsConfig: LiveAppsConfig;
    private claims: Claim;
    private sandboxId: number;
    private selectedAppConfig: CaseType;
    private datasource: UserPredefinedDatasource;
    private processDiscovery: ProcessDiscoveryConfig;
    public title;

    constructor(
        private router: Router,
        private buttonsHelper: TcButtonsHelperService,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private location: Location,
        private processDiscoveryService: PdProcessDiscoveryService
    ) {
        // router.routeReuseStrategy.shouldReuseRoute = function () {
        //     return false;
        // };
    }

    ngOnInit() {
        this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
        this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
        const processDiscoveryConfig: ProcessDiscoveryUserConfig = this.route.snapshot.data.processDiscoveryUserConfigHolder;
        this.processDiscovery = this.route.snapshot.data.processDiscovery;
        this.claims = this.route.snapshot.data.claims;
        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        // this.userName = this.claims.firstName + ' ' + this.claims.lastName;
        // this.email = this.claims.email;
        // this.userId = this.claims.id;
        // this.datasource = 'DIS_000002';
        // this.datasource = { id: 'DIS_000002', description: 'whatever' };
        if (processDiscoveryConfig.datasourceCaseRef != ""){
            this.processDiscoveryService.getUserPredefinedDatasource(this.sandboxId, processDiscoveryConfig.datasourceCaseRef)
            .pipe(
                map(value => {
                    this.title = value.datasourceId + '-' + value.description;
                    this.datasource =  value;
                })
            );
        } else {
            this.datasource = new UserPredefinedDatasource().deserialize({
                caseRef: '',
                datasourceId: '',
                description: ''
            });
            this.title = 'Not predefined datasource';
        }
    }

    handleRouteAction = (routeAction: RouteAction) => {
        console.log("******** Routing: " + routeAction.action + " " + routeAction.context);

        if (routeAction.action === 'configClicked') {
            // route to config page
            this.router.navigate(['/starterApp/configuration/']);
        }

        if (routeAction.action === 'changedatasourceClicked') {
            this.processDiscoveryService.getDatasources(this.sandboxId, this.processDiscovery.datasourceAppId, ['Ready'])
                .subscribe( 
                    value => {
                        this.openDialog(value);
                    });
        }

        if (routeAction.action === 'changeViewClicked'){
            console.log("************** Change view " + routeAction.context);
            let url = 'starterApp/pd/';
            if (routeAction.context === 'process-mining-view') {
                if (this.datasource.caseRef.length > 0){
                    url = url + 'process-mining-view/' + this.datasource.datasourceId;
                } else {
                    alert('Please, select first a datasource');
                }
            } else {
                url = url + 'case-view';
            }

            console.log("******* URL: " + url);
            this.router.navigate([url], {});
        }
    }

    openDialog = (posibleDatasources: UserPredefinedDatasource[]): void => {
        const dialogRef = this.dialog.open(PdChangeDatasourceDialog, {
            width: '400px',
            height: '250px',
            data: { 
                currentDatasource: this.datasource,
                posibleDatasources: posibleDatasources,
                sandboxId: this.sandboxId,
                uiAppId: this.generalConfig.uiAppId,
                id: this.processDiscovery.id
            }
        });


        dialogRef.afterClosed().subscribe(result => {
            if (this.datasource != result) {
                this.title = result.datasourceId + '-' + result.description;
                this.datasource = result;
                const path: string = this.location.path();
                if (this.location.path().startsWith('/starterApp/pd/process-mining-view/')) {
                    this.router.navigate(['/starterApp/pd/process-mining-view/' + this.datasource.datasourceId]);
                }
            }
        });
    }

}

export interface DialogData {
    currentDatasource: UserPredefinedDatasource;
    posibleDatasources: UserPredefinedDatasource[],
    sandboxId: number,
    uiAppId: string,
    id: string
}
@Component({
    selector: 'pd-change-datasource-dialog',
    templateUrl: 'pd-change-datasource-dialog.html',
})
export class PdChangeDatasourceDialog {

    constructor(private processDiscoveryService: PdProcessDiscoveryService, public dialogRef: MatDialogRef<PdChangeDatasourceDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    saveDefaultDatasource = (): void => {
        alert("dfisnf");
        // this.processDiscoveryService.updateProcessDiscoveryUserConfig(this.data.sandboxId, this.data.uiAppId, 'PRIVATE', this.data.currentDatasource, this.data.id);

    }
}


