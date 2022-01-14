import {Component, OnInit, ViewEncapsulation} from '@angular/core';
import {ActivatedRoute, Router} from '@angular/router';
import {CredentialsService, TcAppDefinitionService} from '@tibcosoftware/tc-liveapps-lib';
import {GeneralConfig, TcCoreConfigService} from '@tibcosoftware/tc-core-lib';
import {Title} from '@angular/platform-browser';
import {CustomConfig1} from '../../../models/customConfig1';

@Component({
  selector: 'app-starter-app',
  templateUrl: './starter-app.component.html',
  styleUrls: ['./starter-app.component.css'],
  encapsulation: ViewEncapsulation.None
})
export class StarterAppComponent implements OnInit {

  private TIBCO_CLOUD_DOMAIN = 'cloud.tibco.com';
  private TIBCO_TEST_DOMAIN = 'tenant-integration.tcie.pro';
  private TIBCO_DEV_DOMAIN = 'emea.tibco.com';

  public disableTimeout = false;
  public config: GeneralConfig;
  public usingProxy = (this.tcConfigService.getConfig().proxy_url && this.tcConfigService.getConfig().proxy_url !== '') ? true : false;

  constructor(private route: ActivatedRoute, private router: Router, private titleService: Title, private tcConfigService: TcCoreConfigService, protected appDefinitionService: TcAppDefinitionService, protected credentialsService: CredentialsService) {
  }

  ngOnInit() {
    // each route uses a resolver to get required data for any components it uses
    // For example here the general config is read from this.route.snapshot.data.config
    // That config is available because the starterApp route ran the GeneralConfigResolver when defined in case-route-config.ts
    // *****
    // case-route-config.ts:
    // path: 'starterApp',
    //         component: StarterAppComponent,
    //         canActivate: [AuthGuard],
    //         resolve: {
    //           claims: ClaimsResolver,
    //       --> config: GeneralConfigResolver  <--    *config* is this.route.snapshot.data.config below
    //         },
    //         children: STARTER_APP_ROUTES

    this.config = this.route.snapshot.data.config;
    this.titleService.setTitle(this.config.browserTitle ? this.config.browserTitle : 'Tibco Cloud Starters');
    // check if we are hosted on tibco.cloud.com
    const host = window.location.hostname.split('.');
    const hostDomain = host[host.length - 3] + '.' + host[host.length - 2] + '.' + host[host.length - 1];
    if (this.credentialsService.isCloud()) {
      this.disableTimeout = false;
    } else {
      this.disableTimeout = true;
    }
    /* example to retrieve custom configuration from appConfig.json */
    /****************************************************************/
    /* note this can only be retrieved after a login since appDefinitionService wont be initialized until after a login */
    /* to add custom config, create a new model in the app for the customConfig structure (eg:) models/customConfig1.ts
     * then add your config in assets/appConfig.json under a new child object of config. eg)
     * {
     *   "config": {
     *      "customConfig1": {
     *        "configAttribute1": "sampleValue"
     *      }
     *    }
     *  }
     */

    /*const customConfig1: CustomConfig1 = this.appDefinitionService.appConfig.config.customConfig1;
    console.log(customConfig1.configAttribute1);*/
  }

}
