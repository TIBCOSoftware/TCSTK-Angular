import { Component } from '@angular/core';
import {
  CaseAction, LaProcessSelection,
  LoginContext,
  UiAppConfig
} from 'tc-liveapps-lib';
import {MatIconRegistry} from '@angular/material';
import {DomSanitizer} from '@angular/platform-browser';
import { Location } from '@angular/common';

@Component({
  selector: 'laapp-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  title = 'tc-liveapps';
  loggedIn = false;
  loginContext: LoginContext;

  // generic app config
  appConfig = new UiAppConfig().deserialize({
    id: undefined,
    userId: '256',
    applicationId: '1742',
    typeId: '1',
    uiAppId: 'testappjs',
    caseIconsFolderId: 'ServiceRequest_Icons',
    caseTypeLabel: 'Partner Request'
  });

  schema = {
    type: 'object',
    '$schema': 'http://json-schema.org/draft-04/schema#',
    definitions: {
      Customer_v1: {
        type: 'object',
        properties: {
          Name_v1: {
            type: 'string',
            maxLength: 80,
            title: 'Name'
          },
          CustomerReference_v1: {
            type: 'string',
            maxLength: 10,
            title: 'Customer Reference'
          },
          CustomerDetailsExtract_v1: {
            type: 'string',
            maxLength: 400,
            title: 'Customer Details Extract'
          },
          CustomerEmail_v1: {
            type: 'string',
            format: 'email',
            maxLength: 254,
            title: 'Customer Email'
          }
        }
      },
      IssueLog_v1: {
        type: 'object',
        properties: {
          LogEntry_v1: {
            type: 'string',
            maxLength: 250,
            title: 'Log Entry'
          }
        }
      },
      RequestDetails_v1: {
        type: 'object',
        properties: {
          PartReference_v1: {
            type: 'string',
            maxLength: 10,
            title: 'Part Reference'
          },
          PartName_v1: {
            type: 'string',
            maxLength: 50,
            title: 'Part Name'
          },
          PartDescription_v1: {
            type: 'string',
            maxLength: 400,
            title: 'Part Description'
          },
          OrderReference_v1: {
            type: 'string',
            maxLength: 10,
            title: 'Order Reference'
          },
          IssueLog_v1: {
            type: 'array',
            items: {
              type: 'object',
              $ref: '#/definitions/IssueLog_v1'
            },
            title: 'Issue Log'
          }
        }
      },
      PartnerInvestigation_v1: {
        type: 'object',
        properties: {
          Status_v1: {
            type: 'string',
            maxLength: 400,
            title: 'Status Comment'
          },
          Assignee_v1: {
            type: 'object',
            title: 'Assignee',
            properties: {
              id: {
                type: 'string',
                title: 'id'
              },
              name: {
                type: 'string',
                title: 'name'
              },
              firstName: {
                type: 'string',
                title: 'firstName'
              },
              lastName: {
                type: 'string',
                title: 'lastName'
              },
              email: {
                type: 'string',
                title: 'email'
              }
            }
          }
        }
      },
      CaseMetrics_v1: {
        type: 'object',
        properties: {
          Priority_v1: {
            type: 'integer',
            description: 'Priority of Request - LOW 1 -> HIGH 5',
            minimum: 1,
            title: 'Priority',
            maximum: 5
          },
          DueDate_v1: {
            type: 'string',
            format: 'date',
            title: 'Due Date'
          },
          Owner_v1: {
            type: 'string',
            maxLength: 50,
            title: 'Request Owner'
          },
          RequestOwnerEmail_v1: {
            type: 'string',
            format: 'email',
            maxLength: 254,
            title: 'Request Owner Email'
          },
          RequestOwnerSMS_v1: {
            type: 'string',
            maxLength: 50,
            title: 'Request Owner SMS'
          },
          PartnerContactEmail_v1: {
            type: 'string',
            format: 'email',
            maxLength: 254,
            title: 'Partner Contact Email'
          }
        }
      }
    },
    properties: {
      state: {
        type: 'string',
        title: 'State',
        'enum': [
          'Created',
          'Review',
          'Information Required',
          'Investigate',
          'Responded',
          'Canceled',
          'Resolved'
        ]
      },
      CaseId_v1: {
        type: 'string',
        maxLength: 19,
        title: 'Case Id'
      },
      PartnerReference_v1: {
        type: 'string',
        maxLength: 10,
        title: 'Partner Reference'
      },
      RequestDescription_v1: {
        type: 'string',
        maxLength: 400,
        title: 'Request Details'
      },
      RequestType_v1: {
        type: 'string',
        maxLength: 23,
        title: 'Request Type',
        'enum': [
          'Account Enquiry',
          'Shipping & Tracking',
          'Packaging Supplies',
          'Rates & Transit Times',
          'Invoice & Payments',
          'Order Enquiry',
          'Product Details Enquiry',
          'Open an Account',
          'General Enquiry',
          'Claims'
        ]
      },
      Customer_v1: {
        type: 'object',
        title: 'Customer',
        $ref: '#/definitions/Customer_v1'
      },
      Resolution_v1: {
        type: 'string',
        maxLength: 400,
        title: 'Resolution'
      },
      RequestDetails_v1: {
        type: 'object',
        title: 'Order Details',
        $ref: '#/definitions/RequestDetails_v1'
      },
      recentCustomerOrders_v1: {
        type: 'array',
        items: {
          type: 'object',
          $ref: '#/definitions/RequestDetails_v1'
        },
        title: 'Recent Customer Orders'
      },
      Investigation_v1: {
        type: 'object',
        title: 'Investigation',
        $ref: '#/definitions/PartnerInvestigation_v1'
      },
      CaseMetrics_v1: {
        type: 'object',
        title: 'Request Metrics',
        $ref: '#/definitions/CaseMetrics_v1'
      }
    }
  };

  layout = [
    { 'key': 'CaseId_v1', type: 'text', 'title': 'My Case Id' }
  ];

  data = {
    CaseId_v1: '555'
  };

  selectedProcess: LaProcessSelection;

  // handle form submit
  handleSubmit = (data: any) => {
    console.log(JSON.stringify(data));
  }

  // handle login context
  handleLoginContext = (loginContext: LoginContext) => {
    this.loginContext = loginContext;
    this.loggedIn = true;
  }

  // handle case creator selection
  handleCreatorSelection = (process: LaProcessSelection) => {
    console.log(JSON.stringify(process));
    this.selectedProcess = process;
  }

  // case clicked
  private clickCaseAction = (caseReference) => {
    console.log('Case was clicked: ' + caseReference);
  }

  // action clicked
  private handleActionClick = (action: CaseAction) => {
    console.log('Action was clicked:' + action.label);
  }

  constructor(private matIconRegistry: MatIconRegistry, private domSanitizer: DomSanitizer, private location: Location) {
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-reply',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-reply.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-delete',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-delete.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-edit',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-edit.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-send',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-send.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-subscribed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-subscribed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-unsubscribed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-unsubscribed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-collaboration-feed',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-feed.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-library',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-library.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-action',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-action.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-upload',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-upload.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-zip',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-zip.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-image',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-image.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-document-doc',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-document-doc.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-summary-details-button',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-details-button.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-favorites-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-favorite.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-recent-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-recent.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-clear-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-clear.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-customization-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-settings.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-caselist-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-caselist.svg'))
    );
    this.matIconRegistry.addSvgIcon(
      'tcs-search-icon',
      this.domSanitizer.bypassSecurityTrustResourceUrl(this.location.prepareExternalUrl('assets/icons/ic-search.svg'))
    );
  }
}
