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
    public sandboxId: number;
    private selectedAppConfig: CaseType;
    private datasource: UserPredefinedDatasource;
    private processDiscovery: ProcessDiscoveryConfig;
    private processDiscoveryConfig: ProcessDiscoveryUserConfig;
    public title;
    public appIds: string[];

    constructor(
        private router: Router,
        private route: ActivatedRoute,
        public dialog: MatDialog,
        private location: Location,
        private processDiscoveryService: PdProcessDiscoveryService
    ) {
        router.routeReuseStrategy.shouldReuseRoute = function () {
            return false;
        };
    }

    ngOnInit() {
        this.generalConfig = this.route.snapshot.data.laConfigHolder.generalConfig;
        this.liveAppsConfig = this.route.snapshot.data.laConfigHolder.liveAppsConfig;
        this.processDiscoveryConfig = this.route.snapshot.data.processDiscoveryUserConfigHolder;
        this.processDiscovery = this.route.snapshot.data.processDiscovery;
        this.claims = this.route.snapshot.data.claims;
        this.sandboxId = this.route.snapshot.data.claims.primaryProductionSandbox.id;
        this.appIds = this.liveAppsConfig.applicationIds;

        if (sessionStorage.getItem('currentDatasource')){
            this.datasource = JSON.parse(sessionStorage.getItem('currentDatasource'));
            this.title = this.datasource.datasourceId + '-' + this.datasource.description;
        } else {
            if (this.processDiscoveryConfig.datasourceCaseRef != ""){
                this.processDiscoveryService.getUserPredefinedDatasource(this.sandboxId, this.processDiscoveryConfig.datasourceCaseRef)
                    .subscribe(value => {
                        this.title = value.datasourceId + '-' + value.description;
                        this.datasource =  value;
                    });
            } else {
                this.datasource = new UserPredefinedDatasource().deserialize({
                    caseRef: '',
                    datasourceId: '',
                    description: ''
                });
                this.title = 'Not predefined datasource';
            }
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
            // this.processDiscoveryService.getDatasources(this.sandboxId, this.processDiscovery.datasourceAppId, ['Ready'])
            //     .pipe( 
            //         map(
            //             posibleDatasources => {
            //                 this.processDiscoveryService.getProcessDiscoveryUserConfig(this.processDiscovery.uiAppId, 'PRIVATE', true, true)
            //                 .subscribe(
            //                     userConfig => {
            //                         this.openDialog(posibleDatasources, userConfig);
            //                     }
            //                 )
            //             }
            //         );
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
                id: this.processDiscoveryConfig.id
            }
        });


        dialogRef.afterClosed().subscribe(result => {
            if (this.datasource != result) {
                this.title = result.datasourceId + '-' + result.description;
                this.datasource = result;
                sessionStorage.setItem('currentDatasource', JSON.stringify(result));
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
    predefinedDatasource: ProcessDiscoveryUserConfig,
    sandboxId: number,
    uiAppId: string,
    id: string
}
@Component({
    selector: 'pd-change-datasource-dialog',
    templateUrl: 'pd-change-datasource-dialog.html',
    styleUrls: ['./pd-change-datasource-dialog.css']
})
export class PdChangeDatasourceDialog {

    constructor(private processDiscoveryService: PdProcessDiscoveryService, public dialogRef: MatDialogRef<PdChangeDatasourceDialog>, @Inject(MAT_DIALOG_DATA) public data: DialogData) { }

    saveDefaultDatasource = (): void => {
        alert("dfisnf");
        const newDefaultDatasource = new ProcessDiscoveryUserConfig().deserialize({
            'datasourceCaseRef': this.data.currentDatasource.caseRef
        });
        this.processDiscoveryService.updateProcessDiscoveryUserConfig(this.data.sandboxId, this.data.uiAppId, 'PRIVATE', newDefaultDatasource, this.data.id).subscribe(
            result => {
                console.log("******** OK " + result);
            }
        );

    }
}


