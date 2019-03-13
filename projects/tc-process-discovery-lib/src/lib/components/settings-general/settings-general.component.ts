import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { GeneralConfig } from 'tc-core-lib';

@Component({
    selector: 'tcpd-settings-general',
    templateUrl: './settings-general.component.html',
    styleUrls: ['./settings-general.component.css']
})
export class SettingsGeneralComponent implements OnInit {

    public applicationTitle: string;
    public roles;
    public displayName: boolean;
    public documentationURL: string;
    public panelOpenState = false;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        var generalConfig = this.route.snapshot.data.generalConfigHolder;

        this.applicationTitle = generalConfig.applicationTitle;
        this.roles = generalConfig.roles;
        this.displayName = generalConfig.displayName;
        this.documentationURL = generalConfig.documentationURL;
    }

    public runSaveFuntion = () => {
        
    }

}
