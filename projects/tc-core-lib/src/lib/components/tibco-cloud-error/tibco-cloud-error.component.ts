import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

@Component({
  selector: 'tc-tibco-cloud-error',
  templateUrl: './tibco-cloud-error.component.html',
  styleUrls: ['./tibco-cloud-error.component.css']
})
export class TibcoCloudErrorComponent implements OnInit {

  // todo: Add logger
  constructor(private route: ActivatedRoute) {
    this.message = '';
    this.route.params.subscribe(params => {
      console.log(params); // log the entire params object
      console.log(params['errorCode']);
      console.log(params['errorMessage?']);
      if (params['errorCode'] != null) {
        this.code = params['errorCode'];
        this.message = this.knownErrorList.find(x => x.errorCode === this.code).errorMessage;
      } else {
        this.code = 'Unknown Error Code';
      }
      if (this.message === '' && params['errorMessage?'] != null) {
        this.message = params['errorMessage?'];
      }

      // log the value of id
    });
  }

  code: string;
  message: string;

  knownErrorList = [
    {
      errorCode : 'NO_ROLE',
      'errorMessage' : 'You are not a Member of this Application, please contact the Application- or Subscription-Owner.'

    },
    {
      'errorCode' : 'NO_ACCESS',
      'errorMessage' : 'You are not entitled to access this Application, please contact the Application- or Subscription-Owner.'

    },
    {
      'errorCode' : 'CONFIGURATION_MISSING',
      'errorMessage' : 'The Portal configuration seems wrong, this can only be fixed by an Application Configurator.'

    },
    {
      'errorCode' : 'WRONG_APPLICATION_ID',
      'errorMessage' : 'The linked LiveApps Application ID is invalid, this can only be fixed by an Application Configurator.'

    },
    {
      'errorCode' : 'GROUP_ERROR' ,
      'errorMessage' : 'There is a cache issue around groups, this can only be fixed by an Application Configurator.'

    },
  ];

  ngOnInit() {
  }


}


