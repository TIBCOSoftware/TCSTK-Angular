import { Component, Inject } from '@angular/core';
import { MatDialogRef, MAT_DIALOG_DATA, MatSnackBar } from '@angular/material';
import { ChangeDatasourceSelectionContext, Datasource, ProcessDiscoveryUserConfig } from '../../models/tc-process-discovery';
import { PdProcessDiscoveryService } from '../../services/pd-process-discovery.service';
import { map } from 'rxjs/operators';

@Component({
    selector: 'tcpd-proces-discovery-change-datasource-dialog',
    templateUrl: './proces-discovery-change-datasource-dialog.component.html',
    styleUrls: ['./proces-discovery-change-datasource-dialog.component.css']
})
export class ProcesDiscoveryChangeDatasourceDialogComponent {

    private sandboxId: number;
    private uiAppId: string;
    private userConfig: ProcessDiscoveryUserConfig;

    // For the UI
    public datasources: Datasource[];
    public selectedDatasource: Datasource;
    public defaultDatasource: Datasource;

    constructor(
        public dialogRef: MatDialogRef<ProcesDiscoveryChangeDatasourceDialogComponent>,
        @Inject(MAT_DIALOG_DATA) public data: ChangeDatasourceSelectionContext,
        private processDiscovery: PdProcessDiscoveryService,
        private snackBar: MatSnackBar
    ) {
        this.selectedDatasource = data.currentDatasource;
        this.sandboxId = data.sandboxId;
        this.uiAppId = data.uiAppId;

        // Get the available datasources
        this.processDiscovery.getDatasources(this.sandboxId, data.datasourceAppId, ['Ready']).subscribe(
            result => {
                this.datasources = result;
            }
        );

        // Get PD user config
        this.processDiscovery.getUserConfig(this.uiAppId, 'PRIVATE', true, false).pipe(
            map(userConfig => {
                this.userConfig = userConfig;
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

    public saveAsDefaultDatasource = (datasource: Datasource):void => {
        this.userConfig.datasourceCaseRef = datasource.caseRef;
        this.processDiscovery.updateUserConfig(this.sandboxId, this.uiAppId, 'PRIVATE', this.userConfig, this.userConfig.id).subscribe(
            result => {
                this.snackBar.open('Defined a default datasource', 'OK', {
                    duration: 3000
                });
            },
            error => {
                this.snackBar.open('Error setting the default datasource', 'OK', {
                    duration: 3000
                });
            }
        );
    }

    compareObjects = (o1: Datasource, o2: Datasource): boolean => {
        return o2 === undefined ? false : o1.caseRef === o2.caseRef;
    }
}
