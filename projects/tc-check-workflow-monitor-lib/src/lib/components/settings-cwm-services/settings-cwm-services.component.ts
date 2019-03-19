import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import {ServiceDetails, ServiceDetailsConfig} from '../../models/service-details';
import {CwmSettingsConfigServiceService} from '../../services/cwm-settings-config-service.service';
import {SpotfireConfig} from 'tc-spotfire-lib';



@Component({
  selector: 'tccwm-settings-spotfire',
  templateUrl: './settings-cwm-services.component.html',
  styleUrls: ['./settings-cwm-services.component.css']
})
export class SettingsCwmServicesComponent implements OnInit {

    public serviceDetailsConfig: ServiceDetailsConfig;

    constructor(
        private route: ActivatedRoute,
        private cwmSettingsConfigServiceService: CwmSettingsConfigServiceService
    ) { }

    ngOnInit() {

       this.serviceDetailsConfig = this.route.snapshot.data.serviceDetailsConfigResolver;

    }

    private refresh = (): void => {

    }

    public runSaveFuntion = (): void => {

// TOdo BECARFULL CHANGE NAM APp
      this.cwmSettingsConfigServiceService.updateServiceSettingConfig(1930, 'cwm', this.serviceDetailsConfig, this.serviceDetailsConfig.id).subscribe();


    }

}
