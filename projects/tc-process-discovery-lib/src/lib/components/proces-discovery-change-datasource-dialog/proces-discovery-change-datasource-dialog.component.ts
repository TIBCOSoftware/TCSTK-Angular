import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChangeDatasourceSelectionContext, Datasource } from '../../models/tc-process-discovery';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { map } from 'rxjs/operators';
import { PdProcessDiscoveryConfigService } from '../../services/pd-process-discovery-config.service';

@Component({
    selector: 'tcpd-proces-discovery-change-datasource-dialog',
    templateUrl: './proces-discovery-change-datasource-dialog.component.html',
    styleUrls: ['./proces-discovery-change-datasource-dialog.component.css']
})
export class ProcesDiscoveryChangeDatasourceDialogComponent {

    private sandboxId: number;
    private datasourceAppId: string;
    private uiAppId: string;

    // For the UI
    public datasources: Datasource[];
    public newDatasource: Datasource;
    public defaultDatasource: Datasource;

    constructor(
        public dialogRef: MatDialogRef<ProcesDiscoveryChangeDatasourceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ChangeDatasourceSelectionContext,
        private processDiscovery: PdProcessDiscoveryService
    ) {
        this.newDatasource = data.currentDatasource;
        this.sandboxId = data.sandboxId;
        this.datasourceAppId = data.datasourceAppId;
        this.processDiscovery.getDatasources(this.sandboxId, this.datasourceAppId, ['Ready']).subscribe(
            result => {
                this.datasources = result;
                if (this.newDatasource) {
                    result.forEach(element => {
                        if (this.newDatasource.caseRef === element.caseRef){
                            this.newDatasource = element;
                        }
                    })
                }
            }
        );
        this.processDiscovery.getUserConfig(this.uiAppId, 'PRIVATE', true, false).pipe(
            map(userConfig => {
                console.log("SSS", userConfig);
                if (userConfig.datasourceCaseRef === ""){
                    // There is no predefined datasource for the user
                    this.defaultDatasource = undefined;
                } else {
                    this.processDiscovery.getDatasourceDetails(this.sandboxId, userConfig.datasourceCaseRef).subscribe(
                        result => {
                            this.defaultDatasource = result;
                        }
                    );
                }
            })
        ).subscribe();

    }

    public saveAsDefaultDatasource = ():void => {
        console.log("Selected save as default datasource");
        // const userConfig = new processdiscoveryU
        // this.processDiscovery.updateUserConfig(this.sandboxId, this.uiAppId, 'PRIVATE', processDiscoveryConfig, "id") {

    }
}
