import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { SpotfireConfig } from 'tc-spotfire-lib';
import { TcSpotfireConfigService } from 'tc-spotfire-lib';
import {ServiceDetails} from '../../models/service-details';

@Component({
  selector: 'tccwm-settings-spotfire',
  templateUrl: './settings-cwm-services.component.html',
  styleUrls: ['./settings-cwm-services.component.css']
})
export class SettingsCwmServicesComponent implements OnInit {

    public createService: ServiceDetails;
    public updateServiceFromPartner: ServiceDetails;
    public updateServiceFromBpm: ServiceDetails;

    public initiateService: ServiceDetails;
    public setTerminalStateService: ServiceDetails;




    constructor(
        private route: ActivatedRoute,
        private spotfireConfigService: TcSpotfireConfigService
    ) { }

    ngOnInit() {
        this.refresh();


// TODO to update from shared services


      this.createService = new ServiceDetails().deserialize({label: 'Creation à partir de Bordereaux', fileLabel: 'Borderaux', rootObjectName : 'cases',
        operation : '/CreateCasesFromBordereaux',
        apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});

      this.updateServiceFromPartner = new ServiceDetails().deserialize({label: 'Mise à jour Docapost', fileLabel: 'CR Docapost', rootObjectName : 'cases',
        operation : '/UpdateLACasesFromDocapost',
        apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});



      this.updateServiceFromBpm = new ServiceDetails().deserialize({label: 'Mise à jour From BPM (X)', fileLabel: 'Export BPM', rootObjectName : 'cases',
        operation : '/CreateCasesFromBordereaux',
        apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});



      this.initiateService = new ServiceDetails().deserialize({label: 'Initialisation', fileLabel: '????????', rootObjectName : 'cases',
        operation : '/CreateCasesFromBordereaux',
        apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});


      this.setTerminalStateService = new ServiceDetails().deserialize({label: 'Cloture Tous', rootObjectName : null,
        operation : '/closeAllCase',
        apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});




    }

    private refresh = (): void => {

    }

    public runSaveFuntion = (): void => {
    }

}
