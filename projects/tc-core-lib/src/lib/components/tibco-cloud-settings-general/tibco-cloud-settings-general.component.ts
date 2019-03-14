import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
    selector: 'tc-tibco-cloud-settings-general',
    templateUrl: './tibco-cloud-settings-general.component.html',
    styleUrls: ['./tibco-cloud-settings-general.component.css']
})
export class TibcoCloudSettingsGeneralComponent implements OnInit {

    public applicationTitle: string;
    public roles;
    public displayName: boolean;
    public documentationURL: string;
    public panelOpenState = false;

    constructor(private route: ActivatedRoute) { }

    ngOnInit() {
        const generalConfig = this.route.snapshot.data.generalConfigHolder;

        this.applicationTitle = generalConfig.applicationTitle;
        this.roles = generalConfig.roles;
        this.displayName = generalConfig.displayName;
        this.documentationURL = generalConfig.documentationURL;
    }

    public runSaveFuntion = () => {

    }

}
