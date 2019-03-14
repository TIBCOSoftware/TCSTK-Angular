import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotfireConfig } from 'tc-spotfire-lib';
import { TcSpotfireConfigService } from 'tc-spotfire-lib';

@Component({
  selector: 'tccwm-settings-spotfire',
  templateUrl: './settings-cwm-services.component.html',
  styleUrls: ['./settings-cwm-services.component.css']
})
export class SettingsCwmServicesComponent implements OnInit {

    public servicesDetailsList = new Array();



    constructor(
        private route: ActivatedRoute,
        private spotfireConfigService: TcSpotfireConfigService
    ) { }

    ngOnInit() {
        this.refresh();
    }

    private refresh = (): void => {

    }

    public runSaveFuntion = (): void => {
    }

}
