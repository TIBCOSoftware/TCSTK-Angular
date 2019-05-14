import { Component, OnInit } from '@angular/core';
import {ActivatedRoute} from '@angular/router';

/**
 * Global Error Handling, contains generic Error Handling for
 *
 * - NO_ROLE :: You are not a Member of this Application, please contact the Application- or Subscription-Owner.
 * - NO_ACCESS :: You are not entitled to access this Application, please contact the Application- or Subscription-Owner.
 * - NO_ROUTE_ACCESS :: Sorry but you do not have the required role to access this page of the application, please contact the application owner
 */

/**
 * Exception Handling page
 *
 *@example <tc-tibco-cloud-error></tc-tibco-cloud-error>
 */
@Component({
  selector: 'tc-tibco-cloud-error',
  templateUrl: './tibco-cloud-error.component.html',
  styleUrls: ['./tibco-cloud-error.component.css']
})
export class TibcoCloudErrorComponent implements OnInit {

  /**
   * todo: Add logger
   */
  constructor(private route: ActivatedRoute) {
    this.message = '';
    this.route.params.subscribe(params => {
      console.log(params); // log the entire params object
      console.log(params['errorCode']);
      console.log(params['errorData?']);
      if (params['errorCode'] != null) {
        this.code = params['errorCode'];
        this.title = this.knownErrorList.find(x => x.errorCode === this.code).errorTitle;
        this.message = this.knownErrorList.find(x => x.errorCode === this.code).errorMessage;
        this.data = params['errorData'];
      } else {
        this.code = 'Unknown Error Code';
      }
    });
  }

  code: string;
  title: string;
  message: string;
  data: string;

  knownErrorList = [
    {
      'errorCode' : 'NO_ROLE',
      'errorTitle' : 'Access Denied',
      'errorMessage' : 'You are not a Member of this Application, please contact the Application- or Subscription-Owner.'

    },
    {
      'errorCode' : 'NO_ACCESS',
      'errorTitle' : 'Access Denied',
      'errorMessage' : 'You are not entitled to access this Application, please contact the Application- or Subscription-Owner.'

    },
    {
      'errorCode' : 'NO_ROUTE_ACCESS',
      'errorTitle' : 'Access Denied',
      'errorMessage' : 'Sorry but you do not have the required role to access this page of the application, please contact the application owner'
    }
  ];

  /**
  * @ignore
  */
  ngOnInit() {
  }


}


