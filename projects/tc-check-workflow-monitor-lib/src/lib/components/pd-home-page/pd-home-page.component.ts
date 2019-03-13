import { Component, OnInit } from '@angular/core';
import {ServiceDetails} from '../../models/service-details';



export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'tccwm-pd-home-page',
  templateUrl: './pd-home-page.component.html',
  styleUrls: ['./pd-home-page.component.css']
})
export class PdHomePageComponent implements OnInit {
  public curServiceDetails: ServiceDetails;

  public serviceDetailsList = new Array();


  constructor() {



  }

  ngOnInit() {
    let serviceDetails;

    serviceDetails = new ServiceDetails().deserialize({label: 'Create from Bordereaux', rootObjectName : 'cases',
      operation : '/CreateCasesFromBordereaux',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);

    // pick the first one
    this.curServiceDetails = serviceDetails;

    serviceDetails = new ServiceDetails().deserialize({label: 'Create From BOT (TODO)', rootObjectName : 'mycases',
      operation : '/CreateCasesFromBordereaux',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);

    serviceDetails = new ServiceDetails().deserialize({label: 'Update From BPM (TODO)', rootObjectName : 'mycases',
      operation : '/CreateCasesFromBordereaux',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);


    serviceDetails = new ServiceDetails().deserialize({label: 'Update From Docapost (TODO)', rootObjectName : 'mycases',
      operation : '/CreateCasesFromBordereaux',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);


    serviceDetails = new ServiceDetails().deserialize({label: 'Delete All (TODO)', rootObjectName : 'mycases',
      operation : '/CreateCasesFromBordereaux',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);


  }


  handleSelectedService (serviceDetails) {
    this.curServiceDetails = serviceDetails;
  }

}
