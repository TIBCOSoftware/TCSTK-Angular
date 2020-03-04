import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatSnackBar } from '@angular/material';
import {SpotfireMarkingCreateCaseConfig} from '../../models/tc-spotfire-config';
import {TcSpotfireMarkingLiveappsConfigService} from '../../services/tc-spotfire-marking-liveapps-config.service';

@Component({
  selector: 'tcsf-settings-spotfire-create-case-mapping',
  templateUrl: './settings-spotfire-create-case-mapping.component.html',
  styleUrls: ['./settings-spotfire-create-case-mapping.component.css']
})

export class SettingsSpotfireCreateCaseMappingComponent implements OnInit {

    /*
    public spotfireServer: string;
    public analysisPath: string;
    public tableName: string;
    public activePageForHome: string;
    public activePageForDetails: string;
    public markingName: string;
    public maxMarkings : number;
    public allowedPages: string;
    public columnNames: string;

     */
    private id: string;
    private uiAppId: string;
    private sandboxId: number;

    constructor(
      protected route: ActivatedRoute,
      protected spotfireConfigService: TcSpotfireMarkingLiveappsConfigService,
      protected snackBar: MatSnackBar
    ) { }

    ngOnInit() {
        this.refresh();
    }

    private refresh = (): void => {
      const spotfireConfig = this.route.snapshot.data.spotfireConfigHolder;

     this.sandboxId = this.route.snapshot.data.claimsHolder.primaryProductionSandbox.id;
      /*
     this.spotfireServer = spotfireConfig.spotfireServer;
     this.analysisPath = spotfireConfig.analysisPath;

     this.tableName = spotfireConfig.tableName;

     this.activePageForHome = spotfireConfig.activePageForHome;
     this.activePageForDetails = spotfireConfig.activePageForDetails;

     this.markingName = spotfireConfig.markingName;
     this.maxMarkings = spotfireConfig.maxMarkings;

     this.allowedPages = spotfireConfig.allowedPages.join(',');
     this.columnNames = spotfireConfig.columnNames.join(',');
*/
        this.id = spotfireConfig.id;
        this.uiAppId = spotfireConfig.uiAppId;
    }

    public runSaveFunction = (): void => {

        const spotfireConfig = new SpotfireMarkingCreateCaseConfig().deserialize({
            id: this.id,
            uiAppId: this.uiAppId
          /*,
            spotfireServer: this.spotfireServer,
            analysisPath: this.analysisPath,
            tableName: this.tableName,
            activePageForHome: this.activePageForHome,
            activePageForDetails: this.activePageForDetails,
            markingName: this.markingName,
            maxMarkings: this.maxMarkings,
            allowedPages: this.allowedPages.split(','),
            columnNames: this.columnNames.split(',')*/
        });

        this.spotfireConfigService.updateSpotfireConfig(this.sandboxId, this.uiAppId, spotfireConfig, this.id).subscribe(
            result => {
                this.snackBar.open('Spotfire settings saved', 'OK', {
                    duration: 3000
                });
            },
            error => {
                this.snackBar.open('Error saving Spotfire settings saved', 'OK', {
                    duration: 3000
                });
            }
        );
    }

    /*
    public handleEditLiveAppClick = (): void => {
        window.open(this.spotfireServer + '/spotfire/wp/analysis?file=' + this.analysisPath);
    }*/

}
