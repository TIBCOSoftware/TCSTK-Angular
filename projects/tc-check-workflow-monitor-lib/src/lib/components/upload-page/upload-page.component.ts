import { Component, OnInit } from '@angular/core';
import {ServiceDetails, ServiceDetailsConfig} from '../../models/service-details';
import {ServiceHandlerService} from '../../services/service-handler.service';
import {map} from 'rxjs/operators';
import {MatSnackBar} from '@angular/material';
import {TcCaseDataService} from 'tc-liveapps-lib';
import {TcButtonsHelperService, ToolbarButton, RouteAction} from 'tc-core-lib';
import {ActivatedRoute, Router} from '@angular/router';
import {ServiceHandlerSnackbarComponent} from '../../components/service-handler-snackbar/service-handler-snackbar.component';



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
  public debugServiceDetailsList = new Array();


  public serviceDetailsConfig: ServiceDetailsConfig;

  public title = 'Intégration de fichier';

  public toolbarButtons: ToolbarButton[];




  constructor(private serviceHandler: ServiceHandlerService, private snackBar: MatSnackBar, private caseDataService: TcCaseDataService, protected buttonsHelper: TcButtonsHelperService, private router: Router, private route: ActivatedRoute) {



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
      this.router.navigate(['/starterApp/settings/upload-services-settings']);

    }

    if (buttonId === 'home') {
      this.router.navigate(['/starterApp/home']);

    }

    if (buttonId === 'refresh') {
      // this.refresh();
    }
  }




  ngOnInit() {
    this.toolbarButtons = this.createToolbarButtons();

    this.serviceDetailsConfig = this.route.snapshot.data.serviceDetailsConfigResolver;

    const serviceDetails = new ServiceDetails().deserialize(this.serviceDetailsConfig.createService);

    this.serviceDetailsList.push(serviceDetails);
    this.curServiceDetails = serviceDetails;

    this.serviceDetailsList.push(new ServiceDetails().deserialize(this.serviceDetailsConfig.updateServiceFromPartner));
    this.serviceDetailsList.push(new ServiceDetails().deserialize(this.serviceDetailsConfig.updateServiceFromBpm));

    this.debugServiceDetailsList.push(new ServiceDetails().deserialize(this.serviceDetailsConfig.initiateService));
    this.debugServiceDetailsList.push(new ServiceDetails().deserialize(this.serviceDetailsConfig.setTerminalStateService));

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
    this.snackBar.openFromComponent( ServiceHandlerSnackbarComponent , { data: result
    });
  }

}
