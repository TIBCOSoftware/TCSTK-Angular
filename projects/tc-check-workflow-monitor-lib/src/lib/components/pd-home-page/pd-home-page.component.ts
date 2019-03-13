import { Component, OnInit } from '@angular/core';
import {ServiceDetails} from '../../models/service-details';
import {ServiceHandlerService} from '../../services/service-handler.service';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';



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


  constructor(private serviceHandler: ServiceHandlerService, private snackBar: MatSnackBar) {



  }

  ngOnInit() {
    let serviceDetails;

    serviceDetails = new ServiceDetails().deserialize({label: 'Create from Bordereaux', rootObjectName : 'cases',
      operation : '/CreateCasesFromBordereaux',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);

    // pick the first one
    this.curServiceDetails = serviceDetails;


    serviceDetails = new ServiceDetails().deserialize({label: 'Update From Docapost (TODO)', rootObjectName : 'cases',
      operation : '/UpdateLACasesFromDocapost',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);




    serviceDetails = new ServiceDetails().deserialize({label: 'Create From BOT (TODO)', rootObjectName : 'cases',
      operation : '/CreateCasesFromBordereaux',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);

    serviceDetails = new ServiceDetails().deserialize({label: 'Update From BPM (TODO)', rootObjectName : 'cases',
      operation : '/CreateCasesFromBordereaux',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);



    serviceDetails = new ServiceDetails().deserialize({label: 'Delete All', rootObjectName : null,
      operation : '/closeAllCase',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);


  }



  // On receive message from Select Service Display
  handleSelectedService (serviceDetails) {
    this.curServiceDetails = serviceDetails;

    if (this.curServiceDetails.rootObjectName === null) {
      const serviceObservable = this.serviceHandler.postService(serviceDetails.apiUrl + serviceDetails.operation, null);
      serviceObservable.subscribe( result => {
            this.openSnackBar(result);

          },
          error => {
            this.openSnackBar(error);
          });
    }
  }


  // TODO refactor : it appears twice
  openSnackBar(result: any) {
    // TODO handle error
    const message = 'File imported correctly : ' + result.nbTransmitted + ' lines transmitted';
    const actionButtonLabel = 'Close';

    this.snackBar.open( message, actionButtonLabel , {
    });
  }

}
