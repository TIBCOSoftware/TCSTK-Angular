import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotfireConfig } from 'projects/tc-spotfire-lib/src/lib/models/tc-spotfire-config';
import { TcSpotfireConfigService } from 'projects/tc-spotfire-lib/src/lib/services/tc-spotfire-config.service';

@Component({
  selector: 'tcpd-settings-spotfire',
  templateUrl: './settings-spotfire.component.html',
  styleUrls: ['./settings-spotfire.component.css']
})
export class SettingsSpotfireComponent implements OnInit {

    public spotfireServer: string;
    public analysisPath: string;
    public tableName: string;
    public activePageForHome: string;
    public activePageForDetails: string;
    public markingName: string;
    public maxMarkings : number;
    public allowedPages: string;
    public columnNames: string;
    private id: string;
    private uiAppId: string;
    private sandboxId: number;

    constructor(
        private route: ActivatedRoute,
        private spotfireConfigService: TcSpotfireConfigService
    ) { }

    ngOnInit() {
        this.refresh();
    }

    private refresh = (): void => {
        var spotfireConfig = this.route.snapshot.data.spotfireConfigHolder;
        this.sandboxId = this.route.snapshot.data.claimsHolder.primaryProductionSandbox.id;

        this.spotfireServer = spotfireConfig.spotfireServer;
        this.analysisPath = spotfireConfig.analysisPath;

        this.tableName = spotfireConfig.tableName;

        this.activePageForHome = spotfireConfig.activePageForHome;
        this.activePageForDetails = spotfireConfig.activePageForDetails;

        this.markingName = spotfireConfig.markingName;
        this.maxMarkings = spotfireConfig.maxMarkings;

        this.allowedPages = spotfireConfig.allowedPages.join(','); 
        this.columnNames = spotfireConfig.columnNames.join(',');

        this.id = spotfireConfig.id;
        this.uiAppId = spotfireConfig.uiAppId;
    }

    public runSaveFuntion = ():void => {
       
        var spotfireConfig = new SpotfireConfig().deserialize({
            spotfireServer: this.spotfireServer,
            analysisPath: this.analysisPath,
            tableName: this.tableName,
            activePageForHome: this.activePageForHome,
            activePageForDetails: this.activePageForDetails,
            markingName: this.markingName,
            naxMarkings: this.maxMarkings,
            allowedPages: this.allowedPages.split(','),
            columnNames: this.columnNames.split(',')
        });

        this.spotfireConfigService.updateSpotfireConfig(this.sandboxId, "caseApp5", spotfireConfig, this.id).subscribe();


    }

}
