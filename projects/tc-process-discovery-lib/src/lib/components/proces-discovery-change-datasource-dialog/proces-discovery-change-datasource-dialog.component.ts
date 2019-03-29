import { Component, OnInit, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA } from '@angular/material';
import { ChangeDatasourceSelectionContext, Datasource } from '../../models/tc-process-discovery';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'tcpd-proces-discovery-change-datasource-dialog',
    templateUrl: './proces-discovery-change-datasource-dialog.component.html',
    styleUrls: ['./proces-discovery-change-datasource-dialog.component.css']
})
export class ProcesDiscoveryChangeDatasourceDialogComponent {

    private currentDatasource: Datasource;
    private sandboxId: number;
    private datasourceAppId: string;

    // For the UI
    public datasources: Datasource[];
    public newDatasource: Datasource;

    constructor(
        public dialogRef: MatDialogRef<ProcesDiscoveryChangeDatasourceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ChangeDatasourceSelectionContext,
        private processDiscovery: PdProcessDiscoveryService
    ) {
        this.currentDatasource = data.currentDatasource;
        this.sandboxId = data.sandboxId;
        this.datasourceAppId = data.datasourceAppId;
        this.processDiscovery.getDatasources(this.sandboxId, this.datasourceAppId, ['Ready']).subscribe(
            result => {
                console.log("Result: ", result);
                this.datasources = result;
            }
        );
    }

    public saveAsDefaultDatasource = ():void => {
        console.log("Selected save as default datasource");

    }
}
