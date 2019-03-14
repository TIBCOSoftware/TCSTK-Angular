import { Component, OnInit } from '@angular/core';
import {ServiceDetails} from '../../models/service-details';
import {ServiceHandlerService} from '../../services/service-handler.service';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {RouteAction, TcCaseDataService} from 'tc-liveapps-lib';
import {TcButtonsHelperService, ToolbarButton} from 'tc-core-lib';
import {Router} from '@angular/router';



export interface Element {
  name: string;
  position: number;
  weight: number;
  symbol: string;
}

@Component({
  selector: 'tccwm-upload-page',
  templateUrl: './upload-page.component.html',
  styleUrls: ['./upload-page.component.css']
})
export class UploadPageComponent implements OnInit {
  public curServiceDetails: ServiceDetails;

  public serviceDetailsList = new Array();

  public title = 'Upload Page';

  public toolbarButtons: ToolbarButton[];




  constructor(private serviceHandler: ServiceHandlerService, private snackBar: MatSnackBar, private caseDataService: TcCaseDataService, protected buttonsHelper: TcButtonsHelperService, private router: Router) {



  }


  protected createToolbarButtons = (): ToolbarButton[] => {
    const configButton = this.buttonsHelper.createButton('config', 'tcs-config-icon', true, 'Config', true, true);
    const refreshButton = this.buttonsHelper.createButton('refresh', 'tcs-refresh-icon', true, 'Refresh', true, true);
    const homeButton = this.buttonsHelper.createButton('home', 'tcs-home', true, 'home Page', true, true);
    const buttons = [ homeButton, configButton, refreshButton ];
    return buttons;
  }


  public handleToolbarButtonEvent = (buttonId: string) => {
    if (buttonId === 'config') {
      // this.routeAction.emit(new RouteAction('configClicked', null));
    }

    if (buttonId === 'home') {
      this.router.navigate(['/starterApp/home']);
      // this.routeAction.emit(new RouteAction('uploadClicked', null));
    }

    if (buttonId === 'refresh') {
      // this.refresh();
    }
  }




  ngOnInit() {
    this.toolbarButtons = this.createToolbarButtons();

    let serviceDetails;

    serviceDetails = new ServiceDetails().deserialize({label: 'Creation à partir de Bordereaux', fileLabel: 'Borderaux', rootObjectName : 'cases',
      operation : '/CreateCasesFromBordereaux',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);

    // pick the first one
    this.curServiceDetails = serviceDetails;


    serviceDetails = new ServiceDetails().deserialize({label: 'Mise à jour Docapost', fileLabel: 'CR Docapost', rootObjectName : 'cases',
      operation : '/UpdateLACasesFromDocapost',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);


    serviceDetails = new ServiceDetails().deserialize({label: 'Mise à jour From BPM (X)', fileLabel: 'Export BPM', rootObjectName : 'cases',
      operation : '/CreateCasesFromBordereaux',
      apiUrl: 'https://eu-west-1.integration.cloud.tibcoapps.com/zwwupj46ttb7alnauy7exvxwihssu2y3'});
    this.serviceDetailsList.push(serviceDetails);

    serviceDetails = new ServiceDetails().deserialize({label: 'Initialisation', fileLabel: '????????', rootObjectName : 'cases',
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

  purgeAllCases () {
    const sandboxId = 1930;
    const applicationId = '2550';
    const type = '1';

    this.caseDataService.purgeAllCases(applicationId, type, sandboxId).subscribe( result => {
      this.openSnackBar(result);
    });




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
